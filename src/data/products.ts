export type Category = "men" | "women" | "luxury" | "smart" | "sports";

export type Product = {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  collection: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  colors: string[];
  straps: string[];
  movement: string;
  caseMaterial: string;
  caseSize: string;
  waterResistance: string;
  warranty: string;
  description: string;
  featured: boolean;
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const PHOTOS = [
  "photo-1524592094714-0f0654e20314",
  "photo-1523275335684-37898b6baf30",
  "photo-1508057198894-247b23fe5ade",
  "photo-1547996160-81dfa63595aa",
  "photo-1533139502658-0198f920d8e8",
  "photo-1434056886845-dac89ffe9b56",
  "photo-1622434641406-a158123450f9",
  "photo-1587836374828-4dbafa94cf0e",
  "photo-1548169874-53e85f753f1e",
  "photo-1495856458515-0637185db551",
  "photo-1526045431048-f857369baa09",
  "photo-1610694955371-d4a3e0f4182c",
  "photo-1611591437281-460bfbe1220a",
  "photo-1600003014755-ba31aa59c4b6",
  "photo-1594534475808-b18fc33b045e",
  "photo-1539874754764-5a96559165b0",
  "photo-1533139143976-30918502365b",
  "photo-1445205170230-053b83016050",
  "photo-1533563906091-fdfdffc3e3c4",
  "photo-1509048191080-d2984bad6ae5",
];

type Row = {
  n: string; // name
  b: string; // brand
  c: Category;
  col: string; // collection
  p: number; // sale price
  o: number; // original
  r: number; // rating
  rv: number; // reviews
  s: number; // stock
  mv: string;
  cm: string;
  cs: string;
  wr: string;
  cl: string[];
  st: string[];
  d: string;
  f?: boolean;
};

const rows: Row[] = [
  // ---------------- Men's ----------------
  { n: "Meridian Classic 40", b: "Aurevia Atelier", c: "men", col: "Meridian", p: 12499, o: 17999, r: 4.7, rv: 214, s: 18, mv: "Japanese Automatic", cm: "Brushed Stainless Steel", cs: "40mm", wr: "5 ATM", cl: ["Midnight Blue", "Silver", "Graphite"], st: ["Leather", "Steel Bracelet"], d: "A restrained dress companion with a sunburst dial, applied indices and a domed sapphire crystal that softens every reflection.", f: true },
  { n: "Regent Chronograph 42", b: "Aurevia Atelier", c: "men", col: "Regent", p: 18999, o: 26499, r: 4.8, rv: 341, s: 12, mv: "Quartz Chronograph", cm: "Polished Steel", cs: "42mm", wr: "10 ATM", cl: ["Slate", "Champagne", "Black"], st: ["Steel Bracelet", "Rubber"], d: "Three sub-dials, a tachymeter bezel and a razor-thin seconds hand built for men who measure everything." },
  { n: "Harbour Skeleton 41", b: "Kensford", c: "men", col: "Harbour", p: 21999, o: 29999, r: 4.6, rv: 128, s: 9, mv: "Automatic Skeleton", cm: "Rose Gold PVD", cs: "41mm", wr: "5 ATM", cl: ["Rose Gold", "Gunmetal"], st: ["Leather", "Mesh"], d: "An open-worked movement framed by a rose gold case, letting the escapement breathe on both sides." },
  { n: "Vantage Field 39", b: "Northmark", c: "men", col: "Vantage", p: 8499, o: 11999, r: 4.5, rv: 402, s: 34, mv: "Japanese Quartz", cm: "Sandblasted Steel", cs: "39mm", wr: "5 ATM", cl: ["Olive", "Sand", "Black"], st: ["Canvas", "Leather"], d: "A field watch with luminous numerals, a soft-iron inner cage and canvas strap that ages beautifully." },
  { n: "Ashford Slim 38", b: "Aurevia Atelier", c: "men", col: "Ashford", p: 9999, o: 13999, r: 4.4, rv: 187, s: 26, mv: "Swiss Quartz", cm: "Yellow Gold Plated", cs: "38mm", wr: "3 ATM", cl: ["Ivory", "Gold", "Charcoal"], st: ["Leather"], d: "Only 6.8mm thick, made to disappear under a cuff and reappear exactly when it matters." },
  { n: "Corsair GMT 43", b: "Kensford", c: "men", col: "Corsair", p: 24999, o: 33999, r: 4.9, rv: 96, s: 7, mv: "Automatic GMT", cm: "316L Steel", cs: "43mm", wr: "20 ATM", cl: ["Blue/Black", "Black", "Steel"], st: ["Steel Bracelet", "Rubber"], d: "A true second time-zone hand and 120-click bezel for travellers who never fully land." },
  { n: "Sterling Moonphase 40", b: "Verrone", c: "men", col: "Sterling", p: 27999, o: 38999, r: 4.8, rv: 74, s: 6, mv: "Automatic Moonphase", cm: "Stainless Steel", cs: "40mm", wr: "5 ATM", cl: ["Navy", "Silver"], st: ["Leather", "Steel Bracelet"], d: "A hand-finished moonphase aperture with an aventurine sky and a 122-year accuracy cycle." },
  { n: "Anchor Diver 42", b: "Northmark", c: "men", col: "Anchor", p: 15999, o: 21999, r: 4.6, rv: 233, s: 21, mv: "Automatic", cm: "Steel with Ceramic Bezel", cs: "42mm", wr: "30 ATM", cl: ["Deep Green", "Black", "Blue"], st: ["Steel Bracelet", "Rubber"], d: "300m of water resistance, a screw-down crown and lume that outlasts the dive." },
  { n: "Barrister Roman 39", b: "Verrone", c: "men", col: "Barrister", p: 7499, o: 10499, r: 4.3, rv: 158, s: 40, mv: "Japanese Quartz", cm: "Polished Steel", cs: "39mm", wr: "3 ATM", cl: ["White", "Black"], st: ["Leather"], d: "Roman numerals, a railway minute track and blued hands — formal dressing, distilled." },

  // ---------------- Women's ----------------
  { n: "Lumière Petite 32", b: "Aurevia Atelier", c: "women", col: "Lumière", p: 10999, o: 15499, r: 4.8, rv: 276, s: 23, mv: "Swiss Quartz", cm: "Rose Gold Steel", cs: "32mm", wr: "3 ATM", cl: ["Rose Gold", "Pearl", "Blush"], st: ["Mesh", "Leather"], d: "A mother-of-pearl dial set with twelve hand-placed crystal indices on a whisper-light mesh bracelet.", f: true },
  { n: "Ivory Bloom 34", b: "Verrone", c: "women", col: "Bloom", p: 12999, o: 18499, r: 4.7, rv: 149, s: 16, mv: "Swiss Quartz", cm: "Stainless Steel", cs: "34mm", wr: "5 ATM", cl: ["Ivory", "Champagne"], st: ["Leather", "Steel Bracelet"], d: "An engraved floral guilloché dial that catches light differently from every angle." },
  { n: "Aurelia Bangle 28", b: "Aurevia Atelier", c: "women", col: "Aurelia", p: 8999, o: 12999, r: 4.5, rv: 311, s: 30, mv: "Japanese Quartz", cm: "Gold Plated Brass", cs: "28mm", wr: "3 ATM", cl: ["Gold", "Silver"], st: ["Bangle Cuff"], d: "Half jewellery, half timepiece — a solid cuff that closes with a satisfying click." },
  { n: "Serene Mesh 33", b: "Kensford", c: "women", col: "Serene", p: 6999, o: 9999, r: 4.4, rv: 421, s: 45, mv: "Japanese Quartz", cm: "Brushed Steel", cs: "33mm", wr: "3 ATM", cl: ["Silver", "Rose Gold", "Black"], st: ["Mesh"], d: "A minimal dial with no numerals at all — just two slim hands and a lot of restraint." },
  { n: "Celeste Diamond 30", b: "Verrone", c: "women", col: "Celeste", p: 29999, o: 41999, r: 4.9, rv: 63, s: 5, mv: "Swiss Quartz", cm: "18k Gold Plated Steel", cs: "30mm", wr: "3 ATM", cl: ["Gold", "Pearl White"], st: ["Steel Bracelet"], d: "Twenty-four brilliant-cut stones ring a mother-of-pearl dial for occasions that deserve it." },
  { n: "Marisol Square 30", b: "Northmark", c: "women", col: "Marisol", p: 9499, o: 13499, r: 4.3, rv: 138, s: 28, mv: "Japanese Quartz", cm: "Polished Steel", cs: "30mm", wr: "3 ATM", cl: ["Black", "Nude", "Ivory"], st: ["Leather"], d: "A softly squared case in the art-deco tradition, worn close on a slim calf-leather strap." },
  { n: "Odette Two-Tone 34", b: "Aurevia Atelier", c: "women", col: "Odette", p: 14999, o: 20999, r: 4.6, rv: 192, s: 19, mv: "Swiss Quartz", cm: "Two-Tone Steel & Gold", cs: "34mm", wr: "5 ATM", cl: ["Two-Tone", "Silver"], st: ["Steel Bracelet"], d: "Gold centre links against brushed steel — the classic boardroom two-tone, rebalanced." },
  { n: "Elara Ultra Slim 31", b: "Kensford", c: "women", col: "Elara", p: 5999, o: 8499, r: 4.2, rv: 356, s: 52, mv: "Japanese Quartz", cm: "Stainless Steel", cs: "31mm", wr: "3 ATM", cl: ["Tan", "Black", "White"], st: ["Leather"], d: "Our lightest women's watch at 4.9mm — the everyday piece you forget you're wearing." },

  // ---------------- Luxury ----------------
  { n: "Imperial Tourbillon 41", b: "Aurevia Maison", c: "luxury", col: "Imperial", p: 49999, o: 68999, r: 5, rv: 41, s: 3, mv: "Hand-Wound Tourbillon", cm: "Rose Gold PVD on Steel", cs: "41mm", wr: "3 ATM", cl: ["Rose Gold", "Obsidian"], st: ["Alligator-Grain Leather"], d: "A flying tourbillon at six o'clock, hand-assembled over 40 hours and finished with Côtes de Genève.", f: true },
  { n: "Sovereign Perpetual 40", b: "Verrone Prestige", c: "luxury", col: "Sovereign", p: 46999, o: 62999, r: 4.9, rv: 52, s: 4, mv: "Automatic Perpetual Calendar", cm: "Solid Steel, Polished", cs: "40mm", wr: "5 ATM", cl: ["Silver", "Midnight"], st: ["Leather", "Steel Bracelet"], d: "Day, date, month and leap year — set once and it keeps its own counsel until 2100." },
  { n: "Monarch Gold 39", b: "Aurevia Maison", c: "luxury", col: "Monarch", p: 42999, o: 57999, r: 4.8, rv: 88, s: 5, mv: "Swiss Automatic", cm: "18k Gold Plated", cs: "39mm", wr: "3 ATM", cl: ["Gold", "Champagne"], st: ["Leather"], d: "A champagne dial under box sapphire, with a gold-toned rotor visible through the exhibition back." },
  { n: "Noir Ceramic 42", b: "Verrone Prestige", c: "luxury", col: "Noir", p: 38999, o: 51999, r: 4.7, rv: 117, s: 8, mv: "Swiss Automatic", cm: "Matte Black Ceramic", cs: "42mm", wr: "10 ATM", cl: ["Matte Black", "Gunmetal"], st: ["Rubber", "Ceramic Bracelet"], d: "Scratch-proof ceramic in full blackout, with gold-tipped hands as the only concession to shine." },
  { n: "Heritage 1948 Reissue 38", b: "Kensford Heritage", c: "luxury", col: "Heritage", p: 34999, o: 46999, r: 4.9, rv: 69, s: 6, mv: "Hand-Wound Mechanical", cm: "Stainless Steel", cs: "38mm", wr: "3 ATM", cl: ["Cream", "Sepia"], st: ["Vintage Leather"], d: "A faithful reissue of a 1948 pilot's reference, down to the domed acrylic-look crystal profile." },
  { n: "Aurum Skeleton Royale 40", b: "Aurevia Maison", c: "luxury", col: "Aurum", p: 44999, o: 59999, r: 4.8, rv: 47, s: 4, mv: "Automatic Skeleton", cm: "Gold PVD Steel", cs: "40mm", wr: "5 ATM", cl: ["Gold", "Rose Gold"], st: ["Leather", "Steel Bracelet"], d: "Every bridge is chamfered by hand and gold-plated before assembly — architecture you can wear." },
  { n: "Emperor Chronometer 41", b: "Verrone Prestige", c: "luxury", col: "Emperor", p: 39999, o: 54999, r: 4.7, rv: 95, s: 7, mv: "COSC-Style Automatic", cm: "Titanium", cs: "41mm", wr: "10 ATM", cl: ["Titanium Grey", "Blue"], st: ["Titanium Bracelet"], d: "Grade-5 titanium, 42% lighter than steel, regulated in five positions before it leaves the bench." },

  // ---------------- Smart ----------------
  { n: "Aurevia Pulse S1", b: "Aurevia Tech", c: "smart", col: "Pulse", p: 16999, o: 22999, r: 4.6, rv: 508, s: 40, mv: "Smart Digital", cm: "Aluminium Alloy", cs: "45mm", wr: "5 ATM", cl: ["Midnight", "Starlight", "Gold"], st: ["Silicone", "Milanese Loop"], d: "An AMOLED always-on display, ECG-grade heart sensor and 12-day battery in a 9.2mm case.", f: true },
  { n: "Aurevia Pulse S1 Pro", b: "Aurevia Tech", c: "smart", col: "Pulse", p: 24999, o: 32999, r: 4.8, rv: 289, s: 22, mv: "Smart Digital", cm: "Titanium", cs: "47mm", wr: "10 ATM", cl: ["Titanium", "Black"], st: ["Fluoroelastomer", "Titanium Link"], d: "Dual-band GPS, offline maps and a sapphire display for people whose commute involves altitude." },
  { n: "Northmark Trace Fit", b: "Northmark", c: "smart", col: "Trace", p: 7999, o: 11499, r: 4.3, rv: 764, s: 60, mv: "Smart Digital", cm: "Polycarbonate", cs: "42mm", wr: "5 ATM", cl: ["Black", "Navy", "Coral"], st: ["Silicone"], d: "Sleep staging, SpO2 and 100+ workout modes with a fortnight between charges." },
  { n: "Kensford Hybrid H2", b: "Kensford", c: "smart", col: "Hybrid", p: 13999, o: 19499, r: 4.5, rv: 176, s: 18, mv: "Hybrid Mechanical-Smart", cm: "Brushed Steel", cs: "42mm", wr: "5 ATM", cl: ["Steel", "Charcoal"], st: ["Leather", "Steel Bracelet"], d: "Real hands over a hidden e-ink sub-dial — notifications without ever looking like a gadget." },
  { n: "Aurevia Pulse Lite", b: "Aurevia Tech", c: "smart", col: "Pulse", p: 9499, o: 13999, r: 4.4, rv: 612, s: 55, mv: "Smart Digital", cm: "Aluminium Alloy", cs: "41mm", wr: "3 ATM", cl: ["Silver", "Rose Gold", "Black"], st: ["Silicone", "Mesh"], d: "The essentials done properly: bright display, honest step tracking, and a 30g wrist presence." },
  { n: "Verrone Connect Elite", b: "Verrone", c: "smart", col: "Connect", p: 21999, o: 29999, r: 4.6, rv: 143, s: 14, mv: "Smart Digital", cm: "Stainless Steel", cs: "44mm", wr: "5 ATM", cl: ["Gold", "Graphite"], st: ["Leather", "Milanese Loop"], d: "A dress smartwatch with a rotating crown, LTE calling and a genuinely elegant analogue face." },
  { n: "Northmark Trace Kids", b: "Northmark", c: "smart", col: "Trace", p: 4999, o: 7499, r: 4.2, rv: 398, s: 70, mv: "Smart Digital", cm: "Reinforced Resin", cs: "38mm", wr: "3 ATM", cl: ["Sky Blue", "Coral", "Mint"], st: ["Silicone"], d: "Location sharing, an SOS button and a battery that survives a whole school week." },

  // ---------------- Sports ----------------
  { n: "Summit Altimeter 46", b: "Northmark", c: "sports", col: "Summit", p: 19999, o: 27499, r: 4.8, rv: 154, s: 11, mv: "Digital Multi-Sensor", cm: "Fibre-Reinforced Polymer", cs: "46mm", wr: "10 ATM", cl: ["Slate", "Volcanic Red"], st: ["Silicone"], d: "Barometer, altimeter and compass in one, with a storm alert that has saved a few weekends." },
  { n: "Velocity Racer 43", b: "Kensford", c: "sports", col: "Velocity", p: 14499, o: 19999, r: 4.6, rv: 208, s: 20, mv: "Quartz Chronograph", cm: "Steel with Carbon Bezel", cs: "43mm", wr: "10 ATM", cl: ["Racing Red", "Black", "Blue"], st: ["Perforated Leather", "Rubber"], d: "A motorsport chronograph with perforated leather and a 1/10th-second counter." },
  { n: "Aqualine Pro Diver 44", b: "Verrone", c: "sports", col: "Aqualine", p: 22999, o: 30999, r: 4.9, rv: 131, s: 9, mv: "Automatic", cm: "Steel with Helium Valve", cs: "44mm", wr: "30 ATM", cl: ["Ocean Blue", "Black"], st: ["Rubber", "Steel Bracelet"], d: "Saturation-diving credentials: helium escape valve, 3mm crystal, and a fully lumed bezel." },
  { n: "Marathon Runner 42", b: "Northmark", c: "sports", col: "Marathon", p: 8999, o: 12999, r: 4.4, rv: 287, s: 36, mv: "Digital Quartz", cm: "Lightweight Resin", cs: "42mm", wr: "10 ATM", cl: ["Neon Yellow", "Black", "White"], st: ["Silicone"], d: "Fifty-lap memory, interval timers and 38 grams total — built to be forgotten mid-race." },
  { n: "Ridgeline Titanium 45", b: "Kensford", c: "sports", col: "Ridgeline", p: 26999, o: 35999, r: 4.8, rv: 78, s: 8, mv: "Solar Automatic Hybrid", cm: "Grade-5 Titanium", cs: "45mm", wr: "20 ATM", cl: ["Titanium Grey", "Forest"], st: ["Titanium Bracelet", "NATO Nylon"], d: "A titanium expedition watch with a sapphire compass bezel and no plastic anywhere on it." },
  { n: "Endurance Field Solar 40", b: "Verrone", c: "sports", col: "Endurance", p: 10499, o: 14999, r: 4.5, rv: 199, s: 31, mv: "Solar Quartz", cm: "Sandblasted Steel", cs: "40mm", wr: "10 ATM", cl: ["Khaki", "Black"], st: ["NATO Nylon", "Leather"], d: "Six months of running time from a single afternoon of daylight." },
  { n: "Cadence Cycling 41", b: "Northmark", c: "sports", col: "Cadence", p: 12999, o: 17999, r: 4.4, rv: 112, s: 24, mv: "Digital Quartz", cm: "Aluminium", cs: "41mm", wr: "5 ATM", cl: ["Signal Orange", "Graphite"], st: ["Silicone"], d: "Cadence tracking, a gradient display and a strap that dries before the ride is over." },

  // ---------------- Additional across categories ----------------
  { n: "Clarendon Day-Date 40", b: "Kensford", c: "men", col: "Clarendon", p: 16499, o: 22999, r: 4.5, rv: 167, s: 17, mv: "Automatic", cm: "Stainless Steel", cs: "40mm", wr: "5 ATM", cl: ["Silver", "Blue", "Black"], st: ["Steel Bracelet", "Leather"], d: "A full day-and-date window pair under a cyclops lens, on a five-link president bracelet." },
  { n: "Sable Minimal 40", b: "Aurevia Atelier", c: "men", col: "Sable", p: 6499, o: 9499, r: 4.2, rv: 254, s: 48, mv: "Japanese Quartz", cm: "Matte Black Steel", cs: "40mm", wr: "3 ATM", cl: ["Black", "Slate"], st: ["Leather", "Mesh"], d: "No date, no logo clutter — a blacked-out dial with a single gold second hand." },
  { n: "Belmont Rose 32", b: "Verrone", c: "women", col: "Belmont", p: 11499, o: 15999, r: 4.6, rv: 205, s: 21, mv: "Swiss Quartz", cm: "Rose Gold Steel", cs: "32mm", wr: "5 ATM", cl: ["Rose Gold", "Blush"], st: ["Steel Bracelet", "Leather"], d: "A softly fluted bezel that borrows from fine jewellery and behaves like a daily watch." },
  { n: "Nova Ceramic White 34", b: "Kensford", c: "women", col: "Nova", p: 17999, o: 24499, r: 4.7, rv: 91, s: 13, mv: "Swiss Quartz", cm: "White Ceramic", cs: "34mm", wr: "5 ATM", cl: ["Pearl White", "Ivory"], st: ["Ceramic Bracelet"], d: "High-gloss white ceramic that stays bright — it does not yellow and it does not scratch." },
  { n: "Vertex Carbon 44", b: "Verrone", c: "sports", col: "Vertex", p: 23999, o: 31999, r: 4.7, rv: 86, s: 10, mv: "Automatic", cm: "Forged Carbon Composite", cs: "44mm", wr: "20 ATM", cl: ["Carbon Black", "Carbon Blue"], st: ["Rubber"], d: "Each forged carbon case has a unique marbled grain — no two are the same." },
  { n: "Astral Moon Lady 33", b: "Aurevia Maison", c: "luxury", col: "Astral", p: 32999, o: 44999, r: 4.8, rv: 58, s: 5, mv: "Swiss Automatic Moonphase", cm: "Rose Gold Plated Steel", cs: "33mm", wr: "3 ATM", cl: ["Rose Gold", "Pearl"], st: ["Alligator-Grain Leather"], d: "A star-set aventurine moonphase for the wrist, scaled precisely for a smaller case." },
];

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const products: Product[] = rows.map((r, i) => ({
  id: slug(r.n),
  sku: `AUR-${r.c.toUpperCase().slice(0, 3)}-${String(1000 + i * 7)}`,
  name: r.n,
  brand: r.b,
  category: r.c,
  collection: r.col,
  price: r.p,
  originalPrice: r.o,
  discount: Math.round(((r.o - r.p) / r.o) * 100),
  rating: r.r,
  reviews: r.rv,
  stock: r.s,
  image: IMG(PHOTOS[i % PHOTOS.length]!),
  colors: r.cl,
  straps: r.st,
  movement: r.mv,
  caseMaterial: r.cm,
  caseSize: r.cs,
  waterResistance: r.wr,
  warranty: r.c === "luxury" ? "5 Years International Warranty" : "2 Years International Warranty",
  description: r.d,
  featured: r.f ?? false,
}));

export const categoryMeta: Record<
  Category,
  { title: string; label: string; path: string; blurb: string }
> = {
  men: {
    title: "Men's Watches",
    label: "Men",
    path: "/men",
    blurb: "Dress classics, chronographs and divers engineered for a lifetime of wear.",
  },
  women: {
    title: "Women's Watches",
    label: "Women",
    path: "/women",
    blurb: "Refined proportions, mother-of-pearl dials and jewellery-grade finishing.",
  },
  luxury: {
    title: "Luxury Watches",
    label: "Luxury",
    path: "/luxury",
    blurb: "Hand-finished complications from the Aurevia Maison workshops.",
  },
  smart: {
    title: "Smart Watches",
    label: "Smart",
    path: "/smart",
    blurb: "Connected timekeeping that still looks like a watch.",
  },
  sports: {
    title: "Sports Watches",
    label: "Sports",
    path: "/sports",
    blurb: "Solar, titanium and dive-rated instruments for the outdoors.",
  },
};

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const formatPKR = (n: number) =>
  `₨${Math.round(n).toLocaleString("en-PK")}`;
