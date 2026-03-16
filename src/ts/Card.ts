/**
 * Card.ts
 * Creates an EWS card panel with header, content, and optional footer.
 *
 * Usage:
 *   const card = new Card({
 *     title: "STATION STATUS",
 *     borderColor: "red",
 *     stripeHeader: true,
 *   });
 *   card.setContent(myContentEl);
 *   document.body.appendChild(card.element);
 */

import { StripeBar } from "./StripeBar";

export interface CardOptions {
  /** Header label text */
  title?: string;
  /** "orange" (default) | "red" */
  borderColor?: "orange" | "red";
  /** Use animated stripe in the header */
  stripeHeader?: boolean;
  /** Stripe direction in header */
  stripeReverse?: boolean;
  /** Stripe duration (default 20) */
  stripeDuration?: number;
  /** Extra classes for the outer card element */
  className?: string;
  /** Collapsible on mobile (default false) */
  collapsible?: boolean;
}

export class Card {
  public readonly element: HTMLElement;
  public readonly header: HTMLElement;
  public readonly content: HTMLElement;
  public readonly footer: HTMLElement;

  private _open = true;

  constructor(options: CardOptions = {}) {
    const {
      title,
      borderColor = "orange",
      stripeHeader = false,
      stripeReverse = true,
      stripeDuration = 20,
      className = "",
      collapsible = false,
    } = options;

    // Root card element
    this.element = document.createElement("div");
    this.element.className = [
      "ews-card",
      borderColor === "red" ? "bordered-red" : "bordered",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Header
    this.header = document.createElement("div");
    this.header.className = "ews-card-header";

    if (stripeHeader && title) {
      const stripe = new StripeBar({
        color: "red",
        loop: true,
        reverse: stripeReverse,
        duration: stripeDuration,
      });
      stripe.element.style.width = "100%";
      stripe.element.style.height = "30px";

      const label = document.createElement("div");
      label.className = "ews-card-header-label";
      const span = document.createElement("span");
      span.textContent = title;
      label.appendChild(span);

      stripe.element.appendChild(label);
      this.header.appendChild(stripe.element);
    } else if (title) {
      this.header.style.padding = "6px 12px";
      this.header.textContent = title;
    }

    if (collapsible) {
      this.header.style.cursor = "pointer";
      this.header.addEventListener("click", () => this.toggle());
    }

    // Content
    this.content = document.createElement("div");
    this.content.className = "ews-card-content custom-scrollbar";

    // Footer
    this.footer = document.createElement("div");
    this.footer.className = "ews-card-footer";

    this.element.appendChild(this.header);
    this.element.appendChild(this.content);
    this.element.appendChild(this.footer);
  }

  setContent(el: HTMLElement | string): this {
    if (typeof el === "string") {
      this.content.innerHTML = el;
    } else {
      this.content.innerHTML = "";
      this.content.appendChild(el);
    }
    return this;
  }

  setFooter(el: HTMLElement | string): this {
    if (typeof el === "string") {
      this.footer.textContent = el;
    } else {
      this.footer.innerHTML = "";
      this.footer.appendChild(el);
    }
    return this;
  }

  toggle(): this {
    this._open = !this._open;
    this.content.style.display = this._open ? "" : "none";
    this.footer.style.display = this._open ? "" : "none";
    return this;
  }

  open(): this {
    this._open = true;
    this.content.style.display = "";
    this.footer.style.display = "";
    return this;
  }

  close(): this {
    this._open = false;
    this.content.style.display = "none";
    this.footer.style.display = "none";
    return this;
  }
}
