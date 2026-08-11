import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Menu,
  Search,
  Send,
  Terminal,
  X,
} from "lucide-react";
import "./StitchPortfolio.css";
import { portfolioContent } from "./portfolioContent.js";

const resumeUrl = "/Yijun_Yuan_resume.pdf";
const emailAddress = "yijun.yuan@alumni.utoronto.ca";

const skillIcons = {
  frontend: Code2,
  data: Cpu,
  qa: Check,
};

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/YijunYuan-Work",
    Icon: Code2,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yijun-yuan-75331a22b/",
    Icon: BriefcaseBusiness,
  },
];

function LanguageSwitch({ locale, onChange, label, className = "" }) {
  return (
    <div className={`language-switch ${className}`.trim()} role="group" aria-label={label}>
      <button
        className={locale === "en" ? "is-active" : ""}
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <button
        className={locale === "zh" ? "is-active" : ""}
        type="button"
        aria-pressed={locale === "zh"}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
    </div>
  );
}

function Navbar({ activeSection, content, locale, onLocaleChange, onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { id: "projects", name: content.projects },
    { id: "skills", name: content.skills },
    { id: "experience", name: content.experience },
    { id: "contact", name: content.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav-inner">
        <a className="brand-mark" href="#home" aria-label={content.backToTop}>
          <Terminal size={16} aria-hidden="true" />
          <span>YY_SYSTEM</span>
        </a>

        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a className={isActive ? "is-active" : ""} href={`#${link.id}`} key={link.id}>
                {link.name}
              </a>
            );
          })}
          <LanguageSwitch
            locale={locale}
            onChange={onLocaleChange}
            label={content.language}
          />
          <button className="nav-resume" type="button" onClick={onOpenResume}>
            {content.resume}
          </button>
        </div>

        <div className="mobile-nav-actions">
          <button className="nav-resume compact" type="button" onClick={onOpenResume}>
            {content.resume}
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? content.closeMenu : content.openMenu}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <LanguageSwitch
            className="mobile-language-switch"
            locale={locale}
            onChange={onLocaleChange}
            label={content.language}
          />
          {navLinks.map((link) => (
            <a
              className={activeSection === link.id ? "is-active" : ""}
              href={`#${link.id}`}
              key={link.id}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ content, onScrollToProjects, onScrollToContact }) {
  const [typedWord, setTypedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [consoleActive, setConsoleActive] = useState(false);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleLogs, setConsoleLogs] = useState(() => content.console.initial);
  const consoleInputRef = useRef(null);
  const consoleLogRef = useRef(null);
  const consolePanelRef = useRef(null);

  useEffect(() => {
    if (consoleActive) {
      return undefined;
    }

    const currentWord = content.terminalWords[wordIndex];
    const delay = !isDeleting && charIndex === currentWord.length ? 1600 : isDeleting ? 65 : 125;

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % content.terminalWords.length);
        return;
      }

      if (isDeleting) {
        setTypedWord(currentWord.slice(0, Math.max(charIndex - 1, 0)));
        setCharIndex((current) => Math.max(current - 1, 0));
      } else {
        setTypedWord(currentWord.slice(0, charIndex + 1));
        setCharIndex((current) => current + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, consoleActive, content.terminalWords, isDeleting, wordIndex]);

  useEffect(() => {
    if (!consoleLogRef.current) {
      return;
    }

    consoleLogRef.current.scrollTop = consoleLogRef.current.scrollHeight;
  }, [consoleLogs]);

  useEffect(() => {
    if (!consoleActive) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setConsoleActive(false);
        setConsoleInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [consoleActive]);

  useEffect(() => {
    if (!consoleActive) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      consoleInputRef.current?.focus({ preventScroll: true });

      const consolePanel = consolePanelRef.current;
      if (!consolePanel) {
        return;
      }

      const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height || 0;
      const rect = consolePanel.getBoundingClientRect();
      const topLimit = navHeight + 24;
      const bottomLimit = window.innerHeight - 24;

      if (rect.top < topLimit) {
        window.scrollBy({ top: rect.top - topLimit, behavior: "auto" });
      } else if (rect.bottom > bottomLimit) {
        window.scrollBy({ top: rect.bottom - bottomLimit, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [consoleActive]);

  function returnToProfile() {
    setConsoleActive(false);
    setConsoleInput("");
  }

  function submitConsole(event) {
    event.preventDefault();
    const rawCommand = consoleInput.trim().toLowerCase();
    if (!rawCommand) {
      return;
    }
    const command = content.console.aliases[rawCommand] || rawCommand;

    if (command === "clear") {
      setConsoleLogs([]);
      setConsoleInput("");
      return;
    }

    if (command === "exit") {
      setConsoleLogs((current) => [
        ...current,
        `> ${consoleInput}`,
        content.console.closing,
        "",
      ]);
      setConsoleInput("");
      window.setTimeout(() => setConsoleActive(false), 600);
      return;
    }

    setConsoleLogs((current) => [
      ...current,
      `> ${consoleInput}`,
      ...(content.console.responses[command] || [
        `${content.console.unknownStart} "${rawCommand}". ${content.console.unknownEnd}`,
      ]),
      "",
    ]);
    setConsoleInput("");
  }

  return (
    <section className="hero-section" id="home" aria-labelledby="intro-title">
      <div className="hero-orb hero-orb-cyan" />
      <div className="hero-orb hero-orb-green" />

      <div className="hero-card">
        <div className="terminal-line">
          <Terminal size={16} aria-hidden="true" />
          <span className="terminal-prefix">root@portfolio:~$</span>
          {consoleActive ? (
            <strong>{content.console.online}</strong>
          ) : (
            <>
              <span id="terminal-text">{typedWord}</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </>
          )}
        </div>

        {!consoleActive ? (
          <div className="hero-normal">
            <p className="section-kicker">{content.kicker}</p>
            <h1 id="intro-title">
              {content.greeting} <span>{content.name}</span>
            </h1>
            <p className="hero-intro">{content.intro}</p>
            <p className="hero-subnote">{content.subnote}</p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={onScrollToProjects}>
                {content.viewProjects}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              <button
                className="secondary-action"
                type="button"
                onClick={() => {
                  setConsoleActive(true);
                  setConsoleLogs((current) => [...current, ...content.console.initialized]);
                }}
              >
                {content.initialize}
                <Terminal size={17} aria-hidden="true" />
              </button>
              <button className="ghost-action" type="button" onClick={onScrollToContact}>
                {content.contact}
              </button>
            </div>
          </div>
        ) : (
          <div className="hero-console" ref={consolePanelRef}>
            <div className="console-toolbar">
              <span>{content.console.title}</span>
              <button type="button" onClick={returnToProfile}>
                {content.console.back}
                <X size={15} aria-hidden="true" />
              </button>
            </div>
            <div className="console-log custom-scrollbar" ref={consoleLogRef}>
              {consoleLogs.map((log, index) => (
                <div
                  className={
                    log.startsWith(">")
                      ? "log-command"
                      : log.includes(":") || log.includes("//")
                        ? "log-accent"
                        : "log-line"
                  }
                  key={`${log}-${index}`}
                >
                  {log}
                </div>
              ))}
            </div>
            <form className="console-input-row" onSubmit={submitConsole}>
              <span>yijun@portfolio:~$</span>
              <input
                ref={consoleInputRef}
                type="text"
                value={consoleInput}
                onChange={(event) => setConsoleInput(event.target.value)}
                placeholder={content.console.placeholder}
              />
              <button type="submit">{content.console.execute}</button>
            </form>
          </div>
        )}
      </div>

      <div className="explore-indicator" aria-hidden="true">
        <span>{content.explore}</span>
        <i />
      </div>
    </section>
  );
}

function ProjectPreview({ project, content }) {
  return (
    <a
      className="project-preview-frame"
      href={project.previewUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${content.previewAction}: ${project.title}`}
    >
      <span className="project-preview-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>{project.previewLabel}</strong>
      </span>
      <img
        className="project-preview-image"
        src={project.previewImage}
        alt={`${project.title} ${content.previewAlt}`}
        loading="lazy"
      />
    </a>
  );
}

function ProjectCard({ project, content }) {
  return (
    <article className={`project-card project-card-${project.id}`}>
      <div className="project-visual">
        <ProjectPreview project={project} content={content} />
        <div className="project-preview-note">
          <span>{content.liveSnapshot}</span>
          <ExternalLink size={14} aria-hidden="true" />
        </div>
      </div>

      <div className="project-copy">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <dl className="project-meta">
          <div>
            <dt>{content.role}</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        <p>{project.copy}</p>
        <p className="project-problem">{project.problem}</p>

        <div className="tag-list" aria-label={`${project.title} ${content.highlights}`}>
          {project.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.href} target="_blank" rel="noreferrer">
            {content.openProject}
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects({ content }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProjects = content.items.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.copy.toLowerCase().includes(query) ||
      project.problem.toLowerCase().includes(query) ||
      project.highlights.some((highlight) => highlight.toLowerCase().includes(query))
    );
  });

  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-header section-header-row">
        <div>
          <p className="section-kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
        </div>
        <div className="section-line" />
        <div className="section-status">
          <span />
          [{filteredProjects.length}/{content.items.length}_{content.status}]
        </div>
      </div>

      <div className="project-toolbar">
        <div className="project-filter-chip">{content.filter}</div>
        <label className="project-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={content.searchPlaceholder}
          />
        </label>
      </div>

      <div className="project-list">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} content={content} />
        ))}
        {filteredProjects.length === 0 && <p className="empty-state">{content.empty}</p>}
      </div>
    </section>
  );
}

function Skills({ content }) {
  const [activeSkill, setActiveSkill] = useState("frontend");
  const active = content.groups.find((skill) => skill.id === activeSkill) || content.groups[0];

  return (
    <section className="content-section skills-section" id="skills">
      <div className="section-header centered">
        <p className="section-kicker">{content.kicker}</p>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </div>

      <div className="skill-grid">
        {content.groups.map(({ id, title, copy, tags }) => {
          const Icon = skillIcons[id];
          return (
            <button
              className={`skill-card ${activeSkill === id ? "is-active" : ""}`}
              type="button"
              key={id}
              onClick={() => setActiveSkill(id)}
            >
              <Icon size={28} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className="tag-list">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="skill-report">
        <div>
          <span>{content.activeFocus}</span>
          <strong>{active.title}</strong>
        </div>
        <div>
          <span>{content.verification}</span>
          <strong>{content.verificationValue}</strong>
        </div>
        <p>{active.copy}</p>
      </div>
    </section>
  );
}

function ExperienceLogo({ type }) {
  return (
    <img
      className={`experience-logo ${type === "fresh" ? "fresh-logo" : "ontario-logo"}`}
      src={
        type === "fresh"
          ? "/experience-logos/fresh-city-farms.svg"
          : "/experience-logos/ontario-ministry-icon.jpeg"
      }
      alt=""
    />
  );
}

function Experience({ content }) {
  return (
    <section className="content-section experience-section" id="experience">
      <div className="section-header section-header-row">
        <div>
          <p className="section-kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
        </div>
      </div>

      <div className="experience-layout">
        <aside className="experience-summary">
          <h3>{content.summaryTitle}</h3>
          <p>{content.summary}</p>
          <div className="metric-stack">
            <span>
              <strong>3</strong>
              {content.roleCount}
            </span>
            <span>
              <strong>2</strong>
              {content.projectCount}
            </span>
          </div>
        </aside>

        <div className="timeline-list">
          {content.items.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.title}`}>
              <div className="timeline-logo" aria-hidden="true">
                <ExperienceLogo type={item.logo} />
              </div>
              <div>
                <div className="timeline-title-row">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.period}</span>
                </div>
                <p>{item.copy}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content, copiedEmail, onCopyEmail }) {
  return (
    <section className="content-section contact-section" id="contact">
      <header>
        <h2>
          {content.titleBefore} <span>{content.titleAccent}</span>
        </h2>
        <p>{content.intro}</p>
      </header>

      <div className="contact-grid">
        <div className="contact-card message-card">
          <h3>
            <Terminal size={17} aria-hidden="true" />
            {content.messageTitle}
          </h3>
          <p>{content.message}</p>
          <button className="send-email-button" type="button" onClick={onCopyEmail}>
            <Send size={17} aria-hidden="true" />
            {copiedEmail ? content.copiedEmail : content.copyEmail}
          </button>
          <a className="email-address" href={`mailto:${emailAddress}`}>
            {emailAddress}
          </a>
        </div>

        <div className="contact-card network-card">
          <h3>
            <BriefcaseBusiness size={17} aria-hidden="true" />
            {content.networkTitle}
          </h3>
          {contactLinks.map(({ label, href, Icon }) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">
              <Icon size={20} aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <small>
                  {label === "GitHub" ? "/YijunYuan-Work" : content.professionalProfile}
                </small>
              </span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ))}
          <a href={resumeUrl}>
            <Download size={20} aria-hidden="true" />
            <span>
              <strong>{content.resume}</strong>
              <small>{content.resumeDetail}</small>
            </span>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="site-footer">
      <div>
        <Terminal size={16} aria-hidden="true" />
        <strong>YY_PORTFOLIO</strong>
      </div>
      <span>{content.builtWith}</span>
      <span className="online-node">
        <i />
        {content.status}
      </span>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [locale, setLocale] = useState(() => {
    const savedLocale = window.localStorage.getItem("portfolio-language");
    if (savedLocale === "en" || savedLocale === "zh") {
      return savedLocale;
    }
    return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  });
  const content = portfolioContent[locale];

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = content.pageTitle;
  }, [content.pageTitle, locale]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const currentSection =
        [...document.querySelectorAll("section[id]")]
          .reverse()
          .find((section) => scrollPosition >= section.offsetTop)?.id || "home";
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function copyEmail() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(emailAddress);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <Navbar
        activeSection={activeSection}
        content={content.nav}
        locale={locale}
        onLocaleChange={setLocale}
        onOpenResume={() => window.open(resumeUrl, "_blank")}
      />

      <main>
        <Hero
          key={locale}
          content={content.hero}
          onScrollToProjects={() => scrollTo("projects")}
          onScrollToContact={() => scrollTo("contact")}
        />
        <div className="glow-divider" />
        <Projects content={content.projects} />
        <div className="glow-divider" />
        <Skills content={content.skills} />
        <div className="glow-divider" />
        <Experience content={content.experience} />
        <div className="glow-divider" />
        <Contact content={content.contact} copiedEmail={copiedEmail} onCopyEmail={copyEmail} />
      </main>

      <Footer content={content.footer} />
    </div>
  );
}

export default App;
