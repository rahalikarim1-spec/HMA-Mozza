/** Types for the Growth Risks & Structural Gaps page (content lives in strategy/growth-risks.mjs). */

export type Tag = "OBS" | "PUB" | "3P" | "HYP" | "DATA";
export type Category = "A" | "B" | "C";
export type Priority = "Critical" | "High" | "Medium" | "Monitor";
export type Confidence = "Confirmed" | "Moderate" | "Low" | "Hypothesis";

export interface EvItem { tag: Tag; text: string; ev: string; cite?: string }

export interface Finding {
  id: string;
  cat: Category;
  theme: string;
  title: string;
  summary: string;
  priority: Priority;
  confidence: Confidence;
  headline?: boolean;
  shows: string;
  notProve: string;
  impact: string;
  validation: string;
  intervention: string;
  measure: string;
  evidence: EvItem[];
}

export interface Stat { value: string; label: string; sub: string; tag: Tag; ev: string[]; cites: string[] }

export interface JourneyStep {
  id: string;
  title: string;
  need: string;
  observed: { tag: Tag; text: string }[];
  friction: string;
  measure: string;
}

export interface OptionPath { id: string; title: string; summary: string; cells: string[]; validate: string }

export interface FoundationLayer { id: string; title: string; short: string; detail: string }

export interface RoadmapPhase { id: string; when: string; title: string; actions: string[]; gate: string; measured: string }

export interface GrowthData {
  title: string;
  kicker: string;
  headline: string;
  sub: string;
  commercial: string;
  draftBadge: string;
  stats: Stat[];
  strengths: { value: string; label: string; ev: string }[];
  ui: Record<string, string>;
  tags: Record<Tag, string>;
  categories: { id: Category; title: string; tagline: string; rule: string }[];
  priorities: { id: Priority; mark: string; def: string }[];
  confidences: { id: Confidence; mark: string; def: string }[];
  findings: Finding[];
  pendingNote: string;
  visuals: {
    traffic: { title: string; caption: string; bars: { label: string; sub: string; value?: number; lo?: number; hi?: number }[]; note: string; ev: string[]; cites: string[] };
    bands: { title: string; caption: string; scale: string[]; rows: { label: string; group: "brand" | "nonbrand" | "mall" | "thai"; band: number }[]; groups: Record<string, string>; ev: string[]; cites: string[] };
    audit: { title: string; caption: string; health: number; stats: { label: string; value: string }[]; ev: string[]; cites: string[] };
    ai: { title: string; caption: string; groups: { label: string; total: number; rows: { label: string; value: number }[] }[]; ev: string[]; cites: string[] };
    links: {
      heading: string; method: string;
      growth: { title: string; caption: string; items: { label: string; start: { value: number; text: string }; end: { value: number; text: string } }[]; annotation: string; limits: string; ev: string[]; cites: string[] };
      toxicity: { title: string; caption: string; segments: { label: string; count: string; pct: number; tone: "toxic" | "pot" | "non" }[]; limits: string[]; ev: string[]; cites: string[] };
      tld: { title: string; caption: string; rows: { label: string; pct: string; count: number }[]; countries: { label: string; pct: string; count: number }[]; countriesTitle: string; note: string; ev: string[]; cites: string[] };
    };
    rank: { title: string; caption: string; tops: { label: string; value: number }[]; keywords: { kw: string; pos: number }[]; limits: string[]; ev: string[]; cites: string[] };
  };
  journey: { title: string; lead: string; steps: JourneyStep[]; labels: Record<string, string> };
  options: { title: string; lead: string; criteria: string[]; paths: OptionPath[]; validateLabel: string; note: string };
  triggers: { title: string; lead: string; items: string[]; states: string[]; rule: string; summaryLabels: Record<string, string> };
  foundation: { title: string; lead: string; layers: FoundationLayer[]; base: string; note: string };
  roadmap: { title: string; lead: string; phases: RoadmapPhase[]; gateLabel: string; outcomes: string[]; measuredLabel: string };
  cta: { title: string; text: string; whatsapp: { label: string; href: string }; links: { label: string; href: string }[] };
  footer: string;
}
