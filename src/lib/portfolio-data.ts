// ─────────────────────────────────────────────────────────────
// Portfolio Data — Single source of truth for all site content
// ─────────────────────────────────────────────────────────────

// ── Type Definitions ────────────────────────────────────────

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null; // null = present
}

export interface Skill {
  name: string;
  icon: string; // key to look up in techLogos
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  year: number;
  description: string[];
  technologies: string[];
  githubUrl: string | null; // null means not available yet
  liveUrl: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  organizer: string;
  description: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string; // key for socialIcons
  isPlaceholder: boolean; // true if URL needs to be replaced
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
}

export interface Stats {
  label: string;
  value: number;
  suffix: string;
}

// ── Personal Info ───────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Agneesh A Nayak',
  title: 'Full Stack Web Developer',
  tagline:
    'From Mangalore, I build platforms that connect people, places, and problems to real solutions.',
  location: 'Mangalore, India',
  email: 'agneeshnayak45@gmail.com',
  phone: '+91 6362414596',
};

// ── Education ───────────────────────────────────────────────

export const education: Education[] = [
  {
    id: 'edu-be-cs',
    degree: 'Bachelor of Engineering — Computer Science',
    institution: 'Canara Engineering College',
    location: 'Mangalore, Karnataka',
    period: 'Sept 2023 – Present',
    startYear: 2023,
    endYear: null,
  },
  {
    id: 'edu-puc',
    degree: 'Pre-University — PCMC',
    institution: 'S V Pre-University College',
    location: 'Gangolli, Karnataka',
    period: 'Jun 2020 – May 2022',
    startYear: 2020,
    endYear: 2022,
  },
];

// ── Skills ──────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    id: 'cat-languages',
    name: 'Languages',
    skills: [
      { name: 'Java', icon: 'java' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'C', icon: 'c' },
      { name: 'C++', icon: 'cpp' },
      { name: 'SQL (MySQL)', icon: 'sql' },
    ],
  },
  {
    id: 'cat-backend',
    name: 'Backend',
    skills: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'expressjs' },
    ],
  },
  {
    id: 'cat-frontend',
    name: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'reactjs' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
    ],
  },
  {
    id: 'cat-tools',
    name: 'Developer Tools',
    skills: [
      { name: 'VS Code', icon: 'vscode' },
      { name: 'GitHub', icon: 'github' },
    ],
  },
  {
    id: 'cat-interests',
    name: 'Areas of Interest',
    skills: [
      { name: 'Frontend Development', icon: 'frontend-dev' },
      { name: 'Full-Stack Development', icon: 'fullstack-dev' },
    ],
  },
];

// ── Projects ────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'proj-placement-pro',
    title: 'Placement Pro',
    techStack: 'HTML5 / CSS3 / Vanilla JS / Node.js / Express.js / MongoDB',
    year: 2026,
    description: [
      'A web-based platform to manage campus placement activities including student registration, job postings, and application tracking.',
      'Secure authentication using JWT and bcryptjs, with real-time notifications via Socket.io to keep students updated on placement opportunities.',
      'File uploads via Multer and automated PDF generation via Puppeteer/PDFKit; MongoDB stores student profiles, resumes, and placement records.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Socket.io',
      'Multer',
      'Puppeteer',
      'PDFKit',
    ],
    githubUrl: 'https://github.com/AgneeshNayak/placementPro',
    liveUrl: null,
  },
  {
    id: 'proj-disaster-alert',
    title: 'Real-Time Disaster Alert System',
    techStack: 'HTML / CSS / JS / Node.js / SQLite',
    year: 2025,
    description: [
      'A real-time disaster alert web application allowing users to report incidents with details, photos, and live GPS location.',
      'Location detection via the JavaScript Geolocation API, integrated with a geocoding API in the Node.js backend to convert coordinates into readable addresses.',
      'Admin dashboard to view, verify, and manage reported incidents — incident type, uploaded images, and full address details stored in SQLite.',
    ],
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'SQLite',
      'Geolocation API',
    ],
    githubUrl: 'https://github.com/AgneeshNayak/hackthon',
    liveUrl: null,
  },
  {
    id: 'proj-warehouse',
    title: 'Smart Warehouse Management System',
    techStack: 'HTML / CSS / PostgreSQL / Express.js / Node.js',
    year: 2025,
    description: [
      'A centralized digital platform to manage inventory, track products, and streamline warehouse operations.',
      'Real-time dashboard for monitoring stock availability, product movement, and inventory updates to support efficient decision-making.',
      'Frontend built with HTML/CSS/JavaScript; backend with Node.js and Express.js; PostgreSQL for reliable data storage.',
    ],
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/AgneeshNayak/warehouse',
    liveUrl: null,
  },
];

// ── Achievements ────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    id: 'ach-solvathon',
    title: 'SOLVE-A-THON 1.0',
    year: 2026,
    organizer: 'Srinivas Institute of Technology',
    description:
      'Participated in SOLVE-A-THON 1.0, a competitive hackathon organized by Srinivas Institute of Technology, building innovative solutions under time constraints.',
  },
  {
    id: 'ach-ceatherion',
    title: 'CEATHERION 2025',
    year: 2025,
    organizer: 'Canara Engineering College',
    description:
      'Competed in CEATHERION 2025, a technical competition hosted by Canara Engineering College, showcasing engineering and problem-solving skills.',
  },
  {
    id: 'ach-technovate',
    title: 'TechNovate 2024',
    year: 2024,
    organizer: 'Dept of Science and Humanities, Canara Engineering College',
    description:
      'Participated in TechNovate 2024, organized by the Department of Science and Humanities at Canara Engineering College, demonstrating technical innovation.',
  },
];

// ── Social Links ────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    id: 'social-email',
    platform: 'Email',
    url: 'mailto:agneeshnayak45@gmail.com',
    icon: 'email',
    isPlaceholder: false,
  },
  {
    id: 'social-phone',
    platform: 'Phone',
    url: 'tel:+916362414596',
    icon: 'phone',
    isPlaceholder: false,
  },
  {
    id: 'social-linkedin',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/agneesh-nayak/',
    icon: 'linkedin',
    isPlaceholder: false,
  },
  {
    id: 'social-github',
    platform: 'GitHub',
    url: 'https://github.com/AgneeshNayak',
    icon: 'github',
    isPlaceholder: false,
  },
  {
    id: 'social-leetcode',
    platform: 'LeetCode',
    url: 'https://leetcode.com/u/Agneesh_A_Nayak/',
    icon: 'leetcode',
    isPlaceholder: false,
  },
];

// ── Stats ───────────────────────────────────────────────────

export const stats: Stats[] = [
  { label: 'Projects Built', value: 3, suffix: '+' },
  { label: 'Hackathons', value: 3, suffix: '+' },
  { label: 'Core Technologies', value: 10, suffix: '+' },
];
