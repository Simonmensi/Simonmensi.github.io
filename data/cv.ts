/**
 * @file data/cv.ts
 * @description Typed CV data for Lei Nuozhen (Simon Lei).
 *
 * This file is the single source of truth for all curriculum vitae content
 * rendered on the CV page. Update entries here; the UI picks up changes
 * automatically via the exported constants.
 */

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/** A single work-experience entry. */
export interface ExperienceEntry {
  /** Job title held during this role. */
  role: string;
  /** Company or organisation name. */
  company: string;
  /** Display date range string, e.g. `"Jul 2024 – Aug 2024"`. */
  period: string;
  /** City / country where the role was based. */
  location: string;
  /** Bullet-point achievements or responsibilities. */
  bullets: string[];
}

/** A single education entry. */
export interface EducationEntry {
  /** Degree or qualification awarded. */
  degree: string;
  /** Institution that awarded the qualification. */
  institution: string;
  /** Faculty or school within the institution. */
  faculty: string;
  /** Display date range string, e.g. `"Sep 2021 – Jun 2025"`. */
  period: string;
}

/** A skill category grouping related competencies. */
export interface SkillCategory {
  /** Category heading, e.g. `"Programming Languages"`. */
  category: string;
  /** Full skill string for this category (displayed as-is). */
  detail: string;
}

/** A certificate or award entry. */
export interface CertificateEntry {
  /** Title of the certificate or award. */
  title: string;
  /** Date or date range string, e.g. `"Nov 2025"`. */
  date: string;
}

/** A project entry within the CV (distinct from the Projects page). */
export interface CvProjectEntry {
  /** Project title. */
  title: string;
  /** Display date string, e.g. `"Oct 2025"`. */
  date: string;
  /** Bullet-point contributions or outcomes. */
  bullets: string[];
}

/** An achievement entry. */
export interface AchievementEntry {
  /** Achievement title. */
  title: string;
  /** Display date range string. */
  period: string;
  /** Bullet-point details. */
  bullets: string[];
}

/** The complete typed CV data structure. */
export interface CvData {
  /** Owner's full legal name. */
  name: string;
  /** Contact email address. */
  email: string;
  /** Contact phone number. */
  phone: string;
  /** Professional summary paragraph. */
  summary: string;
  /** Education entries, most recent first. */
  education: EducationEntry[];
  /** Technical skill categories. */
  skills: SkillCategory[];
  /** Certificates and awards. */
  certificates: CertificateEntry[];
  /** Academic / coursework projects featured in the CV. */
  projects: CvProjectEntry[];
  /** Work experience entries, most recent first. */
  experience: ExperienceEntry[];
  /** Achievements and extracurricular activities. */
  achievements: AchievementEntry[];
  /** Miscellaneous other information bullet points. */
  otherInfo: string[];
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

/**
 * Lei Nuozhen's complete CV data, matching the PDF exactly.
 *
 * @example
 * ```ts
 * import { CV } from "@/data/cv";
 * console.log(CV.name); // "LEI NUOZHEN"
 * ```
 */
export const CV: CvData = {
  name: "LEI NUOZHEN",
  email: "Simon68562776@outlook.com",
  phone: "+65 80385655",

  summary:
    "Aspiring Systems Analyst and Data Science practitioner currently pursuing a Graduate Diploma at NUS-ISS, " +
    "backed by a Computer Science degree. Combines robust technical foundation in Full-Stack Development, " +
    "Object-Oriented Design, and Android/Java programming with practical Data Science experience gained at IBM " +
    "and Ipsos. Proficient in Python, C++, and SQL, with a passion for bridging the gap between software " +
    "engineering and data insights. Seeking a challenging role in System Analysis or Data Science to leverage " +
    "dual expertise and drive business success.",

  education: [
    {
      degree: "Graduate Diploma in Systems Analysis (GDipSA)",
      institution: "National University of Singapore",
      faculty: "Institute of Systems Science",
      period: "Aug 2025 – Present",
    },
    {
      degree: "Major: Computer Science",
      institution: "Macau University of Science and Technology",
      faculty: "Faculty of Innovation Engineering",
      period: "Sep 2021 – Jun 2025",
    },
  ],

  skills: [
    {
      category: "Programming Languages",
      detail: "Java, Python, C, C++, C#, Kotlin.",
    },
    {
      category: "Web Development",
      detail: "HTML/CSS, JavaScript, React Framework, Java EE (Spring Boot).",
    },
    {
      category: "Data & Databases",
      detail: "MySQL, SQL Server, Pandas (Python), Machine Learning (KNN, NLP).",
    },
    {
      category: "Tools & IDE",
      detail: "Android Studio, Git, VS Code, Jupyter Notebook.",
    },
  ],

  certificates: [
    {
      title:
        "Graduate Certificate in Digital Solutions Development – Web Applications (Competence) | National University of Singapore.",
      date: "Nov 2025",
    },
    {
      title: "Huawei ICT Competition | Participant (Cloud & Network Technologies).",
      date: "2022 – 2024",
    },
    {
      title: "Formula Edge 2023 Competition Staff Certification.",
      date: "Sep 2023",
    },
  ],

  projects: [
    {
      title: "Full-Stack E-Commerce Web Application (AORI)",
      date: "Oct 2025",
      bullets: [
        "Constructed a responsive fashion retail platform using Java Spring Boot and React.js, earning commendation from faculty for exceptional UI/UX design.",
        "Engineered a Smart Recommendation Engine to dynamically personalise product suggestions by analysing user browsing history, wish list data, and cart interactions.",
        "Implemented comprehensive Shopping Cart & Checkout modules with complex backend logic for inventory validation and order processing using MySQL and JPA.",
        "Selected as Lead Presenter to demonstrate the system integration and business value to stakeholders.",
      ],
    },
    {
      title: "Digital Transformation Consulting for Retail (GetFreshFood)",
      date: "Sep 2025 – Oct 2025",
      bullets: [
        "Spearheaded requirement specification for the digital transformation of a brick-and-mortar supermarket to an omni-channel retailer.",
        "Designed User Journey Maps and User Stories to align technical solutions with operational pain points.",
        "Proposed Smart Retail Solution incorporating RFID for inventory accuracy and Electronic Shelf Labels (ESL) for real-time pricing updates.",
      ],
    },
    {
      title: "Tour Reservation System Analysis & Design (FSTA)",
      date: "Aug 2025 – Sep 2025",
      bullets: [
        "Designed analysis and design models for a B2B/B2C tour reservation web application using UML standards.",
        "Formulated complex business logic for Cost Calculation Modules, utilising Object-Oriented Design (Polymorphism) to handle dynamic guide rates based on rank and experience.",
        "Mapped Object Models to the relational database schema (ORM) to ensure data consistency and system integrity.",
      ],
    },
  ],

  experience: [
    {
      role: "Data Science Assistant",
      company: "Ipsos Shanghai",
      period: "Jul 2024 – Aug 2024",
      location: "Shanghai",
      bullets: [
        "Performed analysis on Natural Language Processing (NLP) models for customer feedback to extract actionable insights.",
        "Programmed Python automation tools to streamline internal data management processes, improving operational efficiency.",
        "Established data integration systems for large-scale housing data project.",
      ],
    },
    {
      role: "Data Science Assistant",
      company: "IBM Shanghai",
      period: "Jul 2023 – Aug 2023",
      location: "Shanghai",
      bullets: [
        "Implemented data analysis models under mentor supervision, applying K-Nearest Neighbors (KNN) algorithms for data classification tasks.",
        "Collaborated with business teams to deliver quantitative insights, earning commendation for high-quality performance.",
        "Accelerated data processing workflows by automating Python-based analysis tools.",
      ],
    },
  ],

  achievements: [
    {
      title: "Huawei ICT Competition at Macau University of Science and Technology",
      period: "Sep 2022 – Oct 2024",
      bullets: [
        "Assisted in organising roadshows, promotional activities, and the Huawei certification process.",
        "Gained proficiency in Huawei Cloud and network technologies through competition participation.",
      ],
    },
    {
      title: "GSE-NUS Global Young Business Leader Program in Singapore",
      period: "Jul 2023",
      bullets: [
        "Acted as the lead coder in the group project, converting investment portfolio ideas into code.",
        "Analysed investment curves based on various portfolios, focusing on optimisation and financial metrics.",
        "Successfully tested investment programs by aligning group ideas with teacher-provided algorithms.",
      ],
    },
  ],

  otherInfo: [
    "Languages: English (Professional), Chinese (Native).",
    "Leadership: Vice-President of Student Union (Oct 2022 – Dec 2024).",
    "Availability: Ready for Internship from Mar 2026 / Full-time from Aug 2026.",
  ],
};
