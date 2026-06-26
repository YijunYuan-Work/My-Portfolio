import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Sparkles,
  X,
} from "lucide-react";
import "./App.css";

const resumeUrl = "/resume-developer.pdf";
const emailAddress = "yijun.yuan@alumni.utoronto.ca";

const statusItems = [
  {
    label: "Availability",
    value: "Available for hire",
  },
  {
    label: "Local time",
    value: "",
  },
  {
    label: "City",
    value: "Scarborough, Ontario",
  },
];

const experienceNotes = [
  {
    title: ".NET Developer Co-op",
    company: "Ontario Ministry of Education",
    period: "Sep 2024 - Dec 2024",
    logo: "ontario",
    copy: "During my developer co-op, I contributed to the development and maintenance of internal applications used by educators and ministry staff. I collaborated with developers and business stakeholders to implement new features, resolve issues, and improve application usability using .NET technologies and modern development practices.",
  },
  {
    title: "IT QA Assistant Co-op",
    company: "Ontario Ministry of Education",
    period: "Jan 2024 - Aug 2024",
    logo: "ontario",
    copy: "As an IT QA Assistant, I was responsible for ensuring the quality and reliability of educational applications used across Ontario. I designed and executed test cases, reported and verified defects, and developed automation scripts to improve testing efficiency while working closely with developers and business teams.",
  },
  {
    title: "Quality Assurance Tester Co-op",
    company: "Fresh City Farms",
    period: "Jan 2023 - Apr 2023",
    logo: "fresh",
    copy: "At Fresh City Farms, I supported the quality assurance process for the company's e-commerce platform and internal systems. I performed functional and regression testing, documented defects with detailed reproduction steps, and collaborated with developers to ensure a smooth and reliable user experience.",
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

const sideProjects = [
  {
    title: "Apply Track",
    year: "2026",
    role: "Designer & Developer",
    stack: "React, Vite",
    href: "https://apply-track-six.vercel.app/",
    cta: "Open project",
    preview: "applyTrack",
    copy: "I built this because job applications started feeling like a spreadsheet with anxiety attached.",
    problem:
      "It helps me keep companies, roles, statuses, and imported spreadsheet rows in one calmer place while job searching.",
    highlights: ["React", "Vite", "Spreadsheet import", "Personal workflow"],
    applications: [
      {
        company: "CJR Wholesale Grocers and Dairy Central",
        role: "Business Analyst",
        status: "Applied",
        fields: [
          ["Location", "Not specified"],
          ["Applied", "2026-06-18"],
          ["Follow-up", "Not set"],
          ["Interviews", "0"],
        ],
      },
      {
        company: "Telus",
        role: "Quality Assurance Analyst",
        status: "Applied",
        fields: [
          ["Location", "Toronto"],
          ["Applied", "2026-06-18"],
          ["Contact", "Not set"],
          ["Referral", "No"],
        ],
      },
    ],
  },
  {
    title: "French Desk",
    year: "2026",
    role: "Designer & Developer",
    stack: "React, Tailwind, Supabase",
    href: "https://french-learning-theta.vercel.app/",
    cta: "Open project",
    preview: "frenchDesk",
    copy: "I built this because my French notes were becoming one long document that was hard to review.",
    problem:
      "It gives me a calmer place to collect vocabulary, phrases, grammar, pronunciation notes, quizzes, and short daily study sessions.",
    highlights: [
      "React",
      "Supabase",
      "Tailwind",
      "Daily practice",
      "AI vocabulary autofill",
    ],
    metrics: [
      ["Vocabulary due", "12"],
      ["Daily goal", "20"],
      ["Saved notes", "84"],
      ["Mastered", "18"],
    ],
    dailySteps: [
      ["Add a new note", "Capture one useful word or phrase."],
      ["Study flashcards", "Review cards that still feel new."],
      ["Start today's quiz", "Check recall and advance confidence."],
    ],
  },
];

function formatLocalTime() {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Toronto",
  }).format(new Date());
}

function TopBar({ isMenuOpen, localTime, onToggleMenu }) {
  return (
    <header className="top-bar">
      <a className="top-mark" href="#top" aria-label="Back to top">
        YY
      </a>

      <div className="top-status" aria-label="Current status">
        {statusItems.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.label === "Local time" ? localTime : item.value}</strong>
          </div>
        ))}
      </div>

      <button
        className="top-menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="contact-menu"
        aria-label={isMenuOpen ? "Close contact menu" : "Open contact menu"}
        onClick={onToggleMenu}
      >
        {isMenuOpen ? <X size={24} /> : <Sparkles size={22} />}
      </button>
    </header>
  );
}

function ContactMenu({ isOpen, onCopyEmail }) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="contact-menu" id="contact-menu" aria-label="Contact menu">
      <div className="contact-menu-person">
        <div className="contact-avatar">YY</div>
        <div>
          <strong>Yijun Yuan</strong>
          <span>Scarborough, Ontario</span>
        </div>
      </div>

      <div className="contact-menu-links">
        {contactLinks.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer">
            <Icon size={20} aria-hidden="true" />
            {label}
          </a>
        ))}
        <a href={resumeUrl}>
          <Download size={20} aria-hidden="true" />
          Resume
        </a>
        <button type="button" onClick={onCopyEmail}>
          <Mail size={20} aria-hidden="true" />
          Email
        </button>
      </div>
    </aside>
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

function ApplyTrackPreview({ project }) {
  const [primaryApplication, secondaryApplication] = project.applications;

  return (
    <div className="tracker-preview applytrack-preview" aria-label={`${project.title} preview`}>
      <div className="apply-showcase-sidebar" aria-hidden="true">
        <span>A</span>
        <strong>ApplyTrack</strong>
        <p>Workspace for John</p>
        <div className="apply-showcase-nav">
          <span>Dashboard</span>
          <span>Progress</span>
          <span>Import</span>
        </div>
      </div>

      <div className="apply-showcase-stage" aria-hidden="true">
        <div className="apply-showcase-toolbar">
          <strong>101 applications</strong>
          <span>Applied</span>
        </div>

        <article className="apply-showcase-card apply-showcase-card-main">
          <span>{primaryApplication.status}</span>
          <h4>{primaryApplication.company}</h4>
          <p>{primaryApplication.role}</p>
          <div>
            <strong>Applied</strong>
            <strong>Interview</strong>
            <strong>Follow-up</strong>
          </div>
        </article>

        <article className="apply-showcase-card apply-showcase-card-secondary">
          <span>{secondaryApplication.status}</span>
          <h4>{secondaryApplication.company}</h4>
          <p>{secondaryApplication.role}</p>
        </article>

        <div className="apply-showcase-note">
          <strong>Next action</strong>
          Keep the pipeline moving.
        </div>
      </div>
    </div>
  );
}

function FrenchDeskPreview({ project }) {
  return (
    <div className="tracker-preview french-preview" aria-label={`${project.title} preview`}>
      <aside className="french-sidebar" aria-hidden="true">
        <div className="french-brand">
          <span>F</span>
          <div>
            <p>French Desk</p>
            <strong>Learning Hub</strong>
          </div>
        </div>

        <div className="french-nav">
          <span className="active">Today</span>
          <span>Study</span>
          <span>Quiz</span>
          <span>Vocabulary</span>
          <span>Grammar</span>
        </div>

        <div className="french-progress">
          <div>
            <strong>Daily progress</strong>
            <span>67%</span>
          </div>
          <div className="french-progress-bar">
            <span />
          </div>
          <p>2/3 tasks complete today.</p>
        </div>
      </aside>

      <div className="french-dashboard">
        <div className="french-header">
          <p>Bonjour, John.</p>
          <strong>Ready for 12 minutes of French?</strong>
        </div>

        <div className="french-metrics">
          {project.metrics.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="french-path">
          <div>
            <span>12-minute practice</span>
            <strong>Your French path for today</strong>
            <p>
              Capture something useful, review what is fading, then quiz what is ready.
            </p>
          </div>
          <div className="french-route" aria-hidden="true">Go</div>
        </div>

        <div className="french-step-grid">
          {project.dailySteps.map(([title, copy]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function SideProjectCard({ project }) {
  return (
    <article className={`side-project-card side-project-card-${project.preview}`}>
      <div className="side-project-copy">
        <div className="icon-card-heading">
          <h3>{project.title}</h3>
        </div>
        <dl className="project-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack}</dd>
          </div>
        </dl>
        <p>{project.copy}</p>
        <p className="side-project-problem">{project.problem}</p>
      </div>

      <div className="tag-list" aria-label={`${project.title} highlights`}>
        {project.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>

      {project.preview === "applyTrack" && <ApplyTrackPreview project={project} />}
      {project.preview === "frenchDesk" && <FrenchDeskPreview project={project} />}

      <div className="project-actions">
        <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
          {project.cta}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState(formatLocalTime);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setLocalTime(formatLocalTime());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  async function copyEmail() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(emailAddress);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  }

  return (
    <main className="page-shell">
      <TopBar
        isMenuOpen={isMenuOpen}
        localTime={localTime}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
      />
      <ContactMenu isOpen={isMenuOpen} onCopyEmail={copyEmail} />

      <section className="hero-section" aria-labelledby="intro-title">
        <div className="hero-copy" id="top">
          <p className="eyebrow">Software developer / CS student</p>
          <h1 id="intro-title" aria-label="Product designer">
            <span aria-hidden="true">Product</span>
            <span aria-hidden="true">designer</span>
          </h1>

          <p className="intro">
            I'm a software developer and computer science student who enjoys turning
            ideas into real products. From full-stack web applications to AI-powered
            learning tools, I love building software that solves problems and
            creates meaningful experiences. I'm always exploring new technologies
            and looking for opportunities to learn, grow, and ship impactful
            products.
          </p>
        </div>
      </section>

      <section
        className="content-section experience-section"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <h2 id="experience-title">Work Experience</h2>
          <p className="experience-subtitle">
            Co-op roles where I contributed to production systems, QA workflows,
            and public-sector data tools.
          </p>
        </div>

        <div className="experience-list">
          {experienceNotes.map((item) => (
            <article className="experience-item" key={`${item.company}-${item.title}`}>
              <div
                className={`experience-symbol experience-symbol-${item.logo}`}
                aria-hidden="true"
              >
                <ExperienceLogo type={item.logo} />
              </div>
              <div className="experience-body">
                <h3>{item.title}</h3>
                <p className="experience-meta">
                  {item.period}. {item.company}
                </p>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section side-project-section"
        id="projects"
        aria-labelledby="side-projects-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Personal projects</p>
          <h2 id="side-projects-title">Real solutions for problems I wanted to solve</h2>
        </div>

        <div className="side-project-list">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section
        className="closing-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">Open to opportunities</p>
          <h2 id="contact-title">Open to development and QA opportunities.</h2>
          <p>
            I am especially interested in teams where I can learn quickly,
            contribute carefully, and keep getting better.
          </p>
          <button className="email-line" type="button" onClick={copyEmail}>
            {copiedEmail ? "Copied email" : emailAddress}
          </button>
        </div>
        <div className="closing-actions">
          {contactLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href}>
              <Icon size={18} aria-hidden="true" />
              {label}
              {label !== "Email" && <ExternalLink size={14} aria-hidden="true" />}
            </a>
          ))}
          <button type="button" onClick={copyEmail}>
            <Mail size={18} aria-hidden="true" />
            {copiedEmail ? "Copied" : "Email"}
          </button>
        </div>
        <Sparkles className="closing-mark" size={28} aria-hidden="true" />
      </section>
    </main>
  );
}

export default App;
