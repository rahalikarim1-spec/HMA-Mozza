// Language-neutral NUMBERS for the /strategy page (source: the user's audit prompt, Oct 2026).
// Volumes are Google Keyword Planner RANGES (never exact, never summed). Bids are historical top-of-page estimates in EUR.
export const BAND = { "10–100": 1, "100–1K": 2, "1K–10K": 3, "10K–100K": 4 };
export const BAND_LABELS = ["10–100", "100–1K", "1K–10K", "10K–100K"];

// [keyword, volume, competition, bidLo, bidHi]  (null = not available in the source)
export const brand = [
  ["mozza", "1K–10K", "Medium", 0.22, 1.32],
  ["mozza by cocotte", "1K–10K", "Low", 0.19, 0.46],
  ["mozza by cocotte siam paragon", "1K–10K", "Low", 0.04, 0.26],
  ["mozza by cocotte iconsiam", "1K–10K", "Low", 0.08, 0.6],
  ["mozza by cocotte emquartier", "1K–10K", "Low", 0.06, 0.3],
  ["mozza emquartier", "100–1K", "Low", 0.13, 0.8],
  ["mozza iconsiam", "100–1K", "Low", null, null],
  ["mozza central park", "100–1K", "Low", null, null],
  ["mozza bangkok", ["100–1K", "10–100"], "Medium", 0.28, 1.01],
  ["mozza menu", ["10–100", "100–1K"], "Low", 0.3, 1.78],
  ["parma by mozza", "100–1K", "Low", null, null],
];
export const portfolio = [
  ["cocotte", "1K–10K", 0.14, 0.53],
  ["cocotte farm roast & winery", "1K–10K", 0.07, 0.27],
  ["victoria by cocotte emquartier", "1K–10K", 0.1, 0.37],
  ["victoria by cocotte central world", "1K–10K", 0.12, 0.51],
  ["the kitchen patong", "1K–10K", 0.19, 0.61],
  ["taste bistro & grill", "1K–10K", 0.2, 0.61],
  ["summer seaside restaurant", "1K–10K", 0.22, 0.63],
  ["parma by mozza bangtao", "1K–10K", null, null],
  ["mojo patong", "1K–10K", 0.21, 0.56],
];
export const en = [
  ["italian restaurant near me", "10K–100K", "Medium", 0.23, 0.58],
  ["pizza near me", "10K–100K", "Medium", 0.17, 1.03],
  ["italian restaurant bangkok", "1K–10K", "Medium", 0.24, 0.74],
  ["best italian restaurant bangkok", "1K–10K", "High", 0.24, 0.79],
  ["best pizza bangkok", "1K–10K", "Medium", 0.23, 0.87],
  ["pizza bangkok", "100–1K", "Medium", 0.29, 1.52],
  ["pasta bangkok", "100–1K", "Medium", 0.19, 0.66],
  ["best pasta bangkok", "100–1K", "High", 0.25, 0.63],
  ["italian food near me", "100–1K", "Medium", 0.24, 0.59],
  ["italian food bangkok", "100–1K", "Medium", 0.16, 0.66],
  ["italian restaurant sukhumvit", "100–1K", "Medium", 0.14, 0.8],
  ["italian restaurant sathorn", "100–1K", "Medium", 0.19, 0.49],
  ["italian restaurant siam paragon", "100–1K", "Medium", 0.12, 0.6],
  ["neapolitan pizza bangkok", "10–100", "Medium", 0.35, 1.29],
];
export const th = [
  ["พิซซ่า", "10K–100K", "Low", 0.05, 0.42],
  ["ร้านอาหารอิตาเลี่ยน", "1K–10K", "Low", 0.15, 0.4],
  ["ร้านอาหารอิตาเลี่ยน ใกล้ฉัน", "1K–10K", "Medium", 0.12, 0.35],
  ["อาหารอิตาเลียน", "1K–10K", "Low", 0.14, 0.55],
  ["ร้านพิซซ่า", "1K–10K", "Low", 0.19, 0.75],
  ["ร้านพิซซ่า ใกล้ฉัน", "1K–10K", "Low", 0.1, 0.51],
  ["พิซซ่า ใกล้ฉัน", "1K–10K", "Low", 0.11, 0.55],
  ["ร้านอาหารอิตาเลียน สาทร", "100–1K", "Medium", 0.1, 0.38],
  ["ร้านอาหาร วันเกิด", "100–1K", "Medium", 0.17, 0.51],
];
// mall: [mall, [kw, vol, lo, hi][] English, [kw, vol, lo, hi][] Thai]
export const malls = [
  ["Siam Paragon", [["siam paragon restaurant", "1K–10K", 0.09, 0.54]], [["ร้านอาหาร สยามพารากอน", "1K–10K", 0.03, 0.4], ["พารากอน ร้านอาหาร", "1K–10K", 0.21, 0.54]]],
  ["ICONSIAM", [["iconsiam restaurant", "1K–10K", 0.03, 0.45]], [["ร้านอาหาร ไอคอนสยาม", "1K–10K", 0.01, 0.27]]],
  ["EmQuartier", [["emquartier restaurant", "1K–10K", 0.11, 0.31]], [["ร้านอาหาร เอ็มควอเทียร์", "1K–10K", 0.09, 0.23]]],
  ["Central Park", [["dusit central park restaurant", "1K–10K", 0.12, 0.66]], [["ร้านอาหาร ดุสิต เซ็นทรัล พาร์ค", "100–1K", 0.01, 0.23]]],
  ["Central Chidlom", [["central chidlom restaurant", "100–1K", 0.2, 0.7]], [["ร้านอาหาร เซ็นทรัลชิดลม", "1K–10K", 0.07, 0.48]]],
];
export const ratings = [
  ["EmQuartier", "4.5", "2,066", "฿400–1,600"],
  ["ICONSIAM", "4.8", "953", "—"],
  ["Siam Paragon", "4.7", "1,545", "฿600–1,600"],
  ["Central Park", "4.9", "1,477", "฿400–1,600"],
];
// target pages on the demo (proposed mapping, from docs/SEO_PLAN.md)
export const targetFor = {
  "italian restaurant bangkok": "/", "best italian restaurant bangkok": "/", "italian food bangkok": "/", "italian food near me": "/locations/",
  "italian restaurant near me": "/locations/", "pizza near me": "/neapolitan-pizza-bangkok/", "best pizza bangkok": "/neapolitan-pizza-bangkok/",
  "pizza bangkok": "/neapolitan-pizza-bangkok/", "neapolitan pizza bangkok": "/neapolitan-pizza-bangkok/", "pasta bangkok": "/pasta-bangkok/",
  "best pasta bangkok": "/pasta-bangkok/", "italian restaurant sukhumvit": "/locations/emquartier/", "italian restaurant sathorn": "/locations/central-park/",
  "italian restaurant siam paragon": "/locations/siam-paragon/",
};
