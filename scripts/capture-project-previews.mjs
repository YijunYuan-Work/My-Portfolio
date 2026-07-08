import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "public", "project-previews");
const remotePort = Number(process.env.CHROME_DEBUG_PORT || 9333);
const chromeProfileDir = path.join(os.tmpdir(), `portfolio-preview-chrome-${Date.now()}`);

const previews = [
  {
    name: "ApplyTrack",
    url: process.env.APPLYTRACK_PREVIEW_URL || "https://apply-track-six.vercel.app/#/demo",
    output: "applytrack-dashboard.png",
    width: 1440,
    height: 1000,
    waitMs: 2400,
    skipWhenTextIncludes: "Sign in to your workspace",
  },
  {
    name: "French Desk",
    url: process.env.FRENCH_DESK_PREVIEW_URL || "https://french-learning-theta.vercel.app/#/demo",
    output: "frenchdesk-today.png",
    width: 1440,
    height: 1000,
    waitMs: 2400,
  },
];

function getChromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);

  const chromePath = candidates.find((candidate) => existsSync(candidate));

  if (!chromePath) {
    throw new Error("Chrome was not found. Set CHROME_PATH to your Chrome executable.");
  }

  return chromePath;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForChrome() {
  const url = `http://127.0.0.1:${remotePort}/json/version`;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chrome is still starting.
    }

    await delay(250);
  }

  throw new Error("Chrome remote debugging endpoint did not start in time.");
}

async function openPage() {
  const response = await fetch(`http://127.0.0.1:${remotePort}/json/new?about:blank`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Could not create a Chrome tab: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  const callbacks = new Map();
  let nextId = 1;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      return;
    }

    const callback = callbacks.get(message.id);
    if (!callback) {
      return;
    }

    callbacks.delete(message.id);

    if (message.error) {
      callback.reject(new Error(message.error.message));
      return;
    }

    callback.resolve(message.result);
  });

  return {
    send(method, params = {}) {
      const id = nextId;
      nextId += 1;

      socket.send(JSON.stringify({ id, method, params }));

      return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject });
      });
    },
    close() {
      socket.close();
    },
  };
}

async function capturePreview(preview) {
  const page = await openPage();
  const client = await createCdpClient(page.webSocketDebuggerUrl);

  try {
    await client.send("Page.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: preview.width,
      height: preview.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await client.send("Page.navigate", { url: preview.url });
    await delay(preview.waitMs);

    if (preview.skipWhenTextIncludes) {
      const textResult = await client.send("Runtime.evaluate", {
        expression: "document.body.innerText",
        returnByValue: true,
      });
      const pageText = textResult.result?.value || "";

      if (pageText.includes(preview.skipWhenTextIncludes)) {
        console.warn(`Skipped ${preview.name}: preview URL opened a sign-in screen.`);
        return;
      }
    }

    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
    });

    const outputPath = path.join(outputDir, preview.output);
    await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
    console.log(`Captured ${preview.name}: ${path.relative(rootDir, outputPath)}`);
  } finally {
    client.close();
  }
}

mkdirSync(chromeProfileDir, { recursive: true });

const chrome = spawn(getChromePath(), [
  "--headless",
  "--remote-debugging-address=127.0.0.1",
  `--remote-debugging-port=${remotePort}`,
  `--user-data-dir=${chromeProfileDir}`,
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-allow-origins=*",
  "about:blank",
], {
  detached: false,
  stdio: "ignore",
});

try {
  await mkdir(outputDir, { recursive: true });
  await waitForChrome();

  for (const preview of previews) {
    await capturePreview(preview);
  }
} finally {
  chrome.kill();
  try {
    await delay(500);
    await rm(chromeProfileDir, { force: true, recursive: true });
  } catch (error) {
    if (error?.code !== "EBUSY" && error?.code !== "ENOTEMPTY") {
      throw error;
    }
  }
}
