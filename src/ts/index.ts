/**
 * index.ts — EWS UI Template — FULL DESIGN SYSTEM SHOWCASE
 *
 * Covers every class in:
 *   base.css · animations.css · stripe-bar.css · components.css
 *   variants.css · hex-grid.css · hex-shape.css · status.css
 */

import "../styles/fonts.css";
import "../styles/index.css";

import { StripeBar } from "./StripeBar";
import { Card } from "./Card";
import { HexGrid } from "./HexGrid";

// ─── Root ─────────────────────────────────────────────────────────────────────

const root = document.getElementById("app");
if (!root) throw new Error("#app element not found");

// Page-level scanline + CRT line overlay (base.css backgroundline)
const bgLine = document.createElement("div");
bgLine.className = "backgroundline";
document.body.appendChild(bgLine);

// Page title stripe
const titleStripe = new StripeBar({ color: "red", loop: true, duration: 12 });
titleStripe.element.style.cssText = "width:100%;margin-bottom:32px;";
const titleLabel = document.createElement("div");
titleLabel.className = "ews-card-header-label";
const titleSpan = document.createElement("span");
titleSpan.className = "ews-title";
titleSpan.style.fontSize = "1rem";
titleSpan.textContent = "EWS UI — FULL DESIGN SYSTEM SHOWCASE";
titleLabel.appendChild(titleSpan);
titleStripe.element.style.position = "relative";
titleStripe.element.appendChild(titleLabel);
root.appendChild(titleStripe.element);

// ─────────────────────────────────────────────────────────────────────────────
// § 1. CARDS
// ─────────────────────────────────────────────────────────────────────────────

const cardSection = section("CARDS");
const cardRow = flexRow();

// Red stripe card
const card1 = new Card({
  title: "SEISMIC STATUS",
  borderColor: "red",
  stripeHeader: true,
});
const p1 = makeEl(
  "p",
  "ews-text",
  "All stations nominal. Last update 00:04:12.",
);
card1.setContent(p1);
card1.setFooter("BMKG / REALTIME FEED");
card1.element.style.maxWidth = "280px";
cardRow.appendChild(card1.element);

// Magnitude readout card
const card2 = new Card({ title: "MAGNITUDE", borderColor: "orange" });
const magEl = makeEl("p", "ews-text-digital ews-title", "6.4");
magEl.style.cssText = "font-size:3.5rem;text-align:center;padding:8px 0;";
card2.setContent(magEl);
card2.element.style.cssText = "max-width:180px;text-align:center;";
cardRow.appendChild(card2.element);

// Collapsible floating card (ews-card-float)
const card3 = new Card({
  title: "COLLAPSIBLE CARD",
  borderColor: "red",
  stripeHeader: true,
  collapsible: true,
  className: "ews-card-float open",
});
const p3 = makeEl(
  "p",
  "ews-text",
  "Click the header to collapse / expand. Uses .ews-card-float + .open.",
);
card3.setContent(p3);
card3.element.style.maxWidth = "280px";
cardRow.appendChild(card3.element);

cardSection.appendChild(cardRow);
root.appendChild(cardSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 2. STRIPE BARS
// ─────────────────────────────────────────────────────────────────────────────

const stripeSection = section("STRIPE BARS");

for (const [color, reverse, dur] of [
  ["orange", false, 10],
  ["red", true, 8],
] as Array<["orange" | "red", boolean, number]>) {
  const bar = new StripeBar({ color, loop: true, reverse, duration: dur });
  bar.element.style.cssText = "width:100%;margin-bottom:6px;";
  stripeSection.appendChild(bar.element);
}

root.appendChild(stripeSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 3. BORDERS
// ─────────────────────────────────────────────────────────────────────────────

const borderSection = section("BORDERS");
const borderRow = flexRow();

const borderDefs: Array<[string, string]> = [
  ["bordered", "BORDERED ORANGE"],
  ["bordered-red", "BORDERED RED"],
  ["bordered-red-bottom", "BOTTOM ONLY"],
  ["bordered-red-top", "TOP ONLY"],
];

borderDefs.forEach(([cls, txt]) => {
  const d = document.createElement("div");
  d.className = `${cls} ews-text`;
  d.style.cssText =
    "padding:10px 16px;font-size:0.65rem;min-width:120px;text-align:center;";
  d.textContent = txt;
  borderRow.appendChild(d);
});

borderSection.appendChild(borderRow);
root.appendChild(borderSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 4. BUTTONS
// ─────────────────────────────────────────────────────────────────────────────

const btnSection = section("BUTTONS");

// Size row
const sizeRow = flexRow("margin-bottom:10px;");
(["ews-btn-sm", "", "ews-btn-lg"] as string[]).forEach((sizeClass) => {
  const b = document.createElement("button");
  b.className = `ews-btn ews-btn-primary ${sizeClass}`.trim();
  b.textContent = sizeClass
    ? sizeClass.replace("ews-btn-", "").toUpperCase()
    : "DEFAULT";
  sizeRow.appendChild(b);
});
btnSection.appendChild(sizeRow);

// Variant row
const variantRow = flexRow();
const btnDefs: Array<[string, string]> = [
  ["ews-btn ews-btn-primary", "PRIMARY"],
  ["ews-btn ews-btn-danger", "DANGER"],
  ["ews-btn ews-btn-outline", "OUTLINE"],
  ["ews-btn ews-btn-outline-danger", "OUTLINE DANGER"],
  ["ews-btn ews-btn-ghost", "GHOST"],
  ["ews-btn ews-btn-alert", "ALERT PULSE"],
];

btnDefs.forEach(([cls, txt]) => {
  const b = document.createElement("button");
  b.className = cls;
  b.textContent = txt;
  variantRow.appendChild(b);
});

// Skewed button
const skewBtn = document.createElement("button");
skewBtn.className = "ews-btn ews-btn-skew";
const skewSpan = document.createElement("span");
skewSpan.textContent = "SKEWED";
skewBtn.appendChild(skewSpan);
variantRow.appendChild(skewBtn);

// Danger skew
const skewDanger = document.createElement("button");
skewDanger.className = "ews-btn ews-btn-skew danger";
const skewDSpan = document.createElement("span");
skewDSpan.textContent = "SKEW DANGER";
skewDanger.appendChild(skewDSpan);
variantRow.appendChild(skewDanger);

btnSection.appendChild(variantRow);
root.appendChild(btnSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 5. INPUTS, SELECTS, TEXTAREAS & TOGGLES
// ─────────────────────────────────────────────────────────────────────────────

const inputSection = section("INPUTS · SELECTS · TEXTAREAS · TOGGLES");

// Standard text inputs
const inputRow1 = flexRow("margin-bottom:10px;");
for (const [cls, ph] of [
  ["ews-input", "STATION ID"],
  ["ews-input danger", "ALERT VALUE"],
  ["ews-input digital", "00:04:27"],
]) {
  const inp = document.createElement("input") as HTMLInputElement;
  inp.className = cls;
  inp.placeholder = ph;
  inp.style.maxWidth = "200px";
  inputRow1.appendChild(inp);
}
inputSection.appendChild(inputRow1);

// Underline inputs
const inputRow2 = flexRow("margin-bottom:10px;");
for (const [cls, ph] of [
  ["ews-input underline", "UNDERLINE NORMAL"],
  ["ews-input underline danger", "UNDERLINE DANGER"],
]) {
  const inp = document.createElement("input") as HTMLInputElement;
  inp.className = cls;
  inp.placeholder = ph;
  inp.style.maxWidth = "220px";
  inputRow2.appendChild(inp);
}
inputSection.appendChild(inputRow2);

// Textareas
const inputRow3 = flexRow("margin-bottom:10px;align-items:flex-start;");
for (const [cls, ph] of [
  ["ews-textarea", "NORMAL TEXTAREA — TYPE HERE"],
  ["ews-textarea danger", "DANGER TEXTAREA — TYPE HERE"],
]) {
  const ta = document.createElement("textarea");
  ta.className = cls;
  ta.placeholder = ph;
  ta.style.maxWidth = "260px";
  inputRow3.appendChild(ta);
}
inputSection.appendChild(inputRow3);

// Selects + toggles
const inputRow4 = flexRow();
for (const [cls, opts] of [
  ["ews-select", ["MAGNITUDE", "DEPTH", "LOCATION"]],
  ["ews-select danger", ["ALERT LEVEL", "WARNING", "WATCH"]],
] as Array<[string, string[]]>) {
  const sel = document.createElement("select");
  sel.className = cls;
  sel.style.maxWidth = "180px";
  opts.forEach((o) => {
    const opt = document.createElement("option");
    opt.textContent = o;
    sel.appendChild(opt);
  });
  inputRow4.appendChild(sel);
}

for (const checked of [false, true]) {
  const lbl = document.createElement("label");
  lbl.className = "toggle-switch";
  lbl.innerHTML = `<input type="checkbox"${checked ? " checked" : ""}><span class="toggle-slider"></span>`;
  inputRow4.appendChild(lbl);
}
inputSection.appendChild(inputRow4);

root.appendChild(inputSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 6. TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────

const typoSection = section("TYPOGRAPHY");
const typoGrid = document.createElement("div");
typoGrid.style.cssText = "display:flex;flex-direction:column;gap:10px;";

const typoDefs: Array<[string, string]> = [
  ["ews-title", "EWS TITLE DISPLAY"],
  ["ews-label", "EWS LABEL"],
  ["ews-text", "BODY LABEL TEXT"],
  ["ews-text danger", "BODY DANGER TEXT"],
  ["ews-text ews-text-glow", "GLOW TEXT — ORANGE"],
  ["ews-text ews-text-glow danger", "GLOW TEXT — DANGER"],
  ["ews-text ews-text-blink", "BLINK TEXT — NORMAL"],
  ["ews-text ews-text-blink fast", "BLINK TEXT — FAST"],
  ["ews-text-digital", "DS-DIGITAL  00:04:27"],
  ["ews-text-digital danger", "DS-DIGITAL  DANGER  ERROR"],
  ["ews-text ews-text-underline", "UNDERLINED LABEL — ORANGE"],
  ["ews-text ews-text-underline danger", "UNDERLINED LABEL — DANGER"],
  ["text-glow", "TEXT GLOW — ORANGE"],
  ["text-glow-red", "TEXT GLOW — RED"],
  ["neon-glow ews-text", "NEON GLOW TEXT"],
  ["list-event", "LIST EVENT ITEM — FULL WIDTH ROW"],
];

typoDefs.forEach(([cls, txt]) => {
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = txt;
  typoGrid.appendChild(p);
});

typoSection.appendChild(typoGrid);
root.appendChild(typoSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 7. COLOR HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const colorSection = section("COLOR HELPERS");
const colorRow = flexRow();

const colorDefs: Array<[string, string]> = [
  ["bg-primary ews-text blackText", "BG PRIMARY"],
  ["bg-danger ews-text", "BG DANGER"],
  ["text-primary", "TEXT PRIMARY"],
  ["text-danger", "TEXT DANGER"],
  ["red-color ews-text", "RED COLOR"],
  ["red-bg ews-text", "RED BG"],
  ["red-border ews-text", "RED BORDER"],
];

colorDefs.forEach(([cls, txt]) => {
  const d = document.createElement("div");
  d.className = cls;
  d.style.cssText =
    "padding:8px 14px;font-size:0.65rem;font-family:'Roboto Condensed',sans-serif;text-transform:uppercase;letter-spacing:1px;";
  d.textContent = txt;
  colorRow.appendChild(d);
});

colorSection.appendChild(colorRow);
root.appendChild(colorSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 8. GLOW FILTER HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const glowSection = section("GLOW FILTER HELPERS");
const glowRow = flexRow();

const glowDefs: Array<[string, string]> = [
  ["glow-green", "GLOW GREEN"],
  ["glow-red", "GLOW RED"],
  ["glow-orange", "GLOW ORANGE"],
  ["glow-green-small", "GREEN SM"],
  ["glow-red-small", "RED SM"],
  ["glow-orange-small", "ORANGE SM"],
  ["glow-all", "GLOW ALL"],
];

glowDefs.forEach(([cls, txt]) => {
  const d = document.createElement("div");
  d.className = `ews-text ${cls}`;
  d.style.cssText =
    "padding:8px 12px;font-size:0.65rem;border:1px solid currentColor;";
  d.textContent = txt;
  glowRow.appendChild(d);
});

glowSection.appendChild(glowRow);
root.appendChild(glowSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 9. ANIMATION UTILITY CLASSES
// ─────────────────────────────────────────────────────────────────────────────

const animSection = section("ANIMATION UTILITY CLASSES");
const animGrid = document.createElement("div");
animGrid.style.cssText =
  "display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;";

const animDefs: Array<[string, string]> = [
  ["blink ews-text", "BLINK"],
  ["blink blink-fast ews-text", "BLINK FAST"],
  ["slide-in-left ews-text", "SLIDE IN LEFT"],
  ["fade-in ews-text", "FADE IN"],
  ["slide-fade-in ews-text", "SLIDE FADE IN"],
  ["slide-fade-in-flip ews-text", "SLIDE FADE IN FLIP"],
  ["vertical-reveal bordered ews-text", "VERTICAL REVEAL"],
  ["glow-effect bordered-red ews-text", "GLOW EFFECT (BOX)"],
  ["animation-delay-1 fade-in ews-text", "FADE IN DELAY 1s"],
  ["animation-delay-2 fade-in ews-text", "FADE IN DELAY 2s"],
  ["anim-duration-5 blink ews-text", "BLINK 5s DURATION"],
  ["animation-fast slide-in-left ews-text", "SLIDE FAST"],
];

animDefs.forEach(([cls, txt]) => {
  const d = document.createElement("div");
  d.className = cls;
  d.style.cssText = "padding:8px 12px;font-size:0.65rem;";
  d.textContent = txt;
  animGrid.appendChild(d);
});

animSection.appendChild(animGrid);
root.appendChild(animSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 10. PARALLELOGRAMS
// ─────────────────────────────────────────────────────────────────────────────

const paraSection = section("PARALLELOGRAMS");
const paraRow = flexRow();

const paraDefs: Array<[string, boolean]> = [
  ["JAKARTA", false],
  ["TSUNAMI RISK", true],
  ["MAGNITUDE 6.4", false],
  ["ALERT ZONE", true],
  ["STATION OK", false],
  ["EVACUATE NOW", true],
];

paraDefs.forEach(([txt, danger]) => {
  const wrap = document.createElement("div");
  wrap.className = `parallelogram${danger ? " danger" : ""}`;
  const p = document.createElement("p");
  p.textContent = txt;
  wrap.appendChild(p);
  paraRow.appendChild(wrap);
});

paraSection.appendChild(paraRow);
root.appendChild(paraSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 11. MARKERS / BADGES
// ─────────────────────────────────────────────────────────────────────────────

const markerSection = section("MARKERS · BADGES");
const markerRow = flexRow();

[
  "JAWA BARAT",
  "SULAWESI",
  "PAPUA",
  "KALIMANTAN",
  "SUMATRA",
  "MALUKU",
  "NTT",
].forEach((name) => {
  const m = document.createElement("span");
  m.className = "marker-daerah";
  m.textContent = name;
  markerRow.appendChild(m);
});

markerSection.appendChild(markerRow);
root.appendChild(markerSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 12. HEX GRID — FLAT-TOP
// ─────────────────────────────────────────────────────────────────────────────

const hexFlatSection = section("HEX GRID — FLAT TOP (.hex-grid-flat)");
const hexFlatGrid = document.createElement("div");
hexFlatGrid.className = "hex-grid-flat";
hexFlatGrid.style.maxWidth = "600px";

const flatStates = [
  "safe",
  "warn",
  "danger",
  "safe",
  "safe",
  "warn",
  "danger",
  "safe",
  "safe",
  "safe",
  "safe",
  "warn",
  "safe",
  "danger",
  "safe",
];

flatStates.forEach((state, i) => {
  const cell = document.createElement("div");
  cell.className = `hex-cell-flat hex-${state}`;

  const inner = document.createElement("div");
  inner.className = "hex-content";
  inner.innerHTML =
    `<span class="ews-text" style="font-size:0.5rem">${state.toUpperCase()}</span>` +
    `<span class="ews-text-digital" style="font-size:0.65rem">${String(i + 1).padStart(2, "0")}</span>`;
  cell.appendChild(inner);
  hexFlatGrid.appendChild(cell);
});

hexFlatSection.appendChild(hexFlatGrid);
root.appendChild(hexFlatSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 13. HEX GRID — HONEYCOMB POINTY (HexGrid engine)
// ─────────────────────────────────────────────────────────────────────────────

const hexPointySection = section("HEX GRID — HONEYCOMB POINTY (.hex-hive)");
const hexContainer = document.createElement("div");
hexContainer.style.cssText = "width:100%;max-width:480px;";

const pointyStates = [
  "OK",
  "WARN",
  "OK",
  "DANGER",
  "OK",
  "OK",
  "WARN",
  "OK",
  "OK",
  "OK",
  "OK",
  "DANGER",
];

pointyStates.forEach((state) => {
  const cell = document.createElement("div");
  cell.className = [
    "hex-hive bg-hex yellow",
    state === "DANGER" ? "hex-danger" : state === "WARN" ? "hex-warn" : "",
  ]
    .filter(Boolean)
    .join(" ");
  cell.innerHTML = `<span class="ews-text" style="font-size:0.55rem">${state}</span>`;
  hexContainer.appendChild(cell);
});

new HexGrid(hexContainer, { variant: "pointy" });
hexPointySection.appendChild(hexContainer);
root.appendChild(hexPointySection);

// ─────────────────────────────────────────────────────────────────────────────
// § 14. HEX STATUS CELLS
// ─────────────────────────────────────────────────────────────────────────────

const hexStatusSection = section("HEX STATUS CELLS (.hex-status-cell)");
const hexStatusRow = flexRow("align-items:center;gap:16px;");

const statusCellDefs: Array<[string, string, string]> = [
  ["hex-safe", "SAFE", "STA-01"],
  ["hex-warn", "WARN", "STA-02"],
  ["hex-caution", "CAUTION", "STA-03"],
  ["hex-danger", "ALERT", "STA-04"],
  ["hex-danger hex-pulse", "PULSE", "STA-05"],
];

statusCellDefs.forEach(([cls, lbl, sub]) => {
  const cell = document.createElement("div");
  cell.className = `hex-status-cell ${cls}`;
  const inner = document.createElement("div");
  inner.className = "hex-status-inner";
  inner.innerHTML =
    `<span class="ews-text" style="font-size:0.55rem;color:inherit">${lbl}</span>` +
    `<span class="ews-text-digital" style="font-size:0.6rem">${sub}</span>`;
  cell.appendChild(inner);
  hexStatusRow.appendChild(cell);
});

hexStatusSection.appendChild(hexStatusRow);
root.appendChild(hexStatusSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 15. HEX STRIPE CELLS
// ─────────────────────────────────────────────────────────────────────────────

const hexStripeSection = section("HEX STRIPE CELLS (.hex-stripe-cell)");
const hexStripeRow = flexRow("align-items:center;gap:16px;");

const stripeDefs: Array<["orange" | "red", string, boolean]> = [
  ["orange", "NORMAL", false],
  ["red", "DANGER", true],
];

stripeDefs.forEach(([color, lbl, isDanger]) => {
  const cell = document.createElement("div");
  cell.className = `hex-stripe-cell${isDanger ? " hex-danger" : ""}`;

  const bg = document.createElement("div");
  bg.className = "hex-stripe-bg";
  bg.style.position = "relative";

  // Stripe fills the background
  const stripeEl = new StripeBar({ color, loop: true, duration: 8 });
  stripeEl.element.style.cssText =
    "position:absolute;inset:0;width:200%;height:200%;pointer-events:none;opacity:0.7;";
  bg.appendChild(stripeEl.element);

  const content = document.createElement("div");
  content.className = "hex-stripe-content";
  content.innerHTML = `<span class="ews-text" style="font-size:0.55rem">${lbl}</span>`;
  bg.appendChild(content);
  cell.appendChild(bg);
  hexStripeRow.appendChild(cell);
});

hexStripeSection.appendChild(hexStripeRow);
root.appendChild(hexStripeSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 16. HEX SHAPES (hex-shape.css)
// ─────────────────────────────────────────────────────────────────────────────

const hexShapeSection = section("HEX SHAPES (.hex-shape)");
const hexShapeRow = flexRow("align-items:flex-start;gap:20px;");

const hexShapeDefs: Array<[string, string]> = [
  ["hex-shape", "RED\nPOINTY"],
  ["hex-shape orange", "ORANGE\nPOINTY"],
  ["hex-shape flat-top", "RED\nFLAT TOP"],
  ["hex-shape orange flat-top", "ORANGE\nFLAT TOP"],
];

hexShapeDefs.forEach(([cls, lbl]) => {
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "display:flex;flex-direction:column;align-items:center;gap:6px;";

  const shape = document.createElement("div");
  shape.className = cls;
  shape.style.cssText = "width:60px;";

  const labelEl = document.createElement("p");
  labelEl.className = "ews-text";
  labelEl.style.cssText = "font-size:0.5rem;text-align:center;white-space:pre;";
  labelEl.textContent = lbl;

  wrap.append(shape, labelEl);
  hexShapeRow.appendChild(wrap);
});

hexShapeSection.appendChild(hexShapeRow);
root.appendChild(hexShapeSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 17. STATUS NODES (status.css)
// ─────────────────────────────────────────────────────────────────────────────

const statusSection = section(
  "STATUS NODES (.status-node · .parent-node · .line-node)",
);

const ribWrap = document.createElement("div");
ribWrap.style.cssText =
  "display:flex;flex-direction:row;align-items:center;gap:0;flex-wrap:wrap;";

const nodeDefs: Array<[string, boolean, number]> = [
  ["STATION A", false, 0],
  ["STATION B", true, 1],
  ["STATION C", false, 2],
  ["STATION D", true, 3],
];

nodeDefs.forEach(([lbl, danger, i]) => {
  const isFlip = i % 2 === 1;

  const nodeWrap = document.createElement("div");
  nodeWrap.className = `node${isFlip ? " node-flip" : ""} slide-fade-in`;
  nodeWrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;animation-delay:${i * 0.12}s;`;

  const parent = document.createElement("div");
  parent.className = `parent-node${isFlip ? " flip" : ""}`;

  const sNode = document.createElement("div");
  sNode.className = `${isFlip ? "status-node-flip" : "status-node"}${danger ? " danger" : ""} ews-text`;
  sNode.style.cssText =
    "width:110px;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.5rem;";
  sNode.textContent = lbl;
  parent.appendChild(sNode);

  const lineNode = document.createElement("div");
  lineNode.className = "line-node";
  lineNode.style.cssText = "height:2px;background:var(--orange);";

  nodeWrap.append(parent, lineNode);
  ribWrap.appendChild(nodeWrap);
});

statusSection.appendChild(ribWrap);
root.appendChild(statusSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 18. LOADER & WAVE CIRCLES
// ─────────────────────────────────────────────────────────────────────────────

const loaderSection = section("LOADER · WAVE CIRCLES (.loader · .circles)");
const loaderRow = flexRow("align-items:center;gap:48px;");

// Loader
const loader = document.createElement("div");
loader.className = "loader";
const loaderLabel = document.createElement("p");
loaderLabel.className = "ews-text";
loaderLabel.style.cssText = "font-size:0.6rem;margin-top:8px;";
loaderLabel.textContent = ".loader";
const loaderWrap = document.createElement("div");
loaderWrap.style.cssText =
  "display:flex;flex-direction:column;align-items:center;gap:8px;";
loaderWrap.append(loader, loaderLabel);

// Circles wave
const circleHost = document.createElement("div");
circleHost.style.cssText = "position:relative;width:80px;height:80px;";
circleHost.innerHTML = `
  <div class="circles" style="width:80px;height:80px;">
    <div class="circle1" style="width:80px;height:80px;"></div>
    <div class="circle2" style="width:80px;height:80px;"></div>
    <div class="circle3" style="width:80px;height:80px;"></div>
  </div>`;
const circleLabel = document.createElement("p");
circleLabel.className = "ews-text";
circleLabel.style.cssText =
  "font-size:0.6rem;margin-top:8px;text-align:center;";
circleLabel.textContent = ".circles";
const circleWrap = document.createElement("div");
circleWrap.style.cssText =
  "display:flex;flex-direction:column;align-items:center;gap:8px;";
circleWrap.append(circleHost, circleLabel);

loaderRow.append(loaderWrap, circleWrap);
loaderSection.appendChild(loaderRow);
root.appendChild(loaderSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 19. SCANLINE · NEON BOX · NEON TEXT · TEXT-TIME
// ─────────────────────────────────────────────────────────────────────────────

const miscSection = section("MISC EFFECTS — SCANLINE · NEON · TEXT-TIME");
const miscRow = flexRow("flex-wrap:wrap;align-items:stretch;gap:12px;");

// Scanline box
const scanBox = document.createElement("div");
scanBox.className = "scanline bordered";
scanBox.style.cssText = "position:relative;padding:16px 20px;overflow:hidden;";
const scanText = document.createElement("p");
scanText.className = "ews-text";
scanText.textContent = "SCANLINE EFFECT (.scanline)";
scanBox.appendChild(scanText);

// Neon box + glow text
const neonBox = document.createElement("div");
neonBox.className = "neon-box bordered";
neonBox.style.cssText = "padding:16px 20px;";
const neonText = document.createElement("p");
neonText.className = "ews-text neon-glow";
neonText.textContent = "NEON BOX + NEON GLOW TEXT";
neonBox.appendChild(neonText);

// DS-Digital time
const textTimeEl = document.createElement("p");
textTimeEl.className = "text-time ews-text-digital";
textTimeEl.style.cssText = "font-size:2rem;display:flex;align-items:center;";
textTimeEl.textContent = "12:34:56";
// Keep it ticking
setInterval(() => {
  textTimeEl.textContent = new Date().toLocaleTimeString("en-GB");
}, 1000);

miscRow.append(scanBox, neonBox, textTimeEl);
miscSection.appendChild(miscRow);
root.appendChild(miscSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 20. SETTINGS MODAL (in-page, not overlay)
// ─────────────────────────────────────────────────────────────────────────────

const settingsSection = section(
  "SETTINGS MODAL (.settings-modal · .settings-item · .toggle-switch)",
);

const settingsCard = document.createElement("div");
settingsCard.className = "settings-modal bordered";
settingsCard.style.cssText = "max-width:400px;padding:16px;";

const settingsTitle = makeEl("p", "ews-text", "SYSTEM SETTINGS");
settingsTitle.style.cssText =
  "margin-bottom:14px;font-size:0.8rem;letter-spacing:2px;";
settingsCard.appendChild(settingsTitle);

const settingItems: Array<[string, boolean]> = [
  ["REAL-TIME FEED", true],
  ["ALERT SOUND", false],
  ["AUTO REFRESH", true],
  ["DARK SCANLINES", true],
  ["DEBUG MODE", false],
];

settingItems.forEach(([lbl, checked]) => {
  const item = document.createElement("div");
  item.className = "settings-item";

  const span = document.createElement("span");
  span.className = "ews-text";
  span.style.fontSize = "0.7rem";
  span.textContent = lbl;

  const toggle = document.createElement("label");
  toggle.className = "toggle-switch";
  toggle.innerHTML = `<input type="checkbox"${checked ? " checked" : ""}><span class="toggle-slider"></span>`;

  item.append(span, toggle);
  settingsCard.appendChild(item);
});

settingsSection.appendChild(settingsCard);
root.appendChild(settingsSection);

// ─────────────────────────────────────────────────────────────────────────────
// § 21. OVERLAY BACKGROUND (swatch)
// ─────────────────────────────────────────────────────────────────────────────

const overlaySection = section("OVERLAY BG (.overlay-bg)");
const overlayRow = flexRow();

const overlayBox = document.createElement("div");
overlayBox.className = "overlay-bg bordered";
overlayBox.style.cssText = "padding:20px 24px;";
const overlayText = makeEl(
  "p",
  "ews-text",
  "CONTENT ON .overlay-bg — rgba(0,0,0,0.8) dark glass",
);
overlayBox.appendChild(overlayText);
overlayRow.appendChild(overlayBox);
overlaySection.appendChild(overlayRow);
root.appendChild(overlaySection);

// ─────────────────────────────────────────────────────────────────────────────
// Footer stripe
// ─────────────────────────────────────────────────────────────────────────────

const footerStripe = new StripeBar({
  color: "orange",
  loop: true,
  duration: 15,
});
footerStripe.element.style.cssText = "width:100%;margin-top:32px;";
root.appendChild(footerStripe.element);

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function section(title: string): HTMLElement {
  const wrap = document.createElement("section");
  wrap.style.cssText = "margin-bottom:56px;";

  const header = document.createElement("div");
  header.style.cssText =
    "margin-bottom:18px;padding-bottom:6px;border-bottom:1px solid var(--orange);display:flex;align-items:center;gap:12px;";

  const label = document.createElement("h2");
  label.className = "ews-text";
  label.style.fontSize = "0.65rem";
  label.textContent = `// ${title}`;
  header.appendChild(label);
  wrap.appendChild(header);
  return wrap;
}

function flexRow(extraCss = ""): HTMLDivElement {
  const r = document.createElement("div");
  r.style.cssText = `display:flex;flex-wrap:wrap;gap:10px;align-items:center;${extraCss}`;
  return r;
}

function makeEl(tag: string, cls: string, text: string): HTMLElement {
  const e = document.createElement(tag) as HTMLElement;
  e.className = cls;
  e.textContent = text;
  return e;
}
