import type { Lang } from "./types";
import type { Dict } from "./dict";
import { en } from "./en";
import { th } from "./th";
import { ar } from "./ar";

const dicts: Record<Lang, Dict> = { en, th, ar };
export const getDict = (lang: Lang): Dict => dicts[lang];
