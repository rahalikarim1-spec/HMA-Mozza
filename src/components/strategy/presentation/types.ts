/** Types for the role-based interactive presentations under /strategy/<role>/ (content lives in strategy/presentations.mjs). */

export type EvidenceTag = "OBS" | "PUB" | "3P" | "HYP" | "DATA";
export type Confidence = "High" | "Medium" | "Low";

export interface EvidenceItem { tag: EvidenceTag; text: string; conf?: Confidence }
export interface DeckLink { label: string; href: string; external?: boolean }

export type Visual =
  | { kind: "tiles"; items: { icon: "star" | "heart" | "search" | "pin"; label: string }[] }
  | { kind: "branches"; items: string[]; placeholders: string[]; note: string }
  | { kind: "pools"; pools: { title: string; sub: string }[]; steps: string[]; caption: string }
  | { kind: "levers"; items: { title: string; outcome: string }[]; base: string }
  | { kind: "board"; cols: { title: string; tag: EvidenceTag; items: string[] }[] }
  | { kind: "timeline"; weeks: number; rows: { label: string; from: number; to: number; tone: "base" | "prep" | "test" }[]; decision: { label: string; outcomes: string[] }; note: string }
  | { kind: "equation"; terms: { label: string; op: "" | "−" }[]; result: string; ladder: string[]; ladderTitle: string }
  | { kind: "cta"; steps: string[]; whatsapp: DeckLink; links: DeckLink[] }
  | { kind: "bands"; caption: string; scale: string[]; groups: Record<string, string>; rows: { label: string; group: "brand" | "nonbrand" | "thai"; band: number }[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "steps"; labels: { observed: string; test: string }; items: { title: string; observed: string; test: string }[] };

export interface DeckSlide {
  id: string;
  tone: "dark" | "plain" | "light";
  kicker: string;
  headline: string;
  copy: string;
  question: string;
  visual: Visual;
  evidence: EvidenceItem[];
  notes: string;
}

export interface AppendixBlock {
  id: string;
  title: string;
  lead?: string;
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
  foot?: string;
}

export interface DeckData {
  role: string;
  title: string;
  subtitle: string;
  ui: {
    back: string; slides: string; slide: string; of: string; prev: string; next: string; progress: string;
    evidenceToggle: string; questionLabel: string; evidenceLabel: string; notesLabel: string;
    legendTitle: string; keyboardHint: string; appendixTitle: string; appendixLead: string; footer: string;
  };
  tags: Record<EvidenceTag, string>;
  slides: DeckSlide[];
  appendix: AppendixBlock[];
}

export interface RoleCard { role: string; title: string; who: string; href: string; dark?: boolean }
