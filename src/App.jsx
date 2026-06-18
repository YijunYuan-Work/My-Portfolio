import { useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Compass,
  Download,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  Link,
  Mail,
  MapPin,
  MountainSnow,
  NotebookPen,
  SearchCode,
  Sparkles,
  TestTube2,
  Wrench,
} from "lucide-react";
import "./App.css";

const resumeUrl = "/resume-developer.pdf";
const emailAddress = "yijun.yuan@alumni.utoronto.ca";

const focusAreas = [
  {
    title: "QA brain",
    Icon: Compass,
    copy: "I look for edge cases, unclear states, and the tiny details that turn into real user frustration.",
  },
  {
    title: "Builder brain",
    Icon: Wrench,
    copy: "I learn fastest when the thing is real enough to break, improve, and explain to someone else.",
  },
  {
    title: "Systems brain",
    Icon: TestTube2,
    copy: "I like workflows, dashboards, games, and feedback loops because they show how small decisions connect.",
  },
];

const currentNotes = [
  "Building small tools for real problems.",
  "Improving this portfolio while learning React.",
  "Open to developer and QA roles.",
  "Based in Scarborough, Ontario.",
];

const deskNotes = [
  {
    label: "Open file",
    value: "portfolio/App.jsx",
  },
  {
    label: "Current build",
    value: "Apply Track",
  },
  {
    label: "Working style",
    value: "small steps, clear notes",
  },
];

const skillGroups = [
  {
    title: "Languages",
    Icon: Code2,
    skills: ["Python", "C", "SQL"],
  },
  {
    title: "Web",
    Icon: SearchCode,
    skills: ["React", "HTML", ".NET"],
  },
  {
    title: "Tools",
    Icon: Wrench,
    skills: ["Git", "Docker", "VS Code"],
  },
  {
    title: "Testing",
    Icon: TestTube2,
    skills: ["HP ALM", "Jira", "Manual testing"],
  },
];

const experienceNotes = [
  {
    title: ".NET Developer Co-op",
    company: "Ontario Ministry of Education",
    period: "Sep 2024 - Dec 2024",
    copy: "Worked around web-based data systems, dashboards, annual collection forms, validation rules, and regression-support tools.",
  },
  {
    title: "IT QA Assistant Co-op",
    company: "Ontario Ministry of Education",
    period: "Jan 2024 - Aug 2024",
    copy: "Tested school data collection workflows, role-based access, submissions, and defects with HP ALM.",
  },
  {
    title: "Quality Assurance Tester Co-op",
    company: "Fresh City Farms",
    period: "Jan 2023 - Apr 2023",
    copy: "Tested website pages across browsers and devices, then reported issues in Jira with reproduction steps.",
  },
];

const education = [
  {
    school: "Trent University",
    credential: "MSc, Applied Modelling and Quantitative Methods",
    detail: "Expected graduation: August 2026",
  },
  {
    school: "University of Toronto",
    credential: "Honours BSc Co-op, Computer Science Specialist",
    detail: "September 2020 - August 2025",
  },
];

const personalNotes = [
  {
    title: "Skiing",
    Icon: MountainSnow,
    copy: "I was once a Level 1 ski instructor, so I have spent a lot of time explaining scary-looking slopes in calm steps.",
  },
  {
    title: "Games",
    Icon: Gamepad2,
    copy: "I like CS2, League of Legends, and Forza Horizon. Games are a fun mix of systems, feedback loops, and small decisions under pressure.",
  },
  {
    title: "Curiosity",
    Icon: Lightbulb,
    copy: "I enjoy figuring out how unfamiliar systems work, whether that system is a codebase, a dashboard, or a corner of a map.",
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
    href: "https://apply-track-six.vercel.app/",
    copy: "I built this because job applications started feeling like a spreadsheet with anxiety attached.",
    problem:
      "It helps me keep companies, roles, statuses, and imported spreadsheet rows in one calmer place while job searching.",
    highlights: ["React", "Vite", "Spreadsheet import", "Personal workflow"],
    rows: [
      { role: "Frontend Intern", company: "Portfolio Lab", status: "Applied" },
      { role: "QA Analyst", company: "Careful Systems", status: "Interview" },
      { role: ".NET Developer", company: "Data Portal Team", status: "Saved" },
    ],
  },
];

function IconCard({ item }) {
  const { Icon } = item;

  return (
    <article className="icon-card">
      <div className="icon-card-heading">
        <Icon size={20} aria-hidden="true" />
        <h3>{item.title}</h3>
      </div>
      <p>{item.copy}</p>
    </article>
  );
}

function DeskBoard() {
  return (
    <aside className="desk-board" aria-label="Current notes">
      <div className="desk-topline">
        <span className="desk-pin" aria-hidden="true" />
        <span>currently</span>
      </div>

      <div className="desk-title">
        <h2>On my desk</h2>
        <p>Real work, real learning, still a little messy in the useful way.</p>
      </div>

      <div className="desk-list">
        {currentNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>

      <div className="desk-meta">
        {deskNotes.map((note) => (
          <div key={note.label}>
            <span>{note.label}</span>
            <strong>{note.value}</strong>
          </div>
        ))}
      </div>

      <div className="location-line">
        <MapPin size={18} aria-hidden="true" />
        Scarborough, Ontario
      </div>
    </aside>
  );
}

function SkillGroup({ group }) {
  const { Icon } = group;

  return (
    <article className="skill-card">
      <div className="icon-card-heading">
        <Icon size={20} aria-hidden="true" />
        <h3>{group.title}</h3>
      </div>
      <div className="tag-list" aria-label={`${group.title} skills`}>
        {group.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </article>
  );
}

function SideProjectCard({ project }) {
  return (
    <article className="side-project-card">
      <div className="side-project-copy">
        <div className="icon-card-heading">
          <Link size={20} aria-hidden="true" />
          <h3>{project.title}</h3>
        </div>
        <p>{project.copy}</p>
        <p className="side-project-problem">{project.problem}</p>
      </div>

      <div className="tag-list" aria-label={`${project.title} highlights`}>
        {project.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>

      <div className="tracker-preview" aria-label={`${project.title} preview`}>
        {project.rows.map((row) => (
          <div className="tracker-row" key={`${row.company}-${row.role}`}>
            <span>{row.role}</span>
            <span>{row.company}</span>
            <strong>{row.status}</strong>
          </div>
        ))}
      </div>

      <div className="project-actions">
        <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
          Open project
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  async function copyEmail() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(emailAddress);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  }

  return (
    <main className="page-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-mark" href="#top" aria-label="Back to top">
          YY
        </a>
        <div className="nav-links">
          <a href="#projects">Project</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" aria-labelledby="intro-title">
        <div className="hero-copy" id="top">
          <p className="eyebrow">Creative developer, careful tester</p>
          <h1 id="intro-title">Hi, I am Yijun.</h1>

          <p className="intro">
            I build carefully, test patiently, and learn by making things real.
            I am a Computer Science graduate and MSc student exploring software
            development, QA, data tools, and practical side projects.
          </p>

          <p className="signature-line">
            Currently turning job-search chaos, data workflows, and small
            “wait, why is this broken?” moments into things I can actually use.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-link" href={resumeUrl} download>
              <Download size={18} aria-hidden="true" />
              Resume
            </a>
            <a className="secondary-link" href="#contact">
              <Mail size={18} aria-hidden="true" />
              Contact
            </a>
          </div>
        </div>

        <DeskBoard />
      </section>

      <section className="content-section" aria-labelledby="focus-title">
        <div className="section-heading">
          <p className="eyebrow">How I think</p>
          <h2 id="focus-title">A practical mix of testing, building, and curiosity</h2>
        </div>

        <div className="card-grid three-column">
          {focusAreas.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="content-section split-section" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">How I work</p>
          <h2 id="work-title">Small steps, clear notes, real feedback</h2>
        </div>
        <div className="story-panel">
          <NotebookPen size={22} aria-hidden="true" />
          <p>
            I like breaking vague tasks into smaller questions: what should
            happen, what actually happens, and what would make the next attempt
            clearer? My QA experience helped me communicate issues carefully,
            and my developer experience made me more interested in how those
            issues are designed out of a system.
          </p>
        </div>
      </section>

      <section
        className="content-section side-project-section"
        id="projects"
        aria-labelledby="side-projects-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Side project</p>
          <h2 id="side-projects-title">A small tool for a real personal problem</h2>
        </div>

        <div className="side-project-list">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Toolkit</p>
          <h2 id="skills-title">Comfortable basics, growing range</h2>
        </div>

        <div className="card-grid four-column">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section className="content-section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">A little production, a lot of learning</h2>
        </div>

        <div className="experience-list">
          {experienceNotes.map((item) => (
            <article className="experience-item" key={`${item.company}-${item.title}`}>
              <div>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p className="company">{item.company}</p>
              </div>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="personal-title">
        <div className="section-heading">
          <p className="eyebrow">Outside the editor</p>
          <h2 id="personal-title">A few things that make me, me</h2>
        </div>

        <div className="card-grid three-column">
          {personalNotes.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="content-section education-section" aria-labelledby="education-title">
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h2 id="education-title">Where the foundation comes from</h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <article className="education-item" key={item.school}>
              <GraduationCap size={20} aria-hidden="true" />
              <div>
                <h3>{item.school}</h3>
                <p>{item.credential}</p>
                <span>{item.detail}</span>
              </div>
            </article>
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
