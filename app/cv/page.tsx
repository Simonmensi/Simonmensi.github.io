/**
 * @file app/cv/page.tsx
 * @description CV page — renders Lei Nuozhen's full curriculum vitae from
 * `data/cv.ts`, matching the PDF exactly. Sections: Professional Profile,
 * Education, Technical Skills, Certificates & Awards, Projects, Work
 * Experience, Achievements, Other Information.
 */

import type { Metadata } from "next";
import { CV } from "@/data/cv";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { SITE_URL, CV_PDF_PATH } from "@/constants";

export const metadata: Metadata = {
  title: `CV — ${CV.name}`,
  description: `Curriculum vitae of ${CV.name} — Systems Analyst & Data Science practitioner.`,
  alternates: { canonical: `${SITE_URL}/cv/` },
  openGraph: {
    title: `CV — ${CV.name}`,
    description: `Curriculum vitae of ${CV.name}.`,
    url: `${SITE_URL}/cv/`,
    type: "website",
  },
};

// ─── Shared primitives ───────────────────────────────────────

/** Section wrapper with a bold heading and ruled divider. */
function Section({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mb-10">
      <h2 id={id} className="mb-1 text-base font-extrabold uppercase tracking-widest text-blue-900 dark:text-blue-300">
        {heading}
      </h2>
      <hr className="mb-4 border-blue-900 dark:border-blue-700" />
      {children}
    </section>
  );
}

/** Bullet list shared across experience, projects, achievements. */
function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2 text-sm text-blue-900/75 dark:text-blue-300/75">
          <span aria-hidden="true" className="mt-[6px] size-[5px] shrink-0 rounded-full bg-blue-900/50 dark:bg-blue-400/50" />
          {b}
        </li>
      ))}
    </ul>
  );
}

// ─── Page ────────────────────────────────────────────────────

/**
 * CV page — static render matching the PDF exactly.
 *
 * @returns A `<main>` element with all CV sections.
 */
export default function CvPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      {/* ── Header ── */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-blue-900 dark:text-blue-300">
          {CV.name}
        </h1>
        <p className="mt-2 text-sm text-blue-900/60 dark:text-blue-300/60">
          Email:{" "}
          <a href={`mailto:${CV.email}`} className="underline hover:text-blue-900 dark:hover:text-blue-300">
            {CV.email}
          </a>
          {"  "}Phone: {CV.phone}
        </p>
        <div className="mt-4">
          <Button href={CV_PDF_PATH} variant="outline" size="sm">
            Download PDF
          </Button>
        </div>
      </header>

      {/* ── Professional Profile ── */}
      <Section id="cv-profile" heading="Professional Profile">
        <p className="text-sm leading-relaxed text-blue-900/75 dark:text-blue-300/75">{CV.summary}</p>
      </Section>

      {/* ── Education ── */}
      <Section id="cv-education" heading="Education">
        <div className="space-y-4">
          {CV.education.map((edu, i) => (
            <div key={i} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-300">{edu.institution}</p>
                <p className="text-sm text-blue-900/70 dark:text-blue-300/70">{edu.degree}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-blue-900 dark:text-blue-300">{edu.faculty}</p>
                <p className="text-sm text-blue-900/60 dark:text-blue-300/60">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Technical Skills ── */}
      <Section id="cv-skills" heading="Technical Skills">
        <ul className="space-y-2">
          {CV.skills.map((s) => (
            <li key={s.category} className="flex flex-wrap gap-1 text-sm">
              <span className="font-semibold text-blue-900 dark:text-blue-300">{s.category}:</span>
              <span className="text-blue-900/70 dark:text-blue-300/70">{s.detail}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Certificates & Awards ── */}
      <Section id="cv-certificates" heading="Certificates & Awards">
        <ul className="space-y-2">
          {CV.certificates.map((c, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="mt-[6px] size-[5px] shrink-0 rounded-full bg-blue-900/50 dark:bg-blue-400/50" />
              <span className="flex-1 text-blue-900/75 dark:text-blue-300/75">{c.title}</span>
              <span className="shrink-0 text-blue-900/50 dark:text-blue-300/50">{c.date}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Projects ── */}
      <Section id="cv-projects" heading="Project">
        <div className="space-y-5">
          {CV.projects.map((p, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="font-bold text-blue-900 dark:text-blue-300">{p.title}</p>
                <span className="text-sm text-blue-900/50 dark:text-blue-300/50">{p.date}</span>
              </div>
              <BulletList bullets={p.bullets} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Work Experience ── */}
      <Section id="cv-experience" heading="Work Experience">
        <div className="space-y-5">
          {CV.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="font-bold text-blue-900 dark:text-blue-300">{exp.company}</p>
                <span className="text-sm text-blue-900/50 dark:text-blue-300/50">{exp.period}</span>
              </div>
              <p className="text-sm font-semibold text-blue-900/70 dark:text-blue-300/70">{exp.role}</p>
              <BulletList bullets={exp.bullets} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Achievements ── */}
      <Section id="cv-achievements" heading="Achievement">
        <div className="space-y-5">
          {CV.achievements.map((a, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="font-bold text-blue-900 dark:text-blue-300">{a.title}</p>
                <span className="text-sm text-blue-900/50 dark:text-blue-300/50">{a.period}</span>
              </div>
              <BulletList bullets={a.bullets} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Other Information ── */}
      <Section id="cv-other" heading="Other Information">
        <ul className="space-y-2">
          {CV.otherInfo.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="mt-[6px] size-[5px] shrink-0 rounded-full bg-blue-900/50 dark:bg-blue-400/50" />
              <span className="text-blue-900/75 dark:text-blue-300/75">{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Skill chips (summary footer) ── */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["Java", "Python", "C++", "React", "Spring Boot", "SQL", "Machine Learning", "NLP"].map((skill) => (
          <Tag key={skill} variant="info">{skill}</Tag>
        ))}
      </div>

    </main>
  );
}
