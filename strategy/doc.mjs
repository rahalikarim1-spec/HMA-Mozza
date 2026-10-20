// Authoring file for the /strategy page: imported by the server page src/app/(en)/strategy/page.tsx (rendered at build time).
// Every text is written as T(english, french) so both languages stay side by side. No names of HMA people, no service prices.
import * as D from "./data.mjs";

export function buildDoc(L, { fx = 38 } = {}) {
  const T = (en, fr) => (L === "fr" ? fr : en);
  const thb = (eur) => Math.round(eur * fx);
  const bid = (lo, hi) => (lo == null ? "—" : `€${lo.toFixed(2)}–${hi.toFixed(2)} (≈ ฿${thb(lo)}–${thb(hi)})`);
  const compFr = { Low: "Faible", Medium: "Moyenne", High: "Élevée" };
  const comp = (c) => (L === "fr" ? compFr[c] : c);
  const vol = (v) => (Array.isArray(v) ? v.join(T(" / ", " / ")) : v);
  const bands = (v) => (Array.isArray(v) ? v : [v]).map((x) => D.BAND[x]);

  const SRC_KP = T(
    "Source: Google Keyword Planner — Bangkok, all languages, Google Search, Oct 2025 – Sep 2026. Volumes are ranges, never summed. Competition = advertiser competition (not SEO difficulty). Bids = historical top-of-page estimates, not guaranteed CPC; ≈ THB at 1 EUR ≈ " + fx + " (rate to verify).",
    "Source : Google Keyword Planner — Bangkok, toutes langues, Google Search, oct. 2025 – sept. 2026. Les volumes sont des fourchettes, jamais additionnées. Concurrence = concurrence entre annonceurs (pas la difficulté SEO). Enchères = estimations historiques « haut de page », pas un CPC garanti ; ≈ THB sur la base de 1 EUR ≈ " + fx + " (taux à vérifier).",
  );
  const SRC_MAPS = T("Source: Google Maps, snapshot Oct 2026 (varies by time).", "Source : Google Maps, instantané d'oct. 2026 (varie selon le moment).");
  const SRC_SERP = T("Source: Google Search / Maps snapshots, Oct 2026. Positions vary by location, device and time.", "Source : instantanés Google Search / Maps, oct. 2026. Les positions varient selon le lieu, l'appareil et le moment.");
  const SRC_3P = T("Source: third-party estimates (Ahrefs / Mangools), Oct 2026 — not analytics.", "Source : estimations de tiers (Ahrefs / Mangools), oct. 2026 — pas de données analytics.");

  const kwTable = (rows, extra = {}) => ({
    t: "table",
    head: [T("Keyword", "Mot-clé"), T("Language", "Langue"), T("Monthly searches (range)", "Recherches / mois (fourchette)"), T("Competition", "Concurrence"), T("Top-of-page bid, EUR (≈ THB)", "Enchère haut de page, EUR (≈ THB)"), T("Intent", "Intention"), T("Target page (proposed)", "Page cible (proposée)")],
    rows: rows.map(([kw, v, c, lo, hi]) => [kw, extra.lang, vol(v), comp(c), bid(lo, hi), extra.intent(kw), extra.target(kw)]),
    source: SRC_KP,
  });
  const bandRows = (rows) => rows.map((r) => ({ label: r[0], bands: bands(r[1]), note: Array.isArray(r[1]) ? r[1].join(" / ") : r[1] }));

  const sections = [];
  const S = (id, title, summary, blocks) => sections.push({ id, n: sections.length + 1, title, summary, blocks });

  /* 1 */
  S("summary", T("Executive summary", "Synthèse"), {
    found: T("A strong brand with reputation across four branches, and large search demand around every location that is not yet connected to it.", "Une marque forte, une réputation solide sur quatre adresses, et une demande de recherche importante autour de chaque lieu, pas encore reliée à la marque."),
    why: T("Every guest who searches for a mall or an Italian restaurant and books elsewhere is revenue that does not yet reach the branch — and the branch cannot see it today.", "Chaque convive qui cherche un centre commercial ou un restaurant italien et réserve ailleurs, c'est du chiffre d'affaires qui n'arrive pas encore au restaurant — et qui n'est pas visible aujourd'hui."),
    propose: T("A small, measurable pilot (one branch against a control branch) that turns demand into reservations by branch.", "Un petit pilote mesurable (un restaurant face à un restaurant témoin) qui transforme la demande en réservations, par restaurant."),
  }, [
    { t: "p", text: T("Mozza has what is hardest to build: a recognised brand, strong guest ratings and prominent locations. Around each of those locations there is search demand — by mall, by area, by cuisine, in English and Thai — that is largely captured by others today. The opportunity is to connect that demand to the right branch, in the right language, at the right time, and to measure reservations by branch. We propose to start with a limited pilot and let the numbers decide what comes next. This is a specialist layer that complements your team: your team keeps the brand; we add the acquisition system.", "Mozza possède ce qui est le plus difficile à construire : une marque reconnue, d'excellentes notes clients et des adresses de premier plan. Autour de chacune de ces adresses existe une demande de recherche — par centre commercial, par quartier, par cuisine, en anglais et en thaï — aujourd'hui largement captée par d'autres. L'opportunité : relier cette demande au bon restaurant, dans la bonne langue, au bon moment, et mesurer les réservations par restaurant. Nous proposons de commencer par un pilote limité et de laisser les chiffres décider de la suite. C'est une couche de spécialistes qui complète votre équipe : votre équipe garde la marque ; nous ajoutons le système d'acquisition.") },
    { t: "cards", items: [
      { title: T("Strong brand and reputation", "Marque et réputation solides"), text: T("Google ratings 4.5–4.9 and 6,000+ reviews across four branches, plus awards.", "Notes Google de 4,5 à 4,9 et plus de 6 000 avis sur quatre restaurants, plus des distinctions."), source: SRC_MAPS },
      { title: T("Demand not yet captured", "Demande pas encore captée"), text: T("Significant non-brand and mall-level search demand around every branch, largely captured by others today.", "Demande de recherche significative, hors marque et au niveau des centres commerciaux, autour de chaque restaurant, largement captée par d'autres aujourd'hui."), source: T("Source: Google Keyword Planner (ranges), see section 4.", "Source : Google Keyword Planner (fourchettes), voir section 4.") },
      { title: T("A small, measurable pilot", "Un pilote petit et mesurable"), text: T("Connect demand to the right branch, language and time — and measure reservations by branch.", "Relier la demande au bon restaurant, à la bonne langue et au bon moment — et mesurer les réservations par restaurant."), source: T("See sections 17–18.", "Voir sections 17–18.") },
    ] },
  ]);

  /* 2 */
  S("financial", T("What this means financially", "Ce que cela représente financièrement"), {
    found: T("The value of a pilot can be read with four inputs: average spend, guests per table, extra tables per week and media budget.", "La valeur d'un pilote se lit avec quatre données : addition moyenne, convives par table, tables supplémentaires par semaine et budget média."),
    why: T("It shows, before any commitment, how few extra tables are needed for the media budget to pay for itself.", "Elle montre, avant tout engagement, le nombre très limité de tables supplémentaires nécessaires pour que le budget média se rentabilise."),
    propose: T("Use the calculator with your numbers; the pilot then replaces the example values with measured ones.", "Utiliser le simulateur avec vos chiffres ; le pilote remplace ensuite les valeurs d'exemple par des valeurs mesurées."),
  }, [
    { t: "calc" },
    { t: "callout", text: T("The pilot exists to replace these example values with your real numbers.", "Le pilote sert à remplacer ces valeurs d'exemple par vos chiffres réels.") },
  ]);

  /* 3 */
  S("works", T("What already works", "Ce qui fonctionne déjà"), {
    found: T("Ratings of 4.5–4.9 across four branches (6,041 reviews in total), awards, a loyalty programme and a consistent Google Maps naming.", "Des notes de 4,5 à 4,9 sur quatre restaurants (6 041 avis au total), des distinctions, un programme de fidélité et un nommage cohérent sur Google Maps."),
    why: T("Reputation is the asset that makes paid and organic visibility convert: guests who find Mozza are likely to book.", "La réputation est l'actif qui fait convertir la visibilité payante et organique : les convives qui trouvent Mozza ont de bonnes chances de réserver."),
    propose: T("Build on it: make this reputation visible and bookable at the exact moment of decision.", "S'appuyer dessus : rendre cette réputation visible et réservable au moment précis de la décision."),
  }, [
    { t: "table", head: [T("Branch", "Restaurant"), T("Rating", "Note"), T("Reviews", "Avis"), T("Price shown", "Prix affiché")], rows: D.ratings.map((r) => [...r]), source: SRC_MAPS },
    { t: "list", items: [
      T("Awards shown on the Mozza homepage: Gambero Rosso, Lifestyle Asia Best Bites, Tripadvisor 2022–2024.", "Distinctions affichées sur la page d'accueil de Mozza : Gambero Rosso, Lifestyle Asia Best Bites, Tripadvisor 2022–2024."),
      T("HMA Privilege loyalty programme.", "Programme de fidélité HMA Privilege."),
      T("Existing SEO titles on the homepage and branch pages.", "Titres SEO existants sur la page d'accueil et les pages des restaurants."),
      T("Active blog content.", "Contenu de blog actif."),
      T("Consistent Google Maps naming: “Mozza – Trattoria Italiana (Branch)”.", "Nommage cohérent sur Google Maps : « Mozza – Trattoria Italiana (Restaurant) »."),
    ] },
    { t: "details", summary: T("Technical detail", "Détail technique"), blocks: [
      { t: "p", text: T("Rating and review counts are a Google Maps snapshot (Oct 2026) and move over time. Award years differ between public sources (homepage: Tripadvisor 2022–2024; printed menu cover: Travellers' Choice 2023–2025) — a small consistency point to align, not a concern.", "Les notes et nombres d'avis sont un instantané Google Maps (oct. 2026) et évoluent. Les années des distinctions diffèrent selon les sources publiques (page d'accueil : Tripadvisor 2022–2024 ; couverture du menu imprimé : Travellers' Choice 2023–2025) — un petit point de cohérence à harmoniser, sans gravité.") },
    ] },
  ]);

  /* 4 */
  const intent = (kw) => (/dusit|siam|iconsiam|emquartier|chidlom|ร้านอาหาร (สยาม|ไอคอน|เอ็ม|ดุสิต|เซ็นทรัล)|พารากอน/.test(kw) ? T("Local / mall", "Local / centre commercial") : /pizza|พิซซ่า/.test(kw) ? T("Pizza", "Pizza") : /pasta/.test(kw) ? T("Pasta", "Pâtes") : /วันเกิด/.test(kw) ? T("Occasion", "Occasion") : /sukhumvit|sathorn|สาทร/.test(kw) ? T("Area", "Quartier") : T("Italian / generic", "Italien / générique"));
  const target = (kw) => D.targetFor[kw] ?? (/พิซซ่า/.test(kw) ? "/th/neapolitan-pizza-bangkok/" : /สาทร/.test(kw) ? "/th/locations/central-park/" : /วันเกิด/.test(kw) ? "/th/celebrations/" : /อิตาเลี/.test(kw) ? "/th/" : "—");
  const brandTarget = (kw) => (/emquartier/.test(kw) ? "/locations/emquartier/" : /iconsiam/.test(kw) ? "/locations/iconsiam/" : /siam paragon/.test(kw) ? "/locations/siam-paragon/" : /central park/.test(kw) ? "/locations/central-park/" : /menu/.test(kw) ? "/menu/" : "/");

  S("demand", T("Search demand around Mozza (Google Keyword Planner, Bangkok)", "La demande de recherche autour de Mozza (Google Keyword Planner, Bangkok)"), {
    found: T("Brand demand is healthy, and non-brand and mall-level demand around every branch is larger.", "La demande de marque est saine, et la demande hors marque et au niveau des centres commerciaux autour de chaque restaurant est plus importante."),
    why: T("Brand searches are guests you already won. Mall and cuisine searches are guests still choosing where to eat — the demand that grows revenue.", "Les recherches de marque, ce sont des convives déjà acquis. Les recherches par centre commercial ou par cuisine, ce sont des convives qui choisissent encore où dîner — la demande qui fait croître le chiffre d'affaires."),
    propose: T("Match each demand cluster to its page (branch, menu, category) in English and Thai.", "Associer chaque groupe de demande à sa page (restaurant, menu, catégorie) en anglais et en thaï."),
  }, [
    { t: "p", text: T("Keyword Planner settings: Bangkok · all languages · Google Search · Oct 2025 – Sep 2026. Volumes are ranges and are never added together.", "Paramètres Keyword Planner : Bangkok · toutes langues · Google Search · oct. 2025 – sept. 2026. Les volumes sont des fourchettes et ne sont jamais additionnés.") },
    { t: "h3", text: T("4.1 Brand demand", "4.1 Demande de marque") },
    kwTable(D.brand, { lang: "EN", intent: () => T("Brand", "Marque"), target: brandTarget }),
    { t: "bands", title: T("Brand demand — volume bands", "Demande de marque — tranches de volume"), rows: bandRows(D.brand), source: SRC_KP },
    { t: "p", text: T("Note: two exports differ for some terms (e.g. “mozza bangkok”: 100–1K in one export, 10–100 in a later one; “mozza menu”: 10–100 or 100–1K). Both are shown — the exports have different dates (see section 21). “parma by mozza”: 100–1K, +900% year on year.", "Remarque : deux exports diffèrent pour certains termes (ex. « mozza bangkok » : 100–1K dans un export, 10–100 dans un export plus récent ; « mozza menu » : 10–100 ou 100–1K). Les deux sont indiqués — les exports ont des dates différentes (voir section 21). « parma by mozza » : 100–1K, +900 % sur un an.") },
    { t: "h3", text: T("4.2 Brand demand across the HMA portfolio (group-level value)", "4.2 Demande de marque sur tout le portefeuille HMA (valeur au niveau du groupe)") },
    { t: "table", head: [T("Keyword", "Mot-clé"), T("Monthly searches (range)", "Recherches / mois (fourchette)"), T("Top-of-page bid, EUR (≈ THB)", "Enchère haut de page, EUR (≈ THB)")], rows: D.portfolio.map(([kw, v, lo, hi]) => [kw, v, bid(lo, hi)]), source: SRC_KP },
    { t: "h3", text: T("4.3 Non-brand demand — English", "4.3 Demande hors marque — anglais") },
    kwTable(D.en, { lang: "EN", intent, target }),
    { t: "bands", title: T("English non-brand — volume bands", "Hors marque anglais — tranches de volume"), rows: bandRows(D.en), source: SRC_KP },
    { t: "h3", text: T("4.4 Non-brand demand — Thai", "4.4 Demande hors marque — thaï") },
    kwTable(D.th, { lang: "TH", intent, target }),
    { t: "bands", title: T("Thai non-brand — volume bands", "Hors marque thaï — tranches de volume"), rows: bandRows(D.th), source: SRC_KP },
    { t: "callout", text: T("Insight: the spelling อิตาเลี่ยน carries more volume than อิตาเลียน.", "À retenir : l'orthographe อิตาเลี่ยน génère plus de volume que อิตาเลียน.") },
    { t: "h3", text: T("4.5 Mall-level demand (EN + TH) — the strongest insight", "4.5 Demande au niveau des centres commerciaux (EN + TH) — l'enseignement le plus fort") },
    { t: "table", head: [T("Mall", "Centre commercial"), T("English", "Anglais"), T("Thai", "Thaï")], rows: D.malls.map(([m, e, t]) => [m, e.map(([k, v, lo, hi]) => `${k} — ${v} (${bid(lo, hi)})`).join("\n"), t.map(([k, v, lo, hi]) => `${k} — ${v} (${bid(lo, hi)})`).join("\n")]), source: SRC_KP },
    { t: "callout", title: T("Key insight", "Enseignement clé"), text: T("Mall-level searches are the closest to a dining decision — people are choosing where to eat inside the mall.", "Les recherches au niveau du centre commercial sont les plus proches de la décision de dîner — les gens choisissent où manger dans le centre commercial.") },
    { t: "h3", text: T("4.6 What we deliberately ignore", "4.6 Ce que nous écartons volontairement") },
    { t: "p", text: T("Thai dish names (สปาเก็ตตี้, คาโบนาร่า, ทีรามิสุ, ลาซานญ่า at 1K–10K) are mostly recipe searches, not restaurant intent. Several English area and occasion terms show no usable volume (phrom phong, lumpini, brunch, group dinner, date night).", "Les noms de plats en thaï (สปาเก็ตตี้, คาโบนาร่า, ทีรามิสุ, ลาซานญ่า à 1K–10K) sont surtout des recherches de recettes, pas une intention de restaurant. Plusieurs termes anglais de quartier ou d'occasion n'affichent aucun volume exploitable (phrom phong, lumpini, brunch, group dinner, date night).") },
    { t: "h3", text: T("4.7 Financial reading of the bids", "4.7 Lecture financière des enchères") },
    { t: "p", text: T("Most non-brand top-of-page bids are ≈ €0.1–0.9 (≈ ฿4–35). A bid is a price per click; what matters is the price per table: cost per table = CPC ÷ click-to-table rate.", "La plupart des enchères haut de page hors marque se situent autour de 0,1–0,9 € (≈ 4–35 ฿). Une enchère est un prix par clic ; ce qui compte, c'est le prix par table : coût par table = CPC ÷ taux clic-vers-table.") },
    { t: "callout", title: T("Hypothetical example", "Exemple hypothétique"), text: T("At ฿23 CPC and an acceptable cost per table of ฿250, the required click-to-table rate is ≈ 9%. Try your own numbers in the calculator (section 2).", "Avec un CPC de 23 ฿ et un coût par table acceptable de 250 ฿, le taux clic-vers-table requis est d'environ 9 %. Testez vos propres chiffres dans le simulateur (section 2).") },
  ]);

  /* 5 */
  S("discovery", T("Where discovery goes today (search & maps)", "Où va la découverte aujourd'hui (recherche et cartes)"), {
    found: T("On generic Italian searches, other restaurants hold the top Maps and organic positions; Mozza appears further down, and even the official site is not first on its own brand + branch searches.", "Sur les recherches génériques « italien », d'autres restaurants occupent les premières positions Maps et organiques ; Mozza apparaît plus bas, et même le site officiel n'est pas premier sur sa propre recherche marque + restaurant."),
    why: T("Most guests choose from the first few results. Being one or two positions higher on high-intent searches is the difference between being considered and being skipped.", "La plupart des convives choisissent parmi les premiers résultats. Gagner une ou deux positions sur les recherches à forte intention fait la différence entre être considéré et être ignoré."),
    propose: T("Raise branch pages and the menu to where guests decide, and track it by branch.", "Faire monter les pages des restaurants et le menu là où les convives décident, et le suivre par restaurant."),
  }, [
    { t: "list", items: [
      T("“best italian restaurant bangkok”: Google Maps top 3 = Medici, Baia, Il Bolognese; Mozza Central Park ≈ position 6–7.", "« best italian restaurant bangkok » : top 3 Google Maps = Medici, Baia, Il Bolognese ; Mozza Central Park ≈ position 6–7."),
      T("“italian restaurant bangkok”: Mozza organic ≈ page 2 (≈ position 13–14), behind Opera, Medici, Baia, Riva del Fiume, Via Emilia, Theo Mio and others.", "« italian restaurant bangkok » : Mozza en organique ≈ page 2 (≈ position 13–14), derrière Opera, Medici, Baia, Riva del Fiume, Via Emilia, Theo Mio et d'autres."),
      T("Brand searches (Mangools, Thailand, Oct 2026): mozza-bangkok.com ≈ position 2 for “mozza by cocotte” (≈ 2.4K searches, +31%) and ≈ position 3 for “mozza central park” — the official site is not first even on its own brand + branch search.", "Recherches de marque (Mangools, Thaïlande, oct. 2026) : mozza-bangkok.com ≈ position 2 pour « mozza by cocotte » (≈ 2,4K recherches, +31 %) et ≈ position 3 pour « mozza central park » — le site officiel n'est pas premier, même sur sa propre recherche marque + restaurant."),
      T("Ahrefs (Oct 2026): ≈ 354–380 estimated organic visits per month, estimated traffic value ≈ $58–63, ≈ 100% Thailand, mostly branded keywords. Homepage ≈ 64–81% of estimated traffic; the “new menu” article ≈ 19% — the menu is the second entry point. A Thai menu query (“mozza by cocotte เมนู”) already appears.", "Ahrefs (oct. 2026) : ≈ 354–380 visites organiques estimées par mois, valeur de trafic estimée ≈ 58–63 $, ≈ 100 % Thaïlande, surtout des mots-clés de marque. La page d'accueil ≈ 64–81 % du trafic estimé ; l'article « nouveau menu » ≈ 19 % — le menu est la deuxième porte d'entrée. Une requête thaï sur le menu (« mozza by cocotte เมนู ») apparaît déjà."),
      T("No observable Google Ads footprint was identified for Mozza Bangkok or Hospitality Management Asia in Google's Ads Transparency Center during our review.", "Aucune présence publicitaire Google observable n'a été identifiée pour Mozza Bangkok ou Hospitality Management Asia dans le Centre de transparence des annonces de Google lors de notre analyse."),
    ] },
    { t: "callout", title: T("Caveat on rankings", "Précaution sur les positions"), text: T("SERP and Maps positions are snapshots; they vary by location, device and time. Ahrefs and Mangools figures are third-party estimates, not analytics.", "Les positions SERP et Maps sont des instantanés ; elles varient selon le lieu, l'appareil et le moment. Les chiffres Ahrefs et Mangools sont des estimations de tiers, pas des données analytics.") },
    { t: "source", text: SRC_SERP + " " + SRC_3P + " " + T("Google Ads Transparency Center, Oct 2026.", "Centre de transparence des annonces Google, oct. 2026.") },
  ]);

  /* 6 */
  S("website", T("Website & technical SEO findings", "Constats sur le site et le SEO technique"), {
    found: T("Ten opportunities on the current site, most of them one-time fixes (S = small effort).", "Dix opportunités sur le site actuel, la plupart sous forme de corrections ponctuelles (S = effort limité)."),
    why: T("They decide whether the demand in section 4 reaches the right page — each fix keeps producing visits without media cost.", "Elles déterminent si la demande de la section 4 arrive sur la bonne page — chaque correction continue de produire des visites sans coût média."),
    propose: T("Fix the quick wins first (redirects, titles, GBP links), then branch template and HTML menus.", "Commencer par les gains rapides (redirections, titres, liens GBP), puis le modèle de page restaurant et les menus HTML."),
  }, [
    { t: "p", text: T("Wix serves a brand website well. A multi-brand, multilingual, data-driven acquisition system needs more control over structure, data and integrations.", "Wix sert très bien un site de marque. Un système d'acquisition multi-marques, multilingue et piloté par la donnée demande plus de maîtrise de la structure, des données et des intégrations.") },
    { t: "findings", items: [
      { n: 1, title: T("Central Park page lives at /copy-of-iconsiam with an ICONSIAM / Thonburi title", "La page Central Park se trouve à /copy-of-iconsiam avec un titre ICONSIAM / Thonburi"), impact: T("The branch with 1K–10K “dusit central park restaurant” searches has no correctly targeted page.", "Le restaurant visé par 1K–10K recherches « dusit central park restaurant » n'a pas de page correctement ciblée."), fix: T("/central-park, 301 redirect, correct title, H1 and content.", "/central-park, redirection 301, titre, H1 et contenu corrects."), effort: "S" },
      { n: 2, title: T("HMA Privilege page at /copy-of-hma-privilege", "Page HMA Privilege à /copy-of-hma-privilege"), impact: T("The loyalty programme is harder to find and share under a temporary-looking address.", "Le programme de fidélité est plus difficile à trouver et à partager sous une adresse d'aspect provisoire."), fix: T("Clean URL with a 301 redirect.", "URL propre avec redirection 301."), effort: "S" },
      { n: 3, title: T("Branch pages are mostly images plus a booking button", "Les pages restaurants sont surtout des images et un bouton de réservation"), impact: T("Little readable text for Google and for guests deciding between branches.", "Peu de texte lisible pour Google et pour les convives qui choisissent entre restaurants."), fix: T("Branch template: address, hours, transport, intro, signature dishes, FAQ, Restaurant schema.", "Modèle de page restaurant : adresse, horaires, accès, introduction, plats signature, FAQ, schéma Restaurant."), effort: "M" },
      { n: 4, title: T("Main food menu (24 pages) and breakfast menu are image-only PDFs", "Le menu principal (24 pages) et le menu petit-déjeuner sont des PDF d'images"), impact: T("No dish or price is readable by Google or AI assistants — menu searches cannot match them.", "Aucun plat ni prix n'est lisible par Google ou les assistants IA — les recherches sur le menu ne peuvent pas y correspondre."), fix: T("HTML menus with Menu schema (as in this demo).", "Menus HTML avec schéma Menu (comme dans cette démo)."), effort: "M" },
      { n: 5, title: T("Thai version (?lang=th) displays English content", "La version thaï (?lang=th) affiche du contenu en anglais"), impact: T("Thai demand (section 4.4) has no Thai page to land on.", "La demande thaï (section 4.4) n'a pas de page thaï où atterrir."), fix: T("Real Thai pages with hreflang.", "Vraies pages thaï avec hreflang."), effort: "M" },
      { n: 6, title: T("Homepage on-page check (Rank Math, Oct 2026, score 72/100)", "Contrôle on-page de la page d'accueil (Rank Math, oct. 2026, score 72/100)"), impact: T("Headroom on the page that carries 64–81% of estimated traffic.", "Marge de progression sur la page qui porte 64–81 % du trafic estimé."), fix: T("Add an H1, alt text for 14 images, shorten the title (88 characters) and the meta description (182 characters). Positives: canonical, sitemap, schema, HTTPS, response < 0.8 s. Page weight: HTML 144 KB, 26 requests.", "Ajouter un H1, des textes alternatifs pour 14 images, raccourcir le titre (88 caractères) et la meta description (182 caractères). Points forts : canonical, sitemap, schéma, HTTPS, réponse < 0,8 s. Poids : HTML 144 Ko, 26 requêtes."), effort: "S" },
      { n: 7, title: T("Reservations leave the site (Chope / TableCheck) without branch-level attribution", "Les réservations quittent le site (Chope / TableCheck) sans attribution par restaurant"), impact: T("Revenue from search cannot be tied to a branch or a campaign.", "Le chiffre d'affaires issu de la recherche ne peut pas être rattaché à un restaurant ou à une campagne."), fix: T("UTM parameters + event tracking.", "Paramètres UTM + suivi d'événements."), effort: "S" },
      { n: 8, title: T("Google Business Profile links", "Liens des fiches Google Business Profile"), impact: T("Website link appears to point to the homepage, not the branch page; the ICONSIAM menu link is a Google Drive file.", "Le lien site semble pointer vers la page d'accueil et non vers la page du restaurant ; le lien menu d'ICONSIAM est un fichier Google Drive."), fix: T("Link each profile to its branch page and HTML menu.", "Relier chaque fiche à sa page restaurant et à son menu HTML."), effort: "S" },
      { n: 9, title: T("NAP: EmQuartier address 693 (Google) vs 695 (website)", "NAP : adresse d'EmQuartier 693 (Google) vs 695 (site)"), impact: T("Inconsistent public facts weaken trust for Google and AI assistants.", "Des faits publics incohérents affaiblissent la confiance de Google et des assistants IA."), fix: T("Standardise everywhere.", "Uniformiser partout."), effort: "S" },
      { n: 10, title: T("Third-party listings show dishes no longer on the current menus and different prices", "Des annuaires tiers affichent des plats qui ne sont plus aux menus actuels et des prix différents"), impact: T("Example: burrata ฿490 on the menu vs ฿620 on a delivery listing — a mismatch guests notice at the table.", "Exemple : burrata à 490 ฿ au menu contre 620 ฿ sur une plateforme de livraison — un écart que les convives remarquent à table."), fix: T("Align listings with the current HTML menu.", "Aligner les fiches avec le menu HTML actuel."), effort: "S" },
    ] },
    { t: "details", summary: T("Technical detail", "Détail technique"), blocks: [
      { t: "p", text: T("Observations come from the public website, Rank Math's analyser and Google Business Profile listings (Oct 2026). Efforts: S = small, M = medium, L = large. Redirects must be mapped one-to-one and monitored in Search Console.", "Les observations proviennent du site public, de l'analyseur Rank Math et des fiches Google Business Profile (oct. 2026). Efforts : S = limité, M = moyen, L = important. Les redirections doivent être cartographiées une à une et suivies dans Search Console.") },
    ] },
  ]);

  /* 7 */
  S("local", T("Local SEO / Google Business Profile", "SEO local / Google Business Profile"), {
    found: T("Each branch profile can do more of the work: link, menu, categories, hours, Thai description, photos, Q&A, replies and posts.", "Chaque fiche peut en faire davantage : lien, menu, catégories, horaires, description en thaï, photos, questions-réponses, réponses aux avis et publications."),
    why: T("The Maps listing is often the last screen before a reservation or a visit; consistent facts convert and reassure.", "La fiche Maps est souvent le dernier écran avant une réservation ou une visite ; des informations cohérentes convertissent et rassurent."),
    propose: T("A short per-branch checklist, applied to Central Park first.", "Une courte liste de contrôle par restaurant, appliquée d'abord à Central Park."),
  }, [
    { t: "list", items: [
      T("Website link points to the branch page.", "Le lien du site pointe vers la page du restaurant."),
      T("Menu link points to the HTML menu.", "Le lien du menu pointe vers le menu HTML."),
      T("Categories, hours and Thai description are complete.", "Catégories, horaires et description en thaï sont complets."),
      T("Photos, Q&A, review replies and posts are kept up to date.", "Photos, questions-réponses, réponses aux avis et publications sont tenues à jour."),
      T("NAP is consistent across Google, Chope, Wongnai, Tripadvisor and mall directories.", "Le NAP est cohérent sur Google, Chope, Wongnai, Tripadvisor et les annuaires des centres commerciaux."),
    ] },
  ]);

  /* 8 */
  S("multilingual", T("Multilingual strategy", "Stratégie multilingue"), {
    found: T("English and Thai are both proven by demand (section 4).", "L'anglais et le thaï sont tous deux démontrés par la demande (section 4)."),
    why: T("Each language reaches guests who would not find the other version; native Thai copy converts better than machine translation.", "Chaque langue touche des convives qui ne trouveraient pas l'autre version ; un thaï natif convertit mieux qu'une traduction automatique."),
    propose: T("English + Thai as the core. Arabic only as an optional later layer if data supports it — not part of the pilot. Native Thai copy.", "Anglais + thaï comme socle. Arabe seulement comme couche optionnelle ultérieure si les données le justifient — hors pilote. Textes thaï natifs."),
  }, [{ t: "p", text: T("The structure (same page, same URL logic, hreflang between versions) is already shown in this demo for English, Thai and Arabic; for the pilot we would publish English and Thai.", "La structure (même page, même logique d'URL, hreflang entre les versions) est déjà illustrée dans cette démo en anglais, thaï et arabe ; pour le pilote, nous publierions l'anglais et le thaï.") }]);

  /* 9 */
  S("brand", T("Brand protection (conditional)", "Protection de la marque (conditionnelle)"), {
    found: T("Brand searches are customers you already won; the official site is not always first on them.", "Les recherches de marque sont des clients déjà acquis ; le site officiel n'est pas toujours premier."),
    why: T("Paying for clicks you would receive for free is a cost, not growth — unless competitors or platforms appear on Mozza searches.", "Payer des clics que vous recevriez gratuitement est un coût, pas de la croissance — sauf si des concurrents ou des plateformes apparaissent sur les recherches Mozza."),
    propose: T("Test with an on/off holdout before committing budget.", "Tester avec un groupe témoin on/off avant d'engager du budget."),
  }, [
    { t: "callout", text: T("Brand search protects existing demand. Non-brand search captures new demand.", "La recherche de marque protège la demande existante. La recherche hors marque capte une nouvelle demande.") },
    { t: "p", text: T("Protect brand searches only if competitors or platforms appear on Mozza searches; otherwise test with an on/off holdout so you don't pay for clicks you already receive for free.", "Ne protégez les recherches de marque que si des concurrents ou des plateformes apparaissent sur les recherches Mozza ; sinon, testez avec un groupe témoin on/off pour ne pas payer des clics que vous recevez déjà gratuitement.") },
    { t: "cards", items: [{ title: T("Cannibalisation example (hypothetical)", "Exemple de cannibalisation (hypothétique)"), text: T("Without ads: 1,200 organic visits. With ads: 700 paid + 800 organic = 1,500. Incremental ≈ 300, not 700.", "Sans annonces : 1 200 visites organiques. Avec annonces : 700 payantes + 800 organiques = 1 500. Incrément ≈ 300, pas 700.") }, { title: T("Why the cost can stay low", "Pourquoi le coût peut rester faible"), text: T("As the official brand, relevance and expected CTR are high, so actual CPC can be well below the top-of-page estimates (e.g. “mozza by cocotte” bids €0.19–0.46).", "En tant que marque officielle, la pertinence et le CTR attendu sont élevés ; le CPC réel peut donc être bien inférieur aux estimations haut de page (ex. « mozza by cocotte » : 0,19–0,46 €).") }] },
    { t: "details", summary: T("Technical detail — structure if activated", "Détail technique — structure si activée"), blocks: [
      { t: "list", items: [
        T("Search only, exact match: [mozza], [mozza by cocotte], [mozza bangkok], [mozza central park], [mozza emquartier], [mozza iconsiam], [mozza siam paragon].", "Search uniquement, correspondance exacte : [mozza], [mozza by cocotte], [mozza bangkok], [mozza central park], [mozza emquartier], [mozza iconsiam], [mozza siam paragon]."),
        T("Sitelinks per branch (Menu, Reserve, Directions).", "Liens de site par restaurant (Menu, Réserver, Itinéraire)."),
        T("Target impression share with a max CPC cap.", "Part d'impressions cible avec plafond de CPC."),
        T("Metrics: impression share, top / absolute-top impression share, lost IS (rank / budget), CPC, CTR, reservation actions.", "Indicateurs : part d'impressions, part en haut / tout en haut, part perdue (classement / budget), CPC, CTR, actions de réservation."),
      ] },
    ] },
  ]);

  /* 10 */
  S("pilot-ads", T("Google Ads pilot — non-brand Search (Central Park)", "Pilote Google Ads — Search hors marque (Central Park)"), {
    found: T("The non-brand demand in section 4 can be tested on one branch at a modest, capped budget.", "La demande hors marque de la section 4 peut être testée sur un restaurant, avec un budget modeste et plafonné."),
    why: T("A scenario shows the order of magnitude before spending: at ฿20,000 / month, roughly 40–130 tables — valued with your own average table value.", "Un scénario donne l'ordre de grandeur avant dépense : avec 20 000 ฿ / mois, environ 40 à 130 tables — valorisées avec votre propre valeur moyenne par table."),
    propose: T("Search campaign for Central Park only, with English and Thai ad groups, landing on the Central Park page.", "Campagne Search pour Central Park uniquement, avec groupes d'annonces en anglais et en thaï, dirigés vers la page Central Park."),
  }, [
    { t: "callout", title: T("Budget scenario (hypothesis, to calibrate)", "Scénario budgétaire (hypothèse, à calibrer)"), text: T("฿20,000 / month media → ≈ 800–1,330 clicks at ฿15–25 → at 5–10% click-to-table ≈ 40–130 tables → value = tables × average table value (from the calculator). A scenario, not a forecast.", "20 000 ฿ / mois de média → ≈ 800–1 330 clics à 15–25 ฿ → avec 5–10 % de clic-vers-table ≈ 40–130 tables → valeur = tables × valeur moyenne par table (issue du simulateur). Un scénario, pas une prévision.") },
    { t: "list", items: [
      T("Search campaign, Central Park only; English and Thai ad groups separated.", "Campagne Search, Central Park uniquement ; groupes d'annonces anglais et thaï séparés."),
      T("Landing page: the Central Park branch page, never the homepage.", "Page de destination : la page du restaurant Central Park, jamais la page d'accueil."),
      T("Bidding: Maximize clicks with a CPC cap → Maximize conversions once enough reservation actions are tracked.", "Enchères : Maximiser les clics avec plafond de CPC → Maximiser les conversions une fois assez d'actions de réservation suivies."),
      T("Later: Performance Max with local goals and brand exclusions — only after Search proves value.", "Plus tard : Performance Max avec objectifs locaux et exclusions de marque — seulement après que Search a prouvé sa valeur."),
    ] },
    { t: "details", summary: T("Technical detail — campaign structure", "Détail technique — structure de campagne"), blocks: [
      { t: "table", head: [T("Ad group", "Groupe d'annonces"), T("Example keywords", "Exemples de mots-clés")], rows: [
        [T("Mall / area", "Centre commercial / quartier"), "dusit central park restaurant, ร้านอาหาร ดุสิต เซ็นทรัล พาร์ค, italian restaurant silom, ร้านอาหาร พระราม 4"],
        [T("Italian near me", "Italien près de moi"), T("geo radius ≈ 1–3 km", "rayon géographique ≈ 1–3 km")],
        [T("Pizza", "Pizza"), "pizza near me, ร้านพิซซ่า ใกล้ฉัน, best pizza bangkok"],
        [T("Pasta", "Pâtes"), "pasta bangkok, ร้านพาสต้า"],
      ], source: SRC_KP },
      { t: "list", items: [
        T("Match types: exact + phrase; broad only later with conversion data.", "Types de correspondance : exacte + expression ; large seulement plus tard, avec des données de conversion."),
        T("Negatives (examples): recipe, how to make, jobs, delivery-only chains; Thai: สูตร, วิธีทำ, ทำเอง.", "Mots-clés négatifs (exemples) : recipe, how to make, jobs, chaînes de livraison seule ; thaï : สูตร, วิธีทำ, ทำเอง."),
        T("Assets: location, call, sitelinks (Menu, Reserve, Directions), callouts (handmade pasta, brick-oven pizza).", "Assets : lieu, appel, liens de site (Menu, Réserver, Itinéraire), accroches (pâtes faites main, pizza au four en brique)."),
      ] },
    ] },
  ]);

  /* 11 */
  S("daypart", T("Demand shaping by daypart", "Piloter la demande par plage horaire"), {
    found: T("Central Park shows clear weekly peaks and many hours with no wait.", "Central Park montre des pics hebdomadaires nets et de nombreuses heures sans attente."),
    why: T("Revenue grows most where capacity exists: filling quiet hours costs less than adding pressure on peak ones.", "Le chiffre d'affaires progresse surtout là où il y a de la capacité : remplir les heures calmes coûte moins que d'ajouter de la pression sur les heures de pointe."),
    propose: T("Focus non-brand activity on dayparts with available capacity (weekday lunch for the business district, weekday mornings), validated with real covers by hour.", "Concentrer l'activité hors marque sur les plages avec de la capacité disponible (déjeuner en semaine pour le quartier d'affaires, matinées en semaine), validé avec les couverts réels par heure."),
  }, [
    { t: "p", text: T("Popular Times, Central Park (Oct 2026, one capture per day): peaks Friday ≈ 6 PM and Sunday ≈ 11 AM (“as busy as it gets”, up to a 15-minute wait on Sunday); “No wait” at the other captured hours. The breakfast menu is served until 12 PM.", "Popular Times, Central Park (oct. 2026, une capture par jour) : pics le vendredi ≈ 18 h et le dimanche ≈ 11 h (« as busy as it gets », jusqu'à 15 minutes d'attente le dimanche) ; « No wait » aux autres heures capturées. Le menu petit-déjeuner est servi jusqu'à 12 h.") },
    { t: "callout", text: T("Caveat: Popular Times is relative to the place, not a capacity measure. “As busy as it gets” does not mean 100% full.", "Précaution : Popular Times est relatif au lieu, pas une mesure de capacité. « As busy as it gets » ne signifie pas 100 % de remplissage.") },
    { t: "source", text: T("Source: Google Popular Times, Central Park, Oct 2026 (a snapshot).", "Source : Google Popular Times, Central Park, oct. 2026 (un instantané).") },
  ]);

  /* 12 */
  S("system", T("Search, Ads, AI and automation — one system", "Recherche, Ads, IA et automatisation — un seul système"), {
    found: T("Menus, branches, hours, prices and languages are today maintained in several places.", "Les menus, restaurants, horaires, prix et langues sont aujourd'hui entretenus à plusieurs endroits."),
    why: T("Updating once and publishing everywhere means fewer errors, less staff time and consistent facts for Google and AI assistants.", "Mettre à jour une fois et publier partout, c'est moins d'erreurs, moins de temps de personnel et des informations cohérentes pour Google et les assistants IA."),
    propose: T("One structured source of truth feeding the website, Maps, Ads, AI assistants, booking and delivery platforms, and reporting.", "Une source de vérité structurée alimentant le site, Maps, Ads, les assistants IA, les plateformes de réservation et de livraison, et le reporting."),
  }, [
    { t: "diagram", nodes: [T("Structured source of truth (menus, branches, hours, prices, languages)", "Source de vérité structurée (menus, restaurants, horaires, prix, langues)"), T("Website", "Site web"), T("Google Search & Maps", "Google Search & Maps"), T("Google Ads", "Google Ads"), T("AI assistants", "Assistants IA"), T("Booking & delivery platforms", "Plateformes de réservation et de livraison"), T("Reporting", "Reporting")] },
    { t: "list", items: [
      T("Update a menu or opening hours once → published everywhere (fewer errors, less staff time).", "Mettre à jour un menu ou des horaires une fois → publié partout (moins d'erreurs, moins de temps de personnel)."),
      T("Reservations + loyalty data → better targeting and measurement (offline conversions, customer lists, within privacy rules).", "Réservations + données de fidélité → meilleur ciblage et meilleure mesure (conversions hors ligne, listes de clients, dans le respect des règles de confidentialité)."),
      T("Automated weekly reporting by branch and daypart.", "Reporting hebdomadaire automatisé par restaurant et par plage horaire."),
      T("AI-assisted multilingual drafts with native human review.", "Brouillons multilingues assistés par IA, relus par des natifs."),
    ] },
  ]);

  /* 13 */
  S("geo", T("AI search readiness (GEO)", "Préparation à la recherche par IA (GEO)"), {
    found: T("Guests increasingly ask AI assistants “best Italian restaurant in Siam Paragon”; assistants rely on readable, consistent, structured information.", "Les convives demandent de plus en plus aux assistants IA « le meilleur restaurant italien à Siam Paragon » ; les assistants s'appuient sur des informations lisibles, cohérentes et structurées."),
    why: T("Being readable and consistent is what makes a restaurant recommendable by AI assistants — it is also what Google rewards.", "Être lisible et cohérent est ce qui rend un restaurant recommandable par les assistants IA — c'est aussi ce que Google valorise."),
    propose: T("HTML menus, structured branch pages, schema, consistent facts across platforms, and a check that AI / search crawlers have access.", "Menus HTML, pages restaurants structurées, schéma, informations cohérentes entre plateformes, et vérification de l'accès des robots IA / moteurs."),
  }, [
    { t: "p", text: T("Factors that reduce readiness (no claim of measured AI rankings): image-only menus; branch pages with little text; /copy-of-* URLs; inconsistent public facts — company figures of 19 vs 23 restaurants and 1,000+ vs 1,300+ employees on different public pages, address 693 vs 695, third-party menus and prices differing from the current menu.", "Facteurs qui réduisent la préparation (sans prétendre mesurer de classements IA) : menus en images ; pages restaurants peu textuelles ; URL /copy-of-* ; informations publiques incohérentes — chiffres du groupe de 19 vs 23 restaurants et 1 000+ vs 1 300+ collaborateurs selon les pages publiques, adresse 693 vs 695, menus et prix de tiers différents du menu actuel.") },
  ]);

  /* 14 */
  S("platform", T("Platform roadmap — phase 2 migration (recommendation after a successful pilot)", "Feuille de route plateforme — migration en phase 2 (recommandation après un pilote réussi)"), {
    found: T("12 brands and 23 restaurants run on separate domains, and some venues exist only on Facebook.", "12 marques et 23 restaurants fonctionnent sur des domaines séparés, et certains lieux n'existent que sur Facebook."),
    why: T("A shared platform means the same branch template, tracking, multilingual structure and schema everywhere — and faster launch for new branches and concepts.", "Une plateforme partagée, c'est le même modèle de page, le même suivi, la même structure multilingue et le même schéma partout — et un lancement plus rapide des nouveaux restaurants et concepts."),
    propose: T("Decide after the pilot. This demo is a working preview of what the shared platform could look like.", "Décider après le pilote. Cette démo est un aperçu fonctionnel de ce que pourrait être la plateforme partagée."),
  }, [
    { t: "p", text: T("Domains today: mozza-bangkok.com, mozza-phuket.com, cocotte-bangkok.com, victoria-bangkok.com, parma-thailand.com, leon-bangkok.com, the-market-pattaya.com, taste-patong.com, summer-phuket.com — plus some Facebook-only venues.", "Domaines aujourd'hui : mozza-bangkok.com, mozza-phuket.com, cocotte-bangkok.com, victoria-bangkok.com, parma-thailand.com, leon-bangkok.com, the-market-pattaya.com, taste-patong.com, summer-phuket.com — plus quelques lieux présents uniquement sur Facebook.") },
    { t: "p", text: T("What it enables: full control of multilingual URLs and hreflang, structured menus and schema, performance, booking / CRM / loyalty integrations, automation and AI readiness.", "Ce que cela permet : maîtrise complète des URL multilingues et du hreflang, menus structurés et schéma, performance, intégrations réservation / CRM / fidélité, automatisation et préparation à l'IA.") },
    { t: "table", head: ["", T("Optimise current Wix sites", "Optimiser les sites Wix actuels"), T("Shared custom platform with an editor-friendly CMS (marketing team keeps editing content)", "Plateforme partagée sur mesure avec un CMS simple pour les éditeurs (l'équipe marketing continue de modifier les contenus)")], rows: [
      [T("Cost level", "Niveau de coût"), T("Lower", "Plus faible"), T("Higher up-front, lower per extra brand", "Plus élevé au départ, plus faible par marque ajoutée")],
      [T("Time", "Délai"), T("Fast", "Rapide"), T("Longer (phased, one brand first)", "Plus long (par phases, une marque d'abord)")],
      [T("Control", "Maîtrise"), T("Limited by the platform", "Limitée par la plateforme"), T("Full", "Totale")],
      [T("Scalability", "Évolutivité"), T("Per site", "Site par site"), T("Shared across brands", "Partagée entre les marques")],
      [T("Risk", "Risque"), T("Low", "Faible"), T("Managed with an SEO migration plan", "Maîtrisé par un plan de migration SEO")],
    ], source: T("Qualitative comparison; no prices.", "Comparaison qualitative ; sans prix.") },
    { t: "details", summary: T("Technical detail — risks and how they are managed", "Détail technique — risques et gestion"), blocks: [{ t: "list", items: [
      T("SEO migration plan: URL mapping, 301 redirects, Search Console monitoring.", "Plan de migration SEO : cartographie des URL, redirections 301, suivi Search Console."),
      T("Editing workflow for the team (editor-friendly CMS).", "Circuit d'édition pour l'équipe (CMS simple)."),
      T("Phased rollout: one brand first.", "Déploiement par phases : une marque d'abord."),
    ] }] },
  ]);

  /* 15 */
  S("measurement", T("Measurement & attribution", "Mesure et attribution"), {
    found: T("Reservations leave the site and cannot yet be tied to a branch, campaign or daypart.", "Les réservations quittent le site et ne peuvent pas encore être rattachées à un restaurant, une campagne ou une plage horaire."),
    why: T("What is not measured cannot be optimised — or defended in a budget meeting.", "Ce qui n'est pas mesuré ne peut être ni optimisé ni défendu en comité budgétaire."),
    propose: T("Track the funnel from search to revenue, by branch and daypart.", "Suivre l'entonnoir de la recherche au chiffre d'affaires, par restaurant et par plage horaire."),
  }, [
    { t: "diagram", nodes: [T("Search / Maps / AI", "Recherche / Maps / IA"), T("Branch page", "Page restaurant"), T("Reservation / directions / call", "Réservation / itinéraire / appel"), T("Visit", "Visite"), T("Revenue", "Chiffre d'affaires"), T("HMA Privilege", "HMA Privilege")] },
    { t: "list", items: [
      T("UTM tagging on Chope / TableCheck links.", "Balisage UTM sur les liens Chope / TableCheck."),
      T("GA4 key events: reservation, directions, WhatsApp, LINE.", "Événements clés GA4 : réservation, itinéraire, WhatsApp, LINE."),
      T("Reporting outline: search, ads, reservations by branch and daypart.", "Trame de reporting : recherche, ads, réservations par restaurant et par plage horaire."),
    ] },
    { t: "details", summary: T("Technical detail — event list", "Détail technique — liste d'événements"), blocks: [{ t: "p", text: T("reservation_click, booking_start, booking_step, booking_zone_select, booking_time_select, booking_submit_demo, whatsapp_click, line_click, directions_click, menu_view, pdf_download, language_switch (see docs/TRACKING_PLAN.md in the demo repository).", "reservation_click, booking_start, booking_step, booking_zone_select, booking_time_select, booking_submit_demo, whatsapp_click, line_click, directions_click, menu_view, pdf_download, language_switch (voir docs/TRACKING_PLAN.md dans le dépôt de la démo).") }] },
  ]);

  /* 16 */
  const obj = [
    [T("“We are a strong brand — we don't need to pay for Google Ads.”", "« Nous sommes une marque forte — nous n'avons pas besoin de payer pour Google Ads. »"), T("Brand demand brings people who already know you. Non-brand and mall-level demand is much larger and goes to others today. Paid search would target non-brand demand only, against a control branch, with a stop rule.", "La demande de marque amène des gens qui vous connaissent déjà. La demande hors marque et au niveau des centres commerciaux est bien plus importante et va aujourd'hui à d'autres. La recherche payante ciblerait uniquement la demande hors marque, face à un restaurant témoin, avec une règle d'arrêt."), T("Sections 4.3–4.5.", "Sections 4.3–4.5."), T("Non-brand reservations vs control.", "Réservations hors marque vs témoin.")],
    [T("“SEO is not our business — we sell food.”", "« Le SEO n'est pas notre métier — nous vendons de la cuisine. »"), T("SEO is free, compounding distribution. Most fixes are one-time (page structure, menus, redirects) and keep producing visits without media cost.", "Le SEO est une distribution gratuite et cumulative. La plupart des corrections sont ponctuelles (structure des pages, menus, redirections) et continuent de produire des visites sans coût média."), T("Image-only menus, /copy-of-* pages, ≈ page 2 for “italian restaurant bangkok”.", "Menus en images, pages /copy-of-*, ≈ page 2 pour « italian restaurant bangkok »."), T("Organic visits and reservations from branch pages.", "Visites organiques et réservations depuis les pages restaurants.")],
    [T("“Our restaurants are already busy.”", "« Nos restaurants sont déjà pleins. »"), T("Popular Times shows no wait at most captured hours. The goal is filling available capacity (weekday lunch, mornings), supporting new branches and concepts — not adding pressure at peak.", "Popular Times montre aucune attente à la plupart des heures capturées. L'objectif est de remplir la capacité disponible (déjeuner en semaine, matinées), de soutenir les nouveaux restaurants et concepts — pas d'ajouter de la pression aux heures de pointe."), T("Section 11 (Popular Times, Oct 2026).", "Section 11 (Popular Times, oct. 2026)."), T("Incremental covers in quiet dayparts.", "Couverts supplémentaires aux heures creuses.")],
    [T("“Social media and influencers work better for us.”", "« Les réseaux sociaux et les influenceurs fonctionnent mieux pour nous. »"), T("They create desire; search captures the moment of decision. They reinforce each other; this adds measurement to both.", "Ils créent l'envie ; la recherche capte le moment de la décision. Ils se renforcent mutuellement ; ceci ajoute de la mesure aux deux."), T("Brand searches already exist (section 4.1).", "Des recherches de marque existent déjà (section 4.1)."), T("Brand-search lift and reservations during campaigns.", "Hausse des recherches de marque et réservations pendant les campagnes.")],
    [T("“We tried Google Ads and it didn't work.”", "« Nous avons essayé Google Ads et cela n'a pas fonctionné. »"), T("Usually a structure or measurement issue (brand-term spending, homepage landing pages, no branch-level tracking). The pilot is designed to answer the question cleanly.", "C'est généralement un sujet de structure ou de mesure (dépenses sur les termes de marque, pages d'atterrissage sur l'accueil, pas de suivi par restaurant). Le pilote est conçu pour répondre proprement à la question."), T("Sections 9, 10 and 15.", "Sections 9, 10 et 15."), T("Branch-page landing + branch-level tracking.", "Atterrissage sur la page restaurant + suivi par restaurant.")],
    [T("“We can't measure walk-ins.”", "« Nous ne pouvons pas mesurer les clients sans réservation. »"), T("That's why the pilot compares a test branch with a control branch (reservations, directions, calls, covers).", "C'est pourquoi le pilote compare un restaurant test à un restaurant témoin (réservations, itinéraires, appels, couverts)."), T("Section 17.", "Section 17."), T("Test vs control on covers.", "Test vs témoin sur les couverts.")],
    [T("“Our team / agency already handles digital.”", "« Notre équipe / agence gère déjà le digital. »"), T("This is a specialist layer: search architecture, tracking, paid search. Your team keeps brand, content and social.", "C'est une couche de spécialistes : architecture de recherche, suivi, recherche payante. Votre équipe garde la marque, les contenus et les réseaux sociaux."), T("Sections 12 and 17.", "Sections 12 et 17."), T("Agreed split of responsibilities.", "Répartition des responsabilités convenue.")],
    [T("“Our website looks great — why change it?”", "« Notre site est superbe — pourquoi le changer ? »"), T("It does. The question is what Google and AI assistants can read. Phase 1 fixes this on the current site; migration is a phase-2 decision after the pilot.", "Il l'est. La question est ce que Google et les assistants IA peuvent lire. La phase 1 le traite sur le site actuel ; la migration est une décision de phase 2, après le pilote."), T("Section 6 and 13.", "Sections 6 et 13."), T("Visits and reservations from HTML menu and branch pages.", "Visites et réservations depuis le menu HTML et les pages restaurants.")],
    [T("“What about AI and ChatGPT?”", "« Et l'IA et ChatGPT ? »"), T("See section 13.", "Voir section 13."), T("Section 13.", "Section 13."), T("Consistency and readability checks.", "Contrôles de cohérence et de lisibilité.")],
    [T("“How much will this cost, and what's the risk?”", "« Combien cela coûtera-t-il, et quel est le risque ? »"), T("Limited pilot (one branch + control, 60–90 days), media budget separate and capped, decision on agreed metrics, no long-term commitment.", "Pilote limité (un restaurant + un témoin, 60–90 jours), budget média séparé et plafonné, décision sur des indicateurs convenus, aucun engagement long terme."), T("Sections 2, 10 and 17.", "Sections 2, 10 et 17."), T("Cost per incremental reservation vs the agreed stop rule.", "Coût par réservation supplémentaire vs la règle d'arrêt convenue.")],
    [T("“Why you?”", "« Pourquoi vous ? »"), T("See section 19.", "Voir section 19."), T("Section 19.", "Section 19."), "—"],
  ];
  S("objections", T("Questions you might have", "Questions que vous pourriez vous poser"), {
    found: T("Eleven questions we expect, with a short business answer, the evidence from this audit and what the pilot would test.", "Onze questions que nous anticipons, avec une réponse business courte, les éléments de cet audit et ce que le pilote testerait."),
    why: T("Good questions are part of a good decision.", "De bonnes questions font partie d'une bonne décision."),
    propose: T("Use the pilot to answer them with your own data.", "Utiliser le pilote pour y répondre avec vos propres données."),
  }, [{ t: "accordion", labels: { evidence: T("Evidence", "Éléments"), test: T("What the pilot would test", "Ce que le pilote testerait") }, items: obj.map(([q, a, e, t]) => ({ q, a, evidence: e, test: t })) }]);

  /* 17 */
  S("pilot", T("Pilot proposal & test design", "Proposition de pilote et protocole de test"), {
    found: T("Two comparable branches allow a clean read: Central Park (test) and EmQuartier (control).", "Deux restaurants comparables permettent une lecture claire : Central Park (test) et EmQuartier (témoin)."),
    why: T("A control branch separates what search adds from what would have happened anyway.", "Un restaurant témoin sépare ce que la recherche apporte de ce qui serait arrivé de toute façon."),
    propose: T("60–90 days, success defined in advance, stop rule agreed before launch.", "60–90 jours, succès défini à l'avance, règle d'arrêt convenue avant le lancement."),
  }, [
    { t: "p", text: T("Central Park (test) vs EmQuartier (control), 60–90 days. Components: branch page, HTML menu, Google Business Profile alignment, non-brand Search, tracking.", "Central Park (test) vs EmQuartier (témoin), 60–90 jours. Composantes : page restaurant, menu HTML, alignement de la fiche Google Business Profile, Search hors marque, suivi.") },
    { t: "callout", title: T("Success metric", "Indicateur de succès"), text: T("Incremental reservations and visits vs control; cost per incremental reservation. Stop rule agreed in advance.", "Réservations et visites supplémentaires vs témoin ; coût par réservation supplémentaire. Règle d'arrêt convenue à l'avance.") },
  ]);

  /* 18 */
  S("roadmap", T("30 / 60 / 90 days", "30 / 60 / 90 jours"), {
    found: T("A simple sequence: foundations, launch, decision.", "Une séquence simple : fondations, lancement, décision."),
    why: T("Fixes in the first 30 days start producing value before any media is spent.", "Les corrections des 30 premiers jours commencent à produire de la valeur avant toute dépense média."),
    propose: T("Review at day 90 against the control branch.", "Revue au jour 90 face au restaurant témoin."),
  }, [{ t: "timeline", items: [
    { label: T("Day 30", "Jour 30"), items: [T("Tracking in place.", "Suivi en place."), T("Central Park page + redirects.", "Page Central Park + redirections."), T("Google Business Profile fixes.", "Corrections de la fiche Google Business Profile."), T("Thai branch page.", "Page restaurant en thaï."), T("HTML menu.", "Menu HTML.")] },
    { label: T("Day 60", "Jour 60"), items: [T("Search campaign live, weekly optimisation.", "Campagne Search en ligne, optimisation hebdomadaire."), T("Brand-search check (on/off test if relevant).", "Contrôle de la recherche de marque (test on/off si pertinent).")] },
    { label: T("Day 90", "Jour 90"), items: [T("Results vs control.", "Résultats vs témoin."), T("Decision to scale to other branches and brands.", "Décision d'étendre à d'autres restaurants et marques."), T("Phase-2 platform decision.", "Décision sur la plateforme de phase 2.")] },
  ] }]);

  /* 19 */
  S("author", T("Who is behind this", "Qui est derrière cette démarche"), {
    found: T("Wadhah Belhassen — search & customer-acquisition consultant.", "Wadhah Belhassen — consultant en recherche et acquisition de clientèle."),
    why: T("One accountable specialist for the whole acquisition chain, from search architecture to reporting.", "Un spécialiste responsable de toute la chaîne d'acquisition, de l'architecture de recherche au reporting."),
    propose: T("Discuss the pilot.", "Échanger sur le pilote."),
  }, [
    { t: "list", items: [
      T("Skills: Google Ads · SEO & technical SEO · Local SEO / Google Business Profile · GA4 / GTM tracking · conversion optimisation · multilingual acquisition (EN / FR / AR, with native Thai partners) · market and search-demand research.", "Compétences : Google Ads · SEO et SEO technique · SEO local / Google Business Profile · suivi GA4 / GTM · optimisation de la conversion · acquisition multilingue (EN / FR / AR, avec des partenaires thaï natifs) · études de marché et de demande de recherche."),
      T("Experience types: local growth for a café / bakery in Berlin (Search, Maps, Ads); multilingual growth partnership in Tunisia (website, SEO, Ads, tracking).", "Types d'expérience : croissance locale pour un café / une boulangerie à Berlin (Search, Maps, Ads) ; partenariat de croissance multilingue en Tunisie (site, SEO, Ads, suivi)."),
    ] },
    // "Verified results" placeholder: intentionally NOT rendered (verify: true) until the user supplies confirmed results.
    { t: "cta", label: T("Discuss the pilot", "Échanger sur le pilote"), note: T("(placeholder — no contact link yet)", "(espace réservé — pas encore de lien de contact)") },
  ]);

  /* 20 */
  S("needs", T("What we need from you", "Ce dont nous avons besoin de votre part"), {
    found: T("A small set of read-only access and two business numbers.", "Quelques accès en lecture seule et deux chiffres métier."),
    why: T("They replace example values with real ones and make the pilot comparison reliable.", "Ils remplacent les valeurs d'exemple par des valeurs réelles et fiabilisent la comparaison du pilote."),
    propose: T("Share them for Central Park and EmQuartier.", "Les partager pour Central Park et EmQuartier."),
  }, [{ t: "list", items: [
    T("Read-only access: Search Console, Google Business Profile insights, GA4 (if any), Chope / TableCheck reports for Central Park and EmQuartier.", "Accès en lecture seule : Search Console, statistiques Google Business Profile, GA4 (le cas échéant), rapports Chope / TableCheck pour Central Park et EmQuartier."),
    T("Average spend per guest, and covers by hour if available.", "Addition moyenne par convive, et couverts par heure si disponibles."),
  ] }]);

  /* 21 */
  S("sources", T("Sources & caveats", "Sources et précautions"), {
    found: T("Every number in this page carries its source and date; estimates, snapshots and hypotheses are labelled.", "Chaque chiffre de cette page porte sa source et sa date ; estimations, instantanés et hypothèses sont signalés."),
    why: T("So that every figure can be checked and nothing is mistaken for analytics.", "Pour que chaque chiffre puisse être vérifié et que rien ne soit pris pour des données analytics."),
    propose: T("Replace estimates with your own data during the pilot.", "Remplacer les estimations par vos propres données pendant le pilote."),
  }, [{ t: "table", head: [T("Source", "Source"), T("Date", "Date"), T("Nature", "Nature")], rows: [
    ["Google Keyword Planner (Bangkok, all languages, Google Search, Oct 2025 – Sep 2026; two exports)", T("Oct 2026 (two exports)", "oct. 2026 (deux exports)"), T("Estimate (ranges)", "Estimation (fourchettes)")],
    ["Ahrefs", T("Oct 2026", "oct. 2026"), T("Third-party estimate", "Estimation de tiers")],
    ["Mangools", T("Oct 2026", "oct. 2026"), T("Third-party estimate", "Estimation de tiers")],
    [T("Google Maps & SERP", "Google Maps et SERP"), T("Oct 2026", "oct. 2026"), T("Snapshot", "Instantané")],
    ["Popular Times", T("Oct 2026", "oct. 2026"), T("Snapshot, relative to the place", "Instantané, relatif au lieu")],
    [T("Google Ads Transparency Center", "Centre de transparence des annonces Google"), T("Oct 2026", "oct. 2026"), T("Observation", "Observation")],
    ["Rank Math SEO analyzer", T("Oct 2026", "oct. 2026"), T("Tool output", "Résultat d'outil")],
    [T("Mozza website and menu PDFs", "Site Mozza et menus PDF"), T("Oct 2026", "oct. 2026"), T("Public documents", "Documents publics")],
    [T("Calculator values, budget scenario, cannibalisation and click-to-table examples", "Valeurs du simulateur, scénario budgétaire, exemples de cannibalisation et de clic-vers-table"), "—", T("Hypothesis / example", "Hypothèse / exemple")],
  ], source: T("EUR → THB conversion: 1 EUR ≈ " + fx + " THB (≈, rate to verify).", "Conversion EUR → THB : 1 EUR ≈ " + fx + " THB (≈, taux à vérifier).") }]);

  const ui = {
    title: T("Growth strategy for multi-location restaurants", "Stratégie de croissance pour restaurants multi-sites"),
    subtitle: T("Audit and proposal for the HMA / Mozza marketing team and management — private, concept demo", "Audit et proposition pour l'équipe marketing et la direction de HMA / Mozza — privé, démo conceptuelle"),
    toc: T("Contents", "Sommaire"), print: T("Print / Save as PDF", "Imprimer / Enregistrer en PDF"), lang: T("Language", "Langue"),
    found: T("What we found", "Ce que nous avons constaté"), why: T("Why it matters financially", "Pourquoi c'est important financièrement"), propose: T("What we propose", "Ce que nous proposons"),
    tech: T("Technical detail", "Détail technique"), source: T("Source", "Source"), example: T("Example values — replace with your data", "Valeurs d'exemple — à remplacer par vos données"),
    footer: T("Private page for the concept demo. Not indexed. Estimates, snapshots and hypotheses are labelled; nothing here is a guarantee.", "Page privée de la démo conceptuelle. Non indexée. Les estimations, instantanés et hypothèses sont signalés ; rien ici n'est une garantie."),
    bandHint: T("Highlighted band = Keyword Planner range (not an exact value)", "Tranche surlignée = fourchette Keyword Planner (pas une valeur exacte)"),
    bands: D.BAND_LABELS,
    calc: {
      title: T("Return calculator", "Simulateur de retour"), note: T("Runs in your browser only. Nothing is stored or sent.", "Fonctionne uniquement dans votre navigateur. Rien n'est enregistré ni envoyé."),
      inputs: [
        { id: "spend", label: T("Average spend per guest (THB)", "Addition moyenne par convive (THB)"), v: 800, step: 50, min: 0 },
        { id: "gpt", label: T("Guests per table", "Convives par table"), v: 2.5, step: 0.5, min: 1 },
        { id: "tables", label: T("Additional tables per week from search, per branch", "Tables supplémentaires par semaine issues de la recherche, par restaurant"), v: 10, step: 1, min: 0 },
        { id: "branches", label: T("Number of branches in scope", "Nombre de restaurants concernés"), v: 1, step: 1, min: 1 },
        { id: "margin", label: T("Gross margin (%)", "Marge brute (%)"), v: 65, step: 1, min: 0 },
        { id: "media", label: T("Monthly media budget (THB)", "Budget média mensuel (THB)"), v: 20000, step: 1000, min: 0 },
        { id: "share", label: T("Share of new guests joining HMA Privilege (%)", "Part des nouveaux convives rejoignant HMA Privilege (%)"), v: 20, step: 1, min: 0 },
        { id: "visits", label: T("Visits per year of a Privilege member", "Visites par an d'un membre Privilege"), v: 4, step: 1, min: 0 },
      ],
      outputs: {
        revenue: T("Additional monthly revenue", "Chiffre d'affaires mensuel supplémentaire"), gross: T("Additional monthly gross profit", "Marge brute mensuelle supplémentaire"), media: T("Media cost", "Coût média"),
        after: T("Profit after media", "Résultat après média"), cpt: T("Cost per additional table", "Coût par table supplémentaire"),
        guestYear: T("Estimated yearly value of a new guest through HMA Privilege (gross profit)", "Valeur annuelle estimée d'un nouveau convive via HMA Privilege (marge brute)"),
        members: T("New Privilege members per month", "Nouveaux membres Privilege par mois"),
      },
      unit: T("THB", "THB"),
    },
  };
  return { lang: L, ui, sections };
}
