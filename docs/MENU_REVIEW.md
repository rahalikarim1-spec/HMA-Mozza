# MENU REVIEW — transcribed — unverified

Every dish, description, price and dietary tag in `src/data/menus/*.json` was **transcribed by an AI reading page images** (food.pdf, brunch.pdf: image-only; afternoon-tea.pdf: prices only as text; aperitivo.pdf: text layer + page images). **Nothing is verified.** Each item carries `verify: true`.

## How tags were set

- **vegetarian / vegetarian-on-request / pork / spicy**: only from the icons printed on the Mozza food menu (legend on pp. 5, 9, 11, 13: Vegetarian, Vegetarian version available on request, Contains pork, Level of spiciness).
- **alcohol**: only where an alcoholic ingredient or drink is *named* (spirits, wine, prosecco, beer, "white/red wine" in a description). Dishes that may use wine/liqueur without saying so carry no tag.
- **pork derived from ingredient names** (not an icon): menus without icons (brunch, aperitivo) and one side dish. Listed below. Wrong either way = a labelling error, so confirm all of them.
- Tags that contradicted the source were **withheld** (listed below).

## Items needing a human decision

- **Food · p.7 · Niçoise Salad** — Source icon is the filled 'Vegetarian' symbol, but the ingredients list tuna and anchovies. Likely a source error: vegetarian tag WITHHELD. Confirm with Mozza.
- **Food · p.8 · Linguine alle Vongole** — 'white wine sauce' named in the description; alcohol tag derived from that wording (not an icon).
- **Food · p.15 · Wagyu Prime Rib** — 'Red wine' sauce named in the description; alcohol tag derived from that wording (not an icon).
- **Food · p.15 · Green Peas & Guanciale** — No pork icon in the source; pork tag derived from the ingredient name 'guanciale' (cured pork cheek). Confirm with Mozza.
- **Food · p.16 · Cocotte's Tiramisu** — The description names no alcohol; no alcohol tag set. Ask Mozza whether the tiramisu contains alcohol (earlier demo copy assumed 'to confirm').
- **Brunch & Breakfast · p.2-left · Pizza Breakfast Sandwich** — This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (bacon)
- **Brunch & Breakfast · p.2-left · Italian Shakshuka** — This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. ('nduja / ventricina are pork salami; the description does not say 'pork')
- **Brunch & Breakfast · p.2-right · Benedict Carbonara** — This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (bacon, guanciale)
- **Brunch & Breakfast · p.2-right · Italian Omelette Parma Ham & Spinach** — This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (Parma ham)
- **Aperitivo · p.1 · Aperitivo Board** — Menu has no dietary icons; pork tag derived from 'prosciutto & mortadella'. Confirm with Mozza.
- **Afternoon Tea · p.1 · Afternoon Tea Set — with Tea or Coffee** — The PDF lists NO individual items for the set (only a photo of a tiered stand). Contents not transcribed; do not invent.
- **Afternoon Tea · p.1 · Afternoon Tea Set — with Prosecco** — The PDF lists NO individual items for the set. Alcohol tag from 'Prosecco' (named in the source).

## Not transcribed on purpose

- food.pdf pp. 22–24: brand promotions for Cocotte (not Mozza menu content; contain another brand's address, phone, opening hours — not used).
- Afternoon Tea: no per-item list exists in the PDF; the set contents are NOT transcribed.
- Photos/logos/award badges on the PDFs are not reproduced (no other-brand logos).

## Page-by-page ledger

### Food — `source/menus/food.pdf`

Main menu booklet. Pages 22-24 (brand promos for Cocotte etc.) are intentionally not ingested.

| Page | Category | Item | Price (THB) | Tags | Notes |
|---|---|---|---|---|---|
| 3 | Spritz | L'originale | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 3 | Spritz | Il Basilico | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 3 | Spritz | Ispahan | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 3 | Spritz | Venitian Garden | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 3 | Spritz | Bellisimo Spritz | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 3 | Spritz | Limoncello | 320 (320 per glass (stated once for the page)) | alcohol |  |
| 4 | Cheeses & Cold Cuts | Italian Board | 590 | pork |  |
| 4 | Cheeses & Cold Cuts | Mozza's Board | 980 | pork |  |
| 4 | Cheeses & Cold Cuts | Truffle Board | 690 | pork |  |
| 4 | Cheeses & Cold Cuts | Parma Ham Selection | 60g 490 / 100g 790 | pork |  |
| 5 | Burrata | Tomato Confit & Balsamic Caramel | 490 | vegetarian |  |
| 5 | Burrata | Mango, Bell Pepper & Parma Ham | 640 | vegetarian-on-request, pork |  |
| 5 | Burrata | Pesto & Sun-Dried Cherry Tomatoes | 620 | vegetarian |  |
| 6 | Starter | Truffle Arancini | 440 | vegetarian |  |
| 6 | Starter | Parmigiana Di Melanzane | 390 | vegetarian |  |
| 6 | Starter | Fritto Misto | 390 | — |  |
| 6 | Starter | Polpette Al Sugo | 390 | — |  |
| 6 | Starter | Carpaccio di Polpo | 440 | — |  |
| 6 | Starter | Salmon Tartare | 440 | — |  |
| 6 | Starter | Mozza Trio Bruschetta | 490 | pork |  |
| 7 | Salad | Niçoise Salad | 390 | — | ⚠ Source icon is the filled 'Vegetarian' symbol, but the ingredients list tuna and anchovies. Likely a source error: vegetarian tag WITHHELD. Confirm with Mozza. |
| 7 | Salad | Mozza Caesar Salad | 390 | vegetarian-on-request, pork |  |
| 7 | Salad | Crab & Mango Salad | 430 | vegetarian-on-request |  |
| 7 | Salad | Italian Sausage Salad | 380 | vegetarian-on-request, pork |  |
| 7 | Salad | Insalata di Mare | 490 | — |  |
| 7 | Salad | Caprese Mozza Salad | 460 | vegetarian |  |
| 8 | Pasta & Risotto | Reginette all'Amatriciana | 490 | vegetarian-on-request, pork |  |
| 8 | Pasta & Risotto | Lasagna della Nonna | 490 | — |  |
| 8 | Pasta & Risotto | Gnocchi Pesto | 490 | vegetarian |  |
| 8 | Pasta & Risotto | Tiger Prawns Aglio Olio | 520 | vegetarian-on-request, spicy |  |
| 8 | Pasta & Risotto | Rigatoni Gratinati alla Diavola | 460 | vegetarian-on-request, spicy, pork |  |
| 8 | Pasta & Risotto | Linguine alle Vongole | 690 | alcohol | ⚠ 'white wine sauce' named in the description; alcohol tag derived from that wording (not an icon). |
| 8 | Pasta & Risotto | Risotto Frutti Di Mare | 840 | — |  |
| 9 | Pasta & Risotto | Spaghetti Bolognese | 490 | — |  |
| 9 | Pasta & Risotto | Mushroom Risotto | 520 | vegetarian |  |
| 9 | Pasta & Risotto | Ravioli Spinach & Ricotta | 540 | vegetarian |  |
| 9 | Pasta & Risotto | Spaghetti alla Carbonara | 490 | vegetarian-on-request, pork |  |
| 9 | Pasta & Risotto | Spaghetti Gamberi & Stracciatella | 690 | — |  |
| 9 | Pasta & Risotto | Truffle Tagliolini | 690 | vegetarian |  |
| 10 | Pizza | Bufalina | 390 | vegetarian |  |
| 10 | Pizza | Vesuvio | 540 | vegetarian |  |
| 10 | Pizza | Quattro Formaggi | 620 | vegetarian |  |
| 10 | Pizza | Abruzzese | 660 | pork, spicy |  |
| 10 | Pizza | Schiacciata Mortadella e Pistacchio | 690 | pork |  |
| 10 | Pizza | Rustica | 660 | pork |  |
| 11 | Pizza | Salmone | 660 | — |  |
| 11 | Pizza | Mangia Fuoco | 690 | pork, spicy |  |
| 11 | Pizza | Capricciosa | 690 | pork |  |
| 11 | Pizza | Carpi Salerno | 760 | pork |  |
| 11 | Pizza | Boscaiola | 690 | vegetarian-on-request, pork |  |
| 11 | Pizza | Tartufina | 890 | pork |  |
| 12 | Main Course | Chicken Milanese | 490 | — |  |
| 12 | Main Course | Pollo alle Mandorle | 520 | — |  |
| 12 | Main Course | Salmon Steak | 590 | — |  |
| 12 | Main Course | Italian Sea Bass | 690 | spicy |  |
| 12 | Main Course | Snow Fish Livornese | 990 | — |  |
| 13 | Main Course | Mussels & Tomato | 580 | spicy |  |
| 13 | Main Course | Filetto di Maiale alla Calabrese | 590 | pork, spicy |  |
| 13 | Main Course | Pork & Mushrooms | 680 | pork |  |
| 13 | Main Course | Beef Tartare | 690 | — |  |
| 13 | Main Course | Beef Cheek Risotto | 790 | — |  |
| 13 | Main Course | Lamb Shank | 980 | — |  |
| 14 | Grill | Wagyu Flank Steak | 1,090 | — |  |
| 14 | Grill | Tenderloin 'Rossini' | 1,490 | — |  |
| 14 | Grill | Tagliata Di Manzo | 2,590 | — |  |
| 15 | Grill | Wagyu Prime Rib | 1kg 4,190 / 1.2kg 4,960 | alcohol | ⚠ 'Red wine' sauce named in the description; alcohol tag derived from that wording (not an icon). |
| 15 | Side dish | Rosemary Potatoes | 140 | — |  |
| 15 | Side dish | French Fries | 140 | — |  |
| 15 | Side dish | Mashed Potatoes | 160 | — |  |
| 15 | Side dish | Green Peas & Guanciale | 160 | pork | ⚠ No pork icon in the source; pork tag derived from the ingredient name 'guanciale' (cured pork cheek). Confirm with Mozza. |
| 15 | Side dish | Sautéed Mushrooms | 180 | — |  |
| 15 | Side dish | Spinach & Parmesan | 190 | — |  |
| 15 | Side dish | Parmesan Fries & Truffle Mayo | 190 | — |  |
| 15 | Side dish | Truffle Mashed Potatoes | 220 | — |  |
| 16 | Dolci | Creme Caramel All'arancia | 260 | — |  |
| 16 | Dolci | Tropical Panna Cotta | 280 | — |  |
| 16 | Dolci | Mozza's Lava Cake | 320 | — |  |
| 16 | Dolci | Cocotte's Tiramisu | 320 | — | ⚠ The description names no alcohol; no alcohol tag set. Ask Mozza whether the tiramisu contains alcohol (earlier demo copy assumed 'to confirm'). |
| 16 | Dolci | Pasticceria Assortita | 320 | — |  |
| 17 | Dolci | Cherry & Amaretti Cheesecake | 320 | — |  |
| 17 | Dolci | Banana & Caramel Cookie | 320 | — |  |
| 17 | Dolci | Profiterole al Pistacchio | 340 | — |  |
| 17 | Dolci | 100% Homemade Gelato | Scoop 160 / Waffle Cone 180 | — |  |
| 18 | Signature Drinks | Affogato Vanilla | 160 | — |  |
| 18 | Signature Drinks | Pineapple Espresso Tonic | 160 | — |  |
| 18 | Signature Drinks | Matcha Vanilla | 160 | — |  |
| 18 | Signature Drinks | Cafe Con Panna e Mandorla | 160 | — |  |
| 18 | Signature Drinks | Cappuccino Caramelo | 160 | — |  |
| 18 | Signature Drinks | Nocciolato | 190 | — |  |
| 18 | Homemade Juice | Nectare | 140 (140 per glass (stated once for the section)) | — |  |
| 18 | Homemade Juice | Jardino | 140 (140 per glass (stated once for the section)) | — |  |
| 18 | Homemade Juice | Sole | 140 (140 per glass (stated once for the section)) | — |  |
| 18 | Homemade Juice | Rosso | 140 (140 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Mango, Passion Fruit & Ginger | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Wild Berries | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Banana, Strawberry & Guava | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Watermelon | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Kiwi, Pineapple & Basil | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Smoothie | Tangerine, Green Apple & Lime | 160 (160 per glass (stated once for the section)) | — |  |
| 19 | Milkshake | Tiramisu | 220 (220 per glass (stated once for the section)) | — |  |
| 19 | Milkshake | Choco Macadamia | 220 (220 per glass (stated once for the section)) | — |  |
| 19 | Milkshake | Mango Sticky Rice | 220 (220 per glass (stated once for the section)) | — |  |
| 19 | Milkshake | Banana Caramel | 220 (220 per glass (stated once for the section)) | — |  |
| 20 | Italian Soda | Mixed Berries Rosemary | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Italian Soda | Apricot Basil | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Italian Soda | Blood Orange & Mint | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Italian Soda | Lychee | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Homemade Iced Tea | Passion Fruit & Mango | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Homemade Iced Tea | Peach & Butterfly Pea | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Homemade Iced Tea | Lemongrass, Mint & Ginger | 140 (140 per glass (stated once for the section)) | — |  |
| 20 | Homemade Iced Tea | Hibiscus, Pineapple & Kaffir | 140 (140 per glass (stated once for the section)) | — |  |
| 21 | Water | Mozza Water 50cl | 50 | — |  |
| 21 | Water | Evian Water 50cl | 80 | — |  |
| 21 | Water | Evian Water 75cl | 145 | — |  |
| 21 | Water | Evian Sparkling Water 75cl | 160 | — |  |
| 21 | Soft Drink | Soda Water 33cl | 50 | — |  |
| 21 | Soft Drink | Coke 33cl | 80 | — |  |
| 21 | Soft Drink | Coke Zero 33cl | 80 | — |  |
| 21 | Soft Drink | Diet Coke 33cl | 80 | — |  |
| 21 | Soft Drink | Tonic Water Schweppes 33cl | 80 | — |  |
| 21 | Soft Drink | Sprite 33cl | 80 | — |  |
| 21 | Soft Drink | Ginger Ale 33cl | 90 | — |  |
| 21 | Soft Drink | Red Bull 25cl | 120 | — |  |
| 21 | Coffee | Espresso | 80 (hot only) | — |  |
| 21 | Coffee | Lungo | 90 (hot only) | — |  |
| 21 | Coffee | Macchiato | 90 (hot only) | — |  |
| 21 | Coffee | Americano | Hot 90 / Iced 100 | — |  |
| 21 | Coffee | Piccolo Latte | 100 (hot only) | — |  |
| 21 | Coffee | Cappuccino | Hot 110 / Iced 120 | — |  |
| 21 | Coffee | Cafe Latte | Hot 110 / Iced 120 | — |  |
| 21 | Coffee | Mocha | Hot 110 / Iced 120 | — |  |
| 21 | Coffee | Flat White | 120 (hot only) | — |  |
| 21 | Tea | English Breakfast Ceylon Tea | 110 | — |  |
| 21 | Tea | Earl Grey Ceylon Tea | 110 | — |  |
| 21 | Tea | Chamomille Herbal Infusion | 110 | — |  |
| 21 | Tea | Pure Ceylon Green Tea | 110 | — |  |
| 21 | Tea | Darjeeling Tea | 110 | — |  |
| 21 | Tea | Mint Ceylon Tea | 110 | — |  |
| 21 | Tea | Rose Ceylon Tea | 110 | — |  |
| 21 | Coffee options (add) | Extra shot | 20 (+20 add-on) | — |  |
| 21 | Coffee options (add) | Decaf blend | 20 (+20 add-on) | — |  |
| 21 | Coffee options (add) | Almond milk | 20 (+20 add-on) | — |  |
| 21 | Coffee options (add) | Soy milk | 20 (+20 add-on) | — |  |
| 21 | Coffee options (add) | Macadamia Milk | 20 (+20 add-on) | — |  |

### Brunch & Breakfast — `source/menus/brunch.pdf`

Source title: "Buongiorno! Breakfast, everyday until 12pm".

| Page | Category | Item | Price (THB) | Tags | Notes |
|---|---|---|---|---|---|
| 1-left | On-the-go Breakfast | Mozza's On-the-go Breakfast | 195 | — |  |
| 2-left | Breakfast | Avocado Egg Toast | 390 | — |  |
| 2-left | Breakfast | Pizza Breakfast Sandwich | 340 | pork | ⚠ This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (bacon) |
| 2-left | Breakfast | Italian Shakshuka | 290 | pork | ⚠ This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. ('nduja / ventricina are pork salami; the description does not say 'pork') |
| 2-right | Breakfast | Granola Bowl | 290 | — |  |
| 2-right | Breakfast | Benedict Carbonara | 310 | pork | ⚠ This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (bacon, guanciale) |
| 2-right | Breakfast | Benedict Smoked Salmon | 340 | — |  |
| 2-right | Breakfast | Italian Omelette Parma Ham & Spinach | 310 | pork | ⚠ This menu has no dietary icons; pork tag derived from the ingredient name(s) in the description. Confirm with Mozza. (Parma ham) |
| 2-right | Breakfast | Italian Omelette Smoked Salmon & Mascarpone | 340 | — |  |
| 2-left | Bakery | Homemade Bread | 90 | — |  |
| 2-left | Bakery | 100% Butter Croissant | 90 | — |  |
| 2-left | Bakery | Cornetto alla Crema | 130 | — |  |
| 1-right | Signature Drinks | Affogato Vanilla | 160 | — |  |
| 1-right | Signature Drinks | Pineapple Espresso Tonic | 160 | — |  |
| 1-right | Signature Drinks | Matcha Vanilla | 160 | — |  |
| 1-right | Signature Drinks | Cafe Con Panna e Mandorla | 160 | — |  |
| 1-right | Signature Drinks | Cappuccino Caramelo | 160 | — |  |
| 1-right | Signature Drinks | Nocciolato | 190 | — |  |
| 1-right | Homemade Juice | Nectare | 140 (140 per glass (stated once for the section)) | — |  |
| 1-right | Homemade Juice | Jardino | 140 (140 per glass (stated once for the section)) | — |  |
| 1-right | Homemade Juice | Sole | 140 (140 per glass (stated once for the section)) | — |  |
| 1-right | Homemade Juice | Rosso | 140 (140 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Mango, Passion Fruit & Ginger | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Wild Berries | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Banana, Strawberry & Guava | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Watermelon | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Kiwi, Pineapple & Basil | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Smoothie | Tangerine, Green Apple & Lime | 160 (160 per glass (stated once for the section)) | — |  |
| 1-right | Coffee | Espresso | 80 (hot only) | — |  |
| 1-right | Coffee | Lungo | 90 (hot only) | — |  |
| 1-right | Coffee | Macchiato | 90 (hot only) | — |  |
| 1-right | Coffee | Americano | Hot 90 / Iced 100 | — |  |
| 1-right | Coffee | Piccolo Latte | 100 (hot only) | — |  |
| 1-right | Coffee | Cappuccino | Hot 110 / Iced 120 | — |  |
| 1-right | Coffee | Cafe Latte | Hot 110 / Iced 120 | — |  |
| 1-right | Coffee | Mocha | Hot 110 / Iced 120 | — |  |
| 1-right | Coffee | Flat White | 120 (hot only) | — |  |
| 1-right | Tea | English Breakfast Ceylon Tea | 110 | — |  |
| 1-right | Tea | Earl Grey Ceylon Tea | 110 | — |  |
| 1-right | Tea | Chamomille Herbal Infusion | 110 | — |  |
| 1-right | Tea | Pure Ceylon Green Tea | 110 | — |  |
| 1-right | Tea | Darjeeling Tea | 110 | — |  |
| 1-right | Tea | Mint Ceylon Tea | 110 | — |  |
| 1-right | Tea | Rose Ceylon Tea | 110 | — |  |
| 1-right | Coffee options (add) | Extra shot | 20 (+20 add-on) | — |  |
| 1-right | Coffee options (add) | Decaf blend | 20 (+20 add-on) | — |  |
| 1-right | Coffee options (add) | Almond milk | 20 (+20 add-on) | — |  |
| 1-right | Coffee options (add) | Soy milk | 20 (+20 add-on) | — |  |
| 1-right | Coffee options (add) | Macadamia Milk | 20 (+20 add-on) | — |  |

### Aperitivo — `source/menus/aperitivo.pdf`

Source: "Aperitivo, Everyday from 4pm to 7pm" (SEP 2025 print file).

| Page | Category | Item | Price (THB) | Tags | Notes |
|---|---|---|---|---|---|
| 1 | Aperitivo Board | Aperitivo Board | 990 | pork | ⚠ Menu has no dietary icons; pork tag derived from 'prosciutto & mortadella'. Confirm with Mozza. |
| 2 | Italian Cocktails | Anguria Gelato | 220 (220 each (stated once for the section)) | alcohol |  |
| 2 | Italian Cocktails | Fiore Rosso | 220 (220 each (stated once for the section)) | alcohol |  |
| 2 | Italian Cocktails | Il Sbagliato | 220 (220 each (stated once for the section)) | alcohol |  |
| 2 | Italian Cocktails | Luna Dorata | 220 (220 each (stated once for the section)) | alcohol |  |
| 2 | Mocktails | Elixir | 150 (150 each (stated once for the section)) | — |  |
| 2 | Mocktails | Apple Garden | 150 (150 each (stated once for the section)) | — |  |
| 2 | Mocktails | Fruity Berry | 150 (150 each (stated once for the section)) | — |  |
| 2 | Sparkling | Spumante Extra Dry Cuvée Blanche Ca'stele | 990 | alcohol |  |
| 2 | Wine by the Glass | Red Wine — Puglia IGT Primitivo | 199 | alcohol |  |
| 2 | Wine by the Glass | White Wine — Terre di Chieti IGT | 199 | alcohol |  |
| 2 | Draught Beer | Peroni (half pint) | 120 | alcohol |  |
| 2 | Draught Beer | Peroni (pint) | 200 | alcohol |  |

### Afternoon Tea — `source/menus/afternoon-tea.pdf`

Source: "Afternoon Tea, everyday from 2-5 pm, available exclusively at MOZZA Chidlom".

| Page | Category | Item | Price (THB) | Tags | Notes |
|---|---|---|---|---|---|
| 1 | Afternoon Tea Set | Afternoon Tea Set — with Tea or Coffee | 990 | — | ⚠ The PDF lists NO individual items for the set (only a photo of a tiered stand). Contents not transcribed; do not invent. |
| 1 | Afternoon Tea Set | Afternoon Tea Set — with Prosecco | 1,990 | alcohol | ⚠ The PDF lists NO individual items for the set. Alcohol tag from 'Prosecco' (named in the source). |

## Source-stated facts also available (not yet used on site)

- Brand line (food.pdf p.1): "MOZZA Trattoria Italiana"; web www.mozza-bangkok.com; Facebook @mozzabkk, Instagram @mozzabkk, LINE @hmagroup.
- Awards badges (p.1): Tripadvisor Travellers' Choice 2023, 2024, 2025; LSA Best Bites Awards 2026 "Best Pizza"; "Selected by Gambero Rosso — Top Italian Restaurants" (badge text; year/wording not stated).
- Locations list (p.2): EmQuartier G Floor, Siam Paragon G Floor, Central Chidlom 1st Floor, ICONSIAM G Floor, Central Park G Floor. Central Park blurb (p.2) mentions "beside Lumphini Park" and "direct BTS and MRT connections".
- Footer on every page: "Prices are subject to 10% service charge and 7% VAT".
