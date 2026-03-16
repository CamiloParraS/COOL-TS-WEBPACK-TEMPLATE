/**
 * HexGrid.ts
 * Honeycomb layout engine — absolutely positions hex children
 * inside a container and recalculates on resize.
 *
 * Usage:
 *   const grid = new HexGrid(containerEl, {
 *     variant: "pointy",
 *     hexWidth: 72,
 *     hexHeight: 83,
 *     gap: 4,
 *   });
 *   grid.layout();
 */

export interface HexGridOptions {
  /** "pointy" (default) | "flat" */
  variant?: "pointy" | "flat";
  /** Override hex cell width in px */
  hexWidth?: number;
  /** Override hex cell height in px */
  hexHeight?: number;
  /** Gap between hexes in px (default 4) */
  gap?: number;
}

export class HexGrid {
  private container: HTMLElement;
  private options: Required<HexGridOptions>;
  private resizeObserver: ResizeObserver;

  constructor(container: HTMLElement, options: HexGridOptions = {}) {
    this.container = container;
    this.options = {
      variant: options.variant ?? "pointy",
      hexWidth: options.hexWidth ?? 72,
      hexHeight: options.hexHeight ?? 83,
      gap: options.gap ?? 4,
    };

    this.container.classList.add("hex-honeycomb");
    this.container.style.position = "relative";

    this.resizeObserver = new ResizeObserver(() => this.layout());
    this.resizeObserver.observe(this.container);
    this.layout();
  }

  layout(): void {
    const { hexWidth, hexHeight, gap, variant } = this.options;
    const children = Array.from(
      this.container.children
    ) as HTMLElement[];
    const containerWidth = this.container.clientWidth;

    if (containerWidth === 0 || children.length === 0) return;

    let maxY = 0;

    if (variant === "pointy") {
      // Pointy-top: offset every other column down by half a hex height
      const colWidth = hexWidth + gap;
      const rowHeight = hexHeight * 0.75 + gap;

      children.forEach((child, i) => {
        const col = Math.floor((i * colWidth) / containerWidth);
        const row = Math.floor(i / Math.floor(containerWidth / colWidth));
        const colInRow = i % Math.floor(containerWidth / colWidth);
        const x = colInRow * colWidth;
        const y = row * rowHeight + (colInRow % 2 === 1 ? hexHeight * 0.5 : 0);

        child.style.position = "absolute";
        child.style.left = `${x}px`;
        child.style.top = `${y}px`;
        child.style.width = `${hexWidth}px`;
        child.style.height = `${hexHeight}px`;

        maxY = Math.max(maxY, y + hexHeight);
      });
    } else {
      // Flat-top: offset every other row right by half a hex width
      const colWidth = hexWidth * 0.75 + gap;
      const rowHeight = hexHeight + gap;
      const cols = Math.floor(containerWidth / colWidth) || 1;

      children.forEach((child, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * colWidth;
        const y = row * rowHeight + (col % 2 === 1 ? hexHeight * 0.5 : 0);

        child.style.position = "absolute";
        child.style.left = `${x}px`;
        child.style.top = `${y}px`;
        child.style.width = `${hexWidth}px`;
        child.style.height = `${hexHeight}px`;

        maxY = Math.max(maxY, y + hexHeight);
      });
    }

    this.container.style.height = `${maxY}px`;
  }

  destroy(): void {
    this.resizeObserver.disconnect();
  }
}
