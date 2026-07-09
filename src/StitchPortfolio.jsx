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

const resumeUrl = "/resume-developer.pdf";
const emailAddress = "yijun.yuan@alumni.utoronto.ca";

const terminalWords = [
  "software_developer",
  "product_designer",
  "qa_minded_builder",
  "fullstack_learner",
  "ship_useful_tools",
];

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const sideProjects = [
  {
    id: "apply-track",
    title: "Apply Track",
    category: "workflow",
    role: "Designer & Developer",
    href: "https://apply-track-six.vercel.app/",
    previewImage: "/project-previews/applytrack-dashboard.png",
    previewUrl: "https://apply-track-six.vercel.app/#/demo",
    previewLabel: "ApplyTrack live demo preview",
    copy: "A focused job application workspace built from a problem I was feeling directly.",
    problem:
      "It helps me keep companies, roles, statuses, imported spreadsheet rows, and next steps in one calmer place while job searching.",
    highlights: ["React", "Vite", "Spreadsheet import", "Personal workflow"],
  },
  {
    id: "french-desk",
    title: "French Desk",
    category: "learning",
    role: "Designer & Developer",
    href: "https://french-learning-theta.vercel.app/",
    previewImage: "/project-previews/frenchdesk-today.png",
    previewUrl: "https://french-learning-theta.vercel.app/#/demo",
    previewLabel: "French Desk live demo preview",
    copy: "A personal French learning hub for notes that were getting too hard to review.",
    problem:
      "It gives me a calmer place to collect vocabulary, phrases, grammar, pronunciation notes, quizzes, and short daily study sessions.",
    highlights: ["React", "Supabase", "Tailwind", "AI vocabulary autofill"],
  },
];

const experienceNotes = [
  {
    title: ".NET Developer Co-op",
    company: "Ontario Ministry of Education",
    period: "Sep 2024 - Dec 2024",
    logo: "ontario",
    copy: "During my developer co-op, I contributed to the development and maintenance of internal applications used by educators and ministry staff. I collaborated with developers and business stakeholders to implement new features, resolve issues, and improve application usability using .NET technologies and modern development practices.",
    tags: [".NET", "Web apps", "Stakeholder collaboration"],
  },
  {
    title: "IT QA Assistant Co-op",
    company: "Ontario Ministry of Education",
    period: "Jan 2024 - Aug 2024",
    logo: "ontario",
    copy: "As an IT QA Assistant, I was responsible for ensuring the quality and reliability of educational applications used across Ontario. I designed and executed test cases, reported and verified defects, and developed automation scripts to improve testing efficiency while working closely with developers and business teams.",
    tags: ["QA", "Automation", "HP ALM"],
  },
  {
    title: "Quality Assurance Tester Co-op",
    company: "Fresh City Farms",
    period: "Jan 2023 - Apr 2023",
    logo: "fresh",
    copy: "At Fresh City Farms, I supported the quality assurance process for the company's e-commerce platform and internal systems. I performed functional and regression testing, documented defects with detailed reproduction steps, and collaborated with developers to ensure a smooth and reliable user experience.",
    tags: ["Regression testing", "Jira", "E-commerce"],
  },
];

const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Product Building",
    icon: Code2,
    copy: "React interfaces, responsive layouts, product workflows, and UI polish that makes tools feel clear.",
    tags: ["React", "JavaScript", "HTML", "CSS", "Vite"],
  },
  {
    id: "data",
    title: "Data And Systems Thinking",
    icon: Cpu,
    copy: "Comfortable working around dashboards, collection workflows, validation rules, and data-heavy screens.",
    tags: ["Python", "SQL", "C", "Data workflows"],
  },
  {
    id: "qa",
    title: "QA Mindset",
    icon: Check,
    copy: "I look for edge cases, unclear states, broken assumptions, and details that create real user friction.",
    tags: ["Manual testing", "Test cases", "Defect reports", "Automation"],
  },
];

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

function Navbar({ activeSection, onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav-inner">
        <a className="brand-mark" href="#home" aria-label="Back to top">
          <Terminal size={16} aria-hidden="true" />
          <span>YY_SYSTEM</span>
        </a>

        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a className={isActive ? "is-active" : ""} href={link.href} key={link.name}>
                {link.name}
              </a>
            );
          })}
          <button className="nav-resume" type="button" onClick={onOpenResume}>
            Resume
          </button>
        </div>

        <div className="mobile-nav-actions">
          <button className="nav-resume compact" type="button" onClick={onOpenResume}>
            Resume
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              className={activeSection === link.href.slice(1) ? "is-active" : ""}
              href={link.href}
              key={link.name}
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

function Hero({ onScrollToProjects, onScrollToContact }) {
  const [typedWord, setTypedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [consoleActive, setConsoleActive] = useState(false);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([
    "YY_PORTFOLIO OS v1.0 initialized.",
    "LOADING PROJECT WORKSPACE...",
    "STATUS: AVAILABLE_FOR_HIRE",
    'Type "help" for available commands.',
    "",
  ]);
  const consoleInputRef = useRef(null);
  const consoleLogRef = useRef(null);
  const consolePanelRef = useRef(null);

  useEffect(() => {
    if (consoleActive) {
      return undefined;
    }

    const currentWord = terminalWords[wordIndex];
    const delay = !isDeleting && charIndex === currentWord.length ? 1600 : isDeleting ? 65 : 125;

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % terminalWords.length);
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
  }, [charIndex, consoleActive, isDeleting, wordIndex]);

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
    const command = consoleInput.trim().toLowerCase();
    if (!command) {
      return;
    }

    const responses = {
      help: [
        `> ${consoleInput}`,
        "Available commands:",
        "  whoami    - Short profile",
        "  skills    - Current technical stack",
        "  projects  - Featured personal projects",
        "  status    - Availability and location",
        "  clear     - Clear terminal",
        "  exit      - Close interactive console",
      ],
      whoami: [
        `> ${consoleInput}`,
        "YIJUN YUAN // SOFTWARE DEVELOPER + CS STUDENT",
        "Builds practical tools, tests carefully, and learns by shipping real products.",
      ],
      skills: [
        `> ${consoleInput}`,
        "CORE STACK:",
        "  Frontend: React, JavaScript, HTML, CSS, Vite",
        "  Data:     Python, SQL, C",
        "  QA:       Manual testing, test cases, defect verification, automation",
      ],
      projects: [
        `> ${consoleInput}`,
        "FEATURED PROJECTS:",
        "  Apply Track  - Job application workflow system",
        "  French Desk  - AI-assisted French learning workspace",
      ],
      status: [
        `> ${consoleInput}`,
        "AVAILABILITY: AVAILABLE_FOR_HIRE",
        "LOCATION: Scarborough, Ontario",
        "FOCUS: Software development, QA, product-minded engineering",
      ],
    };

    if (command === "clear") {
      setConsoleLogs([]);
      setConsoleInput("");
      return;
    }

    if (command === "exit") {
      setConsoleLogs((current) => [...current, `> ${consoleInput}`, "CLOSING_CONSOLE...", ""]);
      setConsoleInput("");
      window.setTimeout(() => setConsoleActive(false), 600);
      return;
    }

    setConsoleLogs((current) => [
      ...current,
      ...(responses[command] || [
        `> ${consoleInput}`,
        `Command not recognized: "${command}". Type "help" to view available commands.`,
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
            <strong>interactive_protocol_online</strong>
          ) : (
            <>
              <span id="terminal-text">{typedWord}</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </>
          )}
        </div>

        {!consoleActive ? (
          <div className="hero-normal">
            <p className="section-kicker">Software developer / CS student</p>
            <h1 id="intro-title">
              Hi, I'm <span>Yijun Yuan</span>
            </h1>
            <p className="hero-intro">
              I'm a software developer and computer science student who enjoys
              turning ideas into real products. From full-stack web applications
              to AI-powered learning tools, I love building software that solves
              problems and creates meaningful experiences.
            </p>
            <p className="hero-subnote">
              I'm always exploring new technologies and looking for opportunities
              to learn, grow, and ship impactful products.
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={onScrollToProjects}>
                View projects
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              <button
                className="secondary-action"
                type="button"
                onClick={() => {
                  setConsoleActive(true);
                  setConsoleLogs((current) => [
                    ...current,
                    "USER DISPATCHED: INITIALIZE_CONSOLE",
                    "ACTIVE SYSTEM LINK ATTACHED.",
                    "",
                  ]);
                }}
              >
                Initialize protocol
                <Terminal size={17} aria-hidden="true" />
              </button>
              <button className="ghost-action" type="button" onClick={onScrollToContact}>
                Contact node
              </button>
            </div>
          </div>
        ) : (
          <div className="hero-console" ref={consolePanelRef}>
            <div className="console-toolbar">
              <span>Interactive console</span>
              <button type="button" onClick={returnToProfile}>
                Back to profile
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
                placeholder="try help, whoami, skills, projects, status..."
              />
              <button type="submit">EXEC</button>
            </form>
          </div>
        )}
      </div>

      <div className="explore-indicator" aria-hidden="true">
        <span>Explore</span>
        <i />
      </div>
    </section>
  );
}

function ProjectPreview({ project }) {
  return (
    <a
      className="project-preview-frame"
      href={project.previewUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} live preview`}
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
        alt={`${project.title} product preview`}
        loading="lazy"
      />
    </a>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card-${project.id}`}>
      <div className="project-visual">
        <ProjectPreview project={project} />
        <div className="project-preview-note">
          <span>Live app snapshot</span>
          <ExternalLink size={14} aria-hidden="true" />
        </div>
      </div>

      <div className="project-copy">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <dl className="project-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        <p>{project.copy}</p>
        <p className="project-problem">{project.problem}</p>

        <div className="tag-list" aria-label={`${project.title} highlights`}>
          {project.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.href} target="_blank" rel="noreferrer">
            Open project
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProjects = sideProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.problem.toLowerCase().includes(query) ||
      project.highlights.some((highlight) => highlight.toLowerCase().includes(query))
    );
  });

  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-header section-header-row">
        <div>
          <p className="section-kicker">Core deployments</p>
          <h2>Personal projects</h2>
        </div>
        <div className="section-line" />
        <div className="section-status">
          <span />
          [{filteredProjects.length}/2_ACTIVE_CORES]
        </div>
      </div>

      <div className="project-toolbar">
        <div className="project-filter-chip">All systems</div>
        <label className="project-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search projects, stack, workflow..."
          />
        </label>
      </div>

      <div className="project-list">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [activeSkill, setActiveSkill] = useState("frontend");
  const active = skillGroups.find((skill) => skill.id === activeSkill) || skillGroups[0];

  return (
    <section className="content-section skills-section" id="skills">
      <div className="section-header centered">
        <p className="section-kicker">Tech stack</p>
        <h2>Technical proficiencies</h2>
        <p>
          A practical mix of frontend building, data workflows, and QA judgment.
          Click a card to inspect the current focus area.
        </p>
      </div>

      <div className="skill-grid">
        {skillGroups.map(({ id, title, icon: Icon, copy, tags }) => (
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
        ))}
      </div>

      <div className="skill-report">
        <div>
          <span>ACTIVE_FOCUS</span>
          <strong>{active.title}</strong>
        </div>
        <div>
          <span>VERIFICATION_STATUS</span>
          <strong>learning_by_building</strong>
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

function Experience() {
  return (
    <section className="content-section experience-section" id="experience">
      <div className="section-header section-header-row">
        <div>
          <p className="section-kicker">Career log</p>
          <h2>Professional journey</h2>
        </div>
      </div>

      <div className="experience-layout">
        <aside className="experience-summary">
          <h3>System metrics</h3>
          <p>
            Co-op roles where I contributed to production systems, QA workflows,
            and public-sector data tools.
          </p>
          <div className="metric-stack">
            <span>
              <strong>3</strong>
              Co-op roles
            </span>
            <span>
              <strong>2</strong>
              Product side projects
            </span>
          </div>
        </aside>

        <div className="timeline-list">
          {experienceNotes.map((item) => (
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

function Contact({ copiedEmail, onCopyEmail }) {
  return (
    <section className="content-section contact-section" id="contact">
      <header>
        <h2>
          Let's build something <span>useful</span>
        </h2>
        <p>
          Open to all kinds of opportunities where I can build useful products,
          contribute carefully, and keep growing while making impact.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-card message-card">
          <h3>
            <Terminal size={17} aria-hidden="true" />
            TRANSMIT_MESSAGE
          </h3>
          <p>
            The fastest route is email. Send the context, the problem, and what
            kind of help you need.
          </p>
          <button className="send-email-button" type="button" onClick={onCopyEmail}>
            <Send size={17} aria-hidden="true" />
            {copiedEmail ? "EMAIL_COPIED" : "COPY_EMAIL_ADDRESS"}
          </button>
          <a className="email-address" href={`mailto:${emailAddress}`}>
            {emailAddress}
          </a>
        </div>

        <div className="contact-card network-card">
          <h3>
            <BriefcaseBusiness size={17} aria-hidden="true" />
            NETWORK_NODES
          </h3>
          {contactLinks.map(({ label, href, Icon }) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">
              <Icon size={20} aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <small>{label === "GitHub" ? "/YijunYuan-Work" : "Professional profile"}</small>
              </span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ))}
          <a href={resumeUrl}>
            <Download size={20} aria-hidden="true" />
            <span>
              <strong>Resume</strong>
              <small>Download PDF</small>
            </span>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Terminal size={16} aria-hidden="true" />
        <strong>YY_PORTFOLIO</strong>
      </div>
      <span>2026 // BUILT_WITH_REACT</span>
      <span className="online-node">
        <i />
        NODES_SECURE
      </span>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      <Navbar activeSection={activeSection} onOpenResume={() => window.open(resumeUrl, "_blank")} />

      <main>
        <Hero
          onScrollToProjects={() => scrollTo("projects")}
          onScrollToContact={() => scrollTo("contact")}
        />
        <div className="glow-divider" />
        <Projects />
        <div className="glow-divider" />
        <Skills />
        <div className="glow-divider" />
        <Experience />
        <div className="glow-divider" />
        <Contact copiedEmail={copiedEmail} onCopyEmail={copyEmail} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
