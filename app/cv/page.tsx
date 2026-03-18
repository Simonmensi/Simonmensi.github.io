/**
 * @file app/cv/page.tsx
 * @description CV page — renders Simon Lei's full curriculum vitae from
 * the typed {@link CV} data object in `data/cv.ts`. Presented as a
 * timeline-style layout with experience, education, and skill sections.
 */

import type { Metadata } from "next";
import { CV } from "@/data/cv";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { OWNER_NAME, SITE_URL, CV_PDF_PATH } from "@/constants";

export const metadata: Metadata = {
  title: `CV — ${OWNER_NAME}`,
  description: `Curriculum vitae of ${OWNER_NAME} — ${CV.title}.`,
  alternates: { canonical: `${SITE_URL}/cv/` },
  openGraph: {
    title: `CV — ${OWNER_NAME}`,
    description: `Curriculum vitae of ${OWNER_NAME} — ${CV.title}.`,
    url: `${SITE_URL}/cv/`,
    type: "website",
  },
};

/**
 * CV page — static render of the full curriculum vitae.
 *
 * @returns A `<main>` element with experience timeline, education, and skills.
 */
export default function CvPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Page header */}
      <header className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">{CV.name}</h1>
          <p className="mt-1 text-lg text-blue-900/60">{CV.title}</p>
        </div>
        <Button href={CV_PDF_PATH} variant="outline" size="sm">
          Download PDF
        </Button>
      </header>

      {/* Summary */}
      <section aria-labelledby="summary-heading" className="mb-12">
        <h2 id="summary-heading" className="mb-3 text-xl font-semibold text-blue-900">
          Summary
        </h2>
        <p className="text-blue-900/70 leading-relaxed">{CV.summary}</p>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-12">
        <h2 id="experience-heading" className="mb-6 text-xl font-semibold text-blue-900">
          Experience
        </h2>
        <ol className="relative border-l border-blue-900/20 pl-6">
          {CV.experience.map((exp, idx) => (
            <li key={idx} className="mb-8 last:mb-0">
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[7px] mt-1 size-3 rounded-full border-2 border-blue-900 bg-white"
              />
              <h3 className="text-base font-bold text-blue-900">{exp.role}</h3>
              <p className="text-sm text-blue-900/60">
                {exp.company} · {exp.location}
              </p>
              <p className="mb-3 text-xs text-blue-900/40">
                {exp.startDate} – {exp.endDate}
              </p>
              <ul className="space-y-1">
                {exp.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex gap-2 text-sm text-blue-900/70"
                  >
                    <span aria-hidden="true" className="mt-1 shrink-0 text-blue-900/30">
                      ·
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="mb-12">
        <h2 id="education-heading" className="mb-6 text-xl font-semibold text-blue-900">
          Education
        </h2>
        <ol className="space-y-6">
          {CV.education.map((edu, idx) => (
            <li key={idx}>
              <h3 className="font-bold text-blue-900">{edu.degree}</h3>
              <p className="text-sm text-blue-900/60">
                {edu.institution} · {edu.year}
              </p>
              {edu.description && (
                <p className="mt-1 text-sm text-blue-900/50">
                  {edu.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="mb-6 text-xl font-semibold text-blue-900">
          Skills
        </h2>
        <dl className="space-y-4">
          {CV.skills.map((cat) => (
            <div key={cat.category}>
              <dt className="mb-2 text-sm font-semibold text-blue-900">
                {cat.category}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2" aria-label={cat.category}>
                  {cat.skills.map((skill) => (
                    <li key={skill}>
                      <Tag variant="info">{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
