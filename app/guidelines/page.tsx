/**
 * @file app/guidelines/page.tsx
 * @description BIM Guidelines page — presents ISO 19650 / Singapore BIM Guide
 * compliance checklists using {@link Tag} status indicators.
 */

import type { Metadata } from "next";
import { Tag } from "@/components/ui/Tag";
import { OWNER_NAME, SITE_URL, ROUTES } from "@/constants";

export const metadata: Metadata = {
  title: `BIM Guidelines — ${OWNER_NAME}`,
  description:
    "ISO 19650 and Singapore BIM Guide v2 compliance checklists and best practices.",
  alternates: { canonical: `${SITE_URL}${ROUTES.guidelines}/` },
  openGraph: {
    title: `BIM Guidelines — ${OWNER_NAME}`,
    description:
      "ISO 19650 and Singapore BIM Guide v2 compliance checklists and best practices.",
    url: `${SITE_URL}${ROUTES.guidelines}/`,
    type: "website",
  },
};

/** A single guideline checklist item. */
interface GuidelineItem {
  label: string;
  status: "success" | "warning" | "error" | "info";
  note?: string;
}

/** A grouped section of guideline items. */
interface GuidelineSection {
  heading: string;
  standard: string;
  items: GuidelineItem[];
}

/** BIM compliance checklist data, sourced from ISO 19650 and SBG v2. */
const GUIDELINES: GuidelineSection[] = [
  {
    heading: "Project Information Model (PIM)",
    standard: "ISO 19650-2",
    items: [
      { label: "EIR defined and issued to supply chain", status: "success" },
      { label: "BEP reviewed and accepted", status: "success" },
      { label: "Federated model clash matrix signed off", status: "success" },
      { label: "LOD schedule agreed for each milestone", status: "warning", note: "Pending sign-off at M3" },
      { label: "4D programme linked to model elements", status: "info", note: "In progress" },
    ],
  },
  {
    heading: "Asset Information Model (AIM)",
    standard: "ISO 19650-3",
    items: [
      { label: "Asset Information Requirements documented", status: "success" },
      { label: "COBie handover package validated", status: "warning", note: "Validation pass pending" },
      { label: "FM system integration tested", status: "error", note: "Integration not yet started" },
    ],
  },
  {
    heading: "Common Data Environment (CDE)",
    standard: "SBG v2 §4",
    items: [
      { label: "CDE platform selected and configured (ACC)", status: "success" },
      { label: "Folder naming convention follows SBG v2 Annex A", status: "success" },
      { label: "Role-based access control applied", status: "success" },
      { label: "Revision control workflow activated", status: "warning", note: "Training pending for sub-contractors" },
    ],
  },
  {
    heading: "File Naming & Metadata",
    standard: "SBG v2 §3 / ISO 19650-1",
    items: [
      { label: "File naming convention applied (Field 1–8)", status: "success" },
      { label: "IFC GUID preserved across authoring tools", status: "info", note: "Under review" },
      { label: "Classification codes mapped to Uniclass 2015", status: "warning", note: "Partial — MEP only" },
    ],
  },
];

/**
 * BIM Guidelines page — static compliance checklist.
 *
 * @returns A `<main>` element with ISO 19650 / SBG v2 guideline sections.
 */
export default function GuidelinesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Page header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-900">BIM Guidelines</h1>
        <p className="mt-4 text-blue-900/60">
          Compliance checklist based on ISO 19650 and Singapore BIM Guide v2.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        {GUIDELINES.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={`section-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {/* Section heading */}
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <h2
                id={`section-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-xl font-semibold text-blue-900"
              >
                {section.heading}
              </h2>
              <Tag variant="info">{section.standard}</Tag>
            </div>

            {/* Checklist */}
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-1 rounded-xl border border-blue-900/10 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-blue-900">{item.label}</span>
                  <div className="flex flex-col items-start gap-1 sm:items-end">
                    <Tag variant={item.status}>
                      {item.status === "success"
                        ? "Compliant"
                        : item.status === "error"
                          ? "Non-Compliant"
                          : item.status === "warning"
                            ? "Pending"
                            : "In Progress"}
                    </Tag>
                    {item.note && (
                      <span className="text-xs text-blue-900/40">{item.note}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-center text-xs text-blue-900/30">
        Checklist reflects project status as of March 2026. Standards: ISO 19650-1/2/3,
        Singapore BIM Guide v2.
      </p>
    </main>
  );
}
