/** Structural types for the decrypted strategy document (content itself lives encrypted, never in the JS bundle). */
export type Block =
  | { t: "p"; text: string }
  | { t: "h3"; text: string }
  | { t: "list"; items: string[] }
  | { t: "cards"; items: { title: string; text: string; source?: string }[] }
  | { t: "table"; head: string[]; rows: string[][]; source?: string }
  | { t: "bands"; title: string; rows: { label: string; bands: number[]; note: string }[]; source?: string }
  | { t: "callout"; title?: string; text: string }
  | { t: "details"; summary: string; blocks: Block[] }
  | { t: "findings"; items: { n: number; title: string; impact: string; fix: string; effort: string }[] }
  | { t: "calc" }
  | { t: "accordion"; labels: { evidence: string; test: string }; items: { q: string; a: string; evidence: string; test: string }[] }
  | { t: "diagram"; nodes: string[] }
  | { t: "timeline"; items: { label: string; items: string[] }[] }
  | { t: "source"; text: string }
  | { t: "cta"; label: string; note: string };

export interface Section {
  id: string;
  n: number;
  title: string;
  summary: { found: string; why: string; propose: string };
  blocks: Block[];
}

export interface CalcUi {
  title: string;
  note: string;
  inputs: { id: string; label: string; v: number; step: number; min: number }[];
  outputs: Record<"revenue" | "gross" | "media" | "after" | "cpt" | "guestYear" | "members", string>;
  unit: string;
}

export interface StrategyDocData {
  lang: "en" | "fr";
  ui: {
    title: string; subtitle: string; toc: string; print: string; lang: string; found: string; why: string; propose: string;
    tech: string; source: string; example: string; footer: string; bandHint: string; bands: string[]; calc: CalcUi;
  };
  sections: Section[];
}
export interface StrategyPayload {
  v: number;
  en: StrategyDocData;
  fr: StrategyDocData;
}
