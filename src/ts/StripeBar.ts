/**
 * StripeBar.ts
 * Creates an animated diagonal stripe bar element.
 *
 * Usage:
 *   const bar = new StripeBar({ color: "red", loop: true, reverse: false, duration: 20 });
 *   headerEl.prepend(bar.element);
 *   bar.setContent(myLabelEl);  // optional overlay
 */

export interface StripeBarOptions {
  /** "orange" (default) | "red" */
  color?: "orange" | "red";
  /** "horizontal" (default) | "vertical" */
  orientation?: "horizontal" | "vertical";
  /** Enable continuous scroll animation */
  loop?: boolean;
  /** Reverse scroll direction */
  reverse?: boolean;
  /** Animation duration in seconds (default 10) */
  duration?: number;
  /** Extra CSS classes for the outer container */
  className?: string;
}

export class StripeBar {
  public readonly element: HTMLElement;
  private wrapper: HTMLElement;
  private bar1: HTMLElement;
  private bar2: HTMLElement;

  constructor(options: StripeBarOptions = {}) {
    const {
      color = "orange",
      orientation = "horizontal",
      loop = false,
      reverse = false,
      duration = 10,
      className = "",
    } = options;

    // Outer container
    this.element = document.createElement("div");
    this.element.className = [
      "stripe-bar-container",
      color === "red" ? "danger" : "",
      orientation === "vertical" ? "vertical" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Wrapper holds two copies of the stripe for seamless loop
    this.wrapper = document.createElement("div");
    this.wrapper.className = "stripe-wrapper";

    // Animation class
    let animClass = "";
    if (loop) {
      if (orientation === "vertical") {
        animClass = reverse
          ? "loop-stripe-vertical-reverse"
          : "loop-stripe-vertical";
      } else {
        animClass = reverse ? "loop-stripe-reverse" : "loop-stripe";
      }
    }

    // Two stripe bar tiles for seamless loop
    this.bar1 = document.createElement("div");
    this.bar1.className = ["stripe-bar", animClass].filter(Boolean).join(" ");
    if (loop) this.bar1.style.animationDuration = `${duration}s`;

    this.bar2 = document.createElement("div");
    this.bar2.className = ["stripe-bar", animClass].filter(Boolean).join(" ");
    if (loop) this.bar2.style.animationDuration = `${duration}s`;

    this.wrapper.appendChild(this.bar1);
    this.wrapper.appendChild(this.bar2);
    this.element.appendChild(this.wrapper);
  }

  /**
   * Overlay content (e.g. a label) absolutely positioned over the stripe.
   * Content is centered; wrap it in a div with bg-black for the "windowed text" effect.
   */
  setContent(content: HTMLElement): this {
    content.style.position = "absolute";
    content.style.inset = "0";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.zIndex = "2";
    this.element.appendChild(content);
    return this;
  }
}
