/**
 * index.ts — EWS UI Template entry point
 *
 * Imports all styles and wires up the showcase demo.
 * Replace / extend the demo section with your own app code.
 */

import "../styles/fonts.css";
import "../styles/index.css";

import { StripeBar } from "./StripeBar";
import { Card } from "./Card";
import { HexGrid } from "./HexGrid";

// ─── Demo: build the showcase page ───────────────────────────────────────────

const root = document.getElementById("app");
if (!root) throw new Error("#app element not found");

// ── Section: Cards ────────────────────────────────────────────────────────────

const cardSection = section("CARDS");

// Normal card with stripe header
const card1 = new Card({
  title: "SEISMIC STATUS",
  borderColor: "red",
  stripeHeader: true,
});
const p1 = document.createElement("p");
p1.className = "ews-text";
p1.textContent = "All stations nominal. Last update 00:04:12.";
card1.setContent(p1);
card1.setFooter("BMKG / REALTIME FEED");
card1.element.style.maxWidth = "320px";
cardSection.appendChild(card1.element);

// Orange-bordered card
const card2 = new Card({ title: "MAGNITUDE READOUT", borderColor: "orange" });
const digital = document.createElement("p");
digital.className = "ews-text-digital ews-title";
digital.textContent = "6.4";
digital.style.fontSize = "3rem";
card2.setContent(digital);
card2.element.style.maxWidth = "200px";
card2.element.style.textAlign = "center";
cardSection.appendChild(card2.element);

root.appendChild(cardSection);

// ── Section: Stripe Bars ──────────────────────────────────────────────────────

const stripeSection = section("STRIPE BARS");

const orangeStripe = new StripeBar({ color: "orange", loop: true, duration: 10 });
orangeStripe.element.style.width = "100%";
orangeStripe.element.style.marginBottom = "8px";
stripeSection.appendChild(orangeStripe.element);

const redStripe = new StripeBar({ color: "red", loop: true, reverse: true, duration: 8 });
redStripe.element.style.width = "100%";
stripeSection.appendChild(redStripe.element);

root.appendChild(stripeSection);

// ── Section: Buttons ─────────────────────────────────────────────────────────

const btnSection = section("BUTTONS");
const btns: Array<[string, string]> = [
  ["ews-btn ews-btn-primary", "PRIMARY"],
  ["ews-btn ews-btn-danger", "DANGER"],
  ["ews-btn ews-btn-outline", "OUTLINE"],
  ["ews-btn ews-btn-outline-danger", "OUTLINE DANGER"],
  ["ews-btn ews-btn-ghost", "GHOST"],
  ["ews-btn ews-btn-alert", "ALERT PULSE"],
  ["ews-btn ews-btn-primary ews-btn-skew", "SKEWED"],
];

const btnRow = document.createElement("div");
btnRow.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;align-items:center;";

btns.forEach(([cls, label]) => {
  const btn = document.createElement("button");
  btn.className = cls;
  if (cls.includes("skew")) {
    const span = document.createElement("span");
    span.textContent = label;
    btn.appendChild(span);
  } else {
    btn.textContent = label;
  }
  btnRow.appendChild(btn);
});

btnSection.appendChild(btnRow);
root.appendChild(btnSection);

// ── Section: Inputs ───────────────────────────────────────────────────────────

const inputSection = section("INPUTS");
const inputRow = document.createElement("div");
inputRow.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;align-items:center;";

const inp = document.createElement("input");
inp.className = "ews-input";
inp.placeholder = "STATION ID";

const inpDanger = document.createElement("input");
inpDanger.className = "ews-input danger";
inpDanger.placeholder = "ALERT VALUE";

const sel = document.createElement("select");
sel.className = "ews-select";
["MAGNITUDE", "DEPTH", "LOCATION"].forEach((opt) => {
  const o = document.createElement("option");
  o.textContent = opt;
  sel.appendChild(o);
});

const toggle = document.createElement("label");
toggle.className = "toggle-switch";
toggle.innerHTML = `<input type="checkbox"><span class="toggle-slider"></span>`;

inputRow.append(inp, inpDanger, sel, toggle);
inputSection.appendChild(inputRow);
root.appendChild(inputSection);

// ── Section: Typography ───────────────────────────────────────────────────────

const typoSection = section("TYPOGRAPHY");

const typoItems: Array<[string, string]> = [
  ["ews-title", "EWS TITLE DISPLAY"],
  ["ews-text", "BODY LABEL TEXT"],
  ["ews-text ews-text-glow", "GLOW TEXT"],
  ["ews-text danger", "DANGER TEXT"],
  ["ews-text ews-text-blink", "BLINK TEXT"],
  ["ews-text-digital", "DS-DIGITAL 00:04:27"],
  ["ews-text ews-text-underline", "UNDERLINED LABEL"],
];

const typoGrid = document.createElement("div");
typoGrid.style.cssText = "display:flex;flex-direction:column;gap:10px;";

typoItems.forEach(([cls, label]) => {
  const el = document.createElement("p");
  el.className = cls;
  el.textContent = label;
  typoGrid.appendChild(el);
});

typoSection.appendChild(typoGrid);
root.appendChild(typoSection);

// ── Section: Parallelograms ───────────────────────────────────────────────────

const paraSection = section("PARALLELOGRAMS");
const paraRow = document.createElement("div");
paraRow.style.cssText = "display:flex;gap:12px;align-items:center;flex-wrap:wrap;";

const para1 = document.createElement("div");
para1.className = "parallelogram";
const pt1 = document.createElement("p");
pt1.textContent = "JAKARTA";
para1.appendChild(pt1);

const para2 = document.createElement("div");
para2.className = "parallelogram danger";
const pt2 = document.createElement("p");
pt2.textContent = "TSUNAMI RISK";
para2.appendChild(pt2);

paraRow.append(para1, para2);
paraSection.appendChild(paraRow);
root.appendChild(paraSection);

// ── Section: Hex Grid ─────────────────────────────────────────────────────────

const hexSection = section("HEX GRID");
const hexContainer = document.createElement("div");
hexContainer.style.cssText = "width:100%;max-width:500px;";

const states = ["OK", "WARN", "OK", "DANGER", "OK", "OK", "WARN", "OK", "OK", "OK", "OK", "DANGER"];
states.forEach((state) => {
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
hexSection.appendChild(hexContainer);
root.appendChild(hexSection);

// ─── Helper ───────────────────────────────────────────────────────────────────

function section(title: string): HTMLElement {
  const wrap = document.createElement("section");
  wrap.style.cssText = "margin-bottom:40px;";

  const header = document.createElement("div");
  header.style.cssText = "margin-bottom:16px;padding-bottom:6px;border-bottom:1px solid var(--orange);";

  const label = document.createElement("h2");
  label.className = "ews-text";
  label.style.fontSize = "0.7rem";
  label.textContent = `// ${title}`;
  header.appendChild(label);
  wrap.appendChild(header);

  return wrap;
}
