/**
 * Project Data — The ONLY file you need to edit to add, remove, or reorder projects.
 *
 * To add a project:
 *   1. Copy any project object below
 *   2. Fill in the fields
 *   3. Drop your screenshot into images/projects/ (WebP preferred)
 *   4. Save — done!
 *
 * Projects appear in the order listed here.
 * "featured: true" projects get the large hero-card treatment.
 */

export const PROJECTS = [
  // ═══════════════════════════════════════════════════════════
  // CAPSTONE: JEGA
  // ═══════════════════════════════════════════════════════════
  {
    id: "jega-capstone",
    title: "JEGA: Academic Test Facility",
    subtitle: "Secure Proctored Environment for Academic Testing",
    description:
      "An open-source, full-stack application for creating a secure, proctored environment for academic testing. It provides instructors with a real-time dashboard to monitor student status, manage dynamic rosters, and visualize the physical lab layout.",
    highlights: [
      "Real-time spatial room map mirroring physical lab layout",
      "Secure RBAC with session exclusivity to prevent login sharing",
      "Dynamic roster management and bulk submission handling",
      "Automated student device status monitoring",
    ],
    techStack: [
      "React", "FastAPI", "MySQL", "Docker", "TypeScript", "Axios",
    ],
    category: "full-stack",
    image: null,
    video: "images/projects/capstone.mp4",
    gallery: [
      "images/projects/jega-dashboard.png",
      "images/projects/jega-activity.png",
      "images/projects/jega-files.png",
    ],
    links: {
      github: "https://github.com/aguo890/capstone",
      demo: null,
      live: null,
    },
    note: "GitHub access on request.",
    featured: true,
  },

  // ═══════════════════════════════════════════════════════════
  // FLAGSHIP 1: LineSight
  // ═══════════════════════════════════════════════════════════
  {
    id: "linesight",
    title: "LineSight",
    subtitle: "AI-Driven Manufacturing Intelligence",
    description:
      "A B2B SaaS platform that bridges the digital divide in apparel manufacturing. LineSight uses LLM-powered Semantic ETL to parse messy Excel spreadsheets — no rigid templates — and delivers real-time analytics on production efficiency, quality control, and workforce optimization. Designed for factory managers who shouldn't need an IT department to understand their own data.",
    highlights: [
      "Semantic ETL engine powered by DeepSeek-V3 with fuzzy column matching",
      "Multi-tier Hybrid Matching: alias cache → RapidFuzz → LLM fallback",
      "Real-time dashboard with drag-and-drop widgets, dark mode, and 8-language RTL support",
      "RBAC with organization → factory → production line hierarchy",
      "PII protection via Microsoft Presidio before any LLM processing",
      "Background job processing with Celery + Redis",
    ],
    techStack: [
      "React 19", "TypeScript", "FastAPI", "PostgreSQL",
      "DeepSeek-V3", "Celery", "Redis", "Docker",
      "Playwright", "Tailwind CSS",
    ],
    category: "full-stack",
    image: null,
    video: "images/projects/Linesight.mp4",
    gallery: [],
    links: {
      github: "https://github.com/aguo890/linesight",
      demo: "https://drive.google.com/file/d/15tm-84NbP3e_RE5n8vTv97zNvIOZiah1/view?usp=drive_link",
      live: null,
    },
    note: "",
    featured: true,
  },

  // ═══════════════════════════════════════════════════════════
  // FLAGSHIP 2: LokumAI
  // ═══════════════════════════════════════════════════════════
  {
    id: "lokumai",
    title: "LokumAI",
    subtitle: "Smart Tax Optimization for Traveling Physicians",
    description:
      "A specialized fintech platform for locum tenens physicians operating S-Corps across multiple states. LokumAI automates multi-state payroll apportionment, enforces Accountable Plan compliance, and features an agentic AI assistant (\"Lucas\") that performs multi-step tax reasoning with RAG-powered citations. Built to protect physicians from audit risk — not just track expenses.",
    highlights: [
      "Multi-state tax nexus calculator with physical presence day tracking",
      "Payroll apportionment engine with state reciprocity logic (e.g., MD→PA)",
      "Agentic AI CPA \"Lucas\" with router, RAG context, and HITL write actions",
      "Accountable Plan validation engine for IRS compliance",
      "Audit log with event sourcing — every financial mutation is traceable",
      "Gusto payroll integration (mock + production modes)",
    ],
    techStack: [
      "React", "TypeScript", "FastAPI", "MySQL",
      "OpenAI GPT-4o", "Veryfi OCR", "Docker", "Tailwind CSS",
    ],
    category: "full-stack",
    image: null,
    video: "images/projects/LokumAI.mp4",
    gallery: [],
    links: {
      github: "https://github.com/aguo890/tax-os",
      demo: "https://drive.google.com/file/d/1-6cWK3L9uAJTZqGEh0gtmbpxBO6OLAv_/view?usp=drive_link",
      live: null,
    },
    note: "",
    featured: true,
  },

  // ═══════════════════════════════════════════════════════════
  // OPEN SOURCE CONTRIBUTIONS
  // ═══════════════════════════════════════════════════════════
  {
    id: "job-scraping-app",
    title: "Job Scraping Engine",
    subtitle: "Multi-ATS Aggregator with AI Scoring",
    description:
      "An automated job intelligence platform that scrapes Greenhouse, Lever, and Ashby APIs daily via GitHub Actions, scores postings with a configurable keyword algorithm, and generates ranked digest reports. Features applied-job persistence, ghost-job detection, and optional GPT-powered analysis for resume tailoring and interview prep.",
    highlights: [],
    techStack: [
      "Python", "GitHub Actions", "OpenAI API",
      "Greenhouse API", "Lever API", "Ashby GraphQL",
    ],
    category: "open-source",
    image: null,
    video: "images/projects/job-scraping-app.mp4",
    gallery: [],
    links: {
      github: "https://github.com/aguo890/job-scraping-app",
      demo: null,
      live: null,
    },
    note: null,
    featured: false,
  },
  {
    id: "rendercv",
    title: "RenderCV",
    subtitle: "Open-Source CV Generator — Contributor",
    description:
      "Contributing to RenderCV, a popular open-source YAML-to-PDF resume generator on PyPI. Built a custom web application layer with live preview, download functionality, and real-time PNG rendering on top of the core LaTeX pipeline.",
    highlights: [],
    techStack: ["Python", "FastAPI", "LaTeX", "Pydantic", "Jinja2", "YAML"],
    category: "open-source",
    image: null,
    video: "images/projects/rendercv.mp4",
    gallery: [],
    links: {
      github: "https://github.com/aguo890/rendercv",
      demo: null,
      live: "https://rendercv.com",
    },
    note: "Fork of rendercv/rendercv",
    featured: false,
  },

  // ═══════════════════════════════════════════════════════════
  // OTHER PROJECTS
  // ═══════════════════════════════════════════════════════════

  {
    id: "esports-analysis",
    title: "Statistical Analysis in Esports",
    subtitle: "Published Research Paper",
    description:
      "Performed EDA on 400,000+ League of Legends matches and applied regression models to determine the statistical significance of in-game resources on match outcomes. Published in the Journal of Student Research.",
    highlights: [],
    techStack: ["R", "dplyr", "ggplot2", "Statistical Modeling"],
    category: "data",
    image: null,
    gallery: [],
    links: {
      github: null,
      demo: null,
      live: "https://www.jsr.org/preprints/index.php/scholarlaunch/preprint/view/153",
    },
    note: null,
    featured: false,
  },
  {
    id: "content-pipeline",
    title: "AI-Powered Content Pipeline",
    subtitle: "Automated Social Media Engine",
    description:
      "An automated pipeline that generates and deploys video content across TikTok and other platforms, fully orchestrated with cron jobs in a Linux environment.",
    highlights: [],
    techStack: ["Python", "REST APIs", "Shell Scripting", "Cron", "Linux"],
    category: "data",
    image: null,
    gallery: [],
    links: {
      github: "https://github.com/aguo890/ImprovedVideoBot",
      demo: null,
      live: "https://www.tiktok.com/@crazystorylord",
    },
    note: null,
    featured: false,
  },

  {
    id: "graduate-application",
    title: "Graduate Application System",
    subtitle: "Full-Stack App with AI Chatbot",
    description:
      "Led a team of 6 to build a full-stack graduate application platform featuring an AI chatbot for user support, with cloud deployment on AWS and a MySQL-backed architecture.",
    highlights: [],
    techStack: ["Python", "Flask", "MySQL", "AWS", "Gemini API", "JavaScript"],
    category: "full-stack",
    image: null,
    gallery: [],
    links: {
      github: "https://github.com/aguo890/project-phase-i-are-we-cooked",
      demo: "https://www.youtube.com/watch?v=TcF3sAtyHhM",
      live: null,
    },
    note: "GitHub access on request.",
    featured: false,
  },

];
