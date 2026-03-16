/**
 * HexGrid.ts
 * Honeycomb layout engine — absolutely positions hex children
 * inside a container and recalculates on resize / DOM changes.
 *
 * Ported 1-to-1 from HexGrid.svelte's honeycombLayout action.
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
  private mutationObserver: MutationObserver;

  constructor(container: HTMLElement, options: HexGridOptions = {}) {
    this.container = container;
    this.options = {
      variant: options.variant ?? "pointy",
      hexWidth: options.hexWidth ?? 72,
      hexHeight: options.hexHeight ?? 83,
      gap: options.gap ?? 4,
    };

    this.container.classList.add("hex-honeycomb");

    // Delay first layout so child styles are computed
    setTimeout(() => this.layout(), 0);

    this.resizeObserver = new ResizeObserver(() => this.layout());
    this.resizeObserver.observe(this.container);

    this.mutationObserver = new MutationObserver(() => this.layout());
    this.mutationObserver.observe(this.container, { childList: true });
  }

  layout(): void {
    const { hexWidth: w, hexHeight: h, gap, variant } = this.options;
    const containerWidth = this.container.clientWidth;
    const children = Array.from(this.container.children) as HTMLElement[];

    if (!containerWidth || children.length === 0) return;

    this.container.style.position = "relative";
    this.container.style.display = "block";

    if (variant === "pointy") {
      this.layoutPointy(children, containerWidth, w, h, gap);
    } else {
      this.layoutFlat(children, containerWidth, w, h, gap);
    }
  }

  // ─── Pointy-top (Variant 1) ──────────────────────────────────────────────
  // Rows alternate between full-width and inset-by-half rows.
  // Adjacent rows overlap vertically by 14 px (rowOffsetTop).
  private layoutPointy(
    children: HTMLElement[],
    containerWidth: number,
    w: number,
    h: number,
    gap: number,
  ): void {
    const rowOffsetTop = -14; // vertical overlap between rows
    const itemFullWidth = w + gap;

    let maxCols = Math.floor((containerWidth + gap) / itemFullWidth);
    if (maxCols < 1) maxCols = 1;

    let isOffset = false; // whether the current row is the indented row
    let currentCol = 0;
    let currentRow = 0;

    for (const child of children) {
      const colsInThisRow = isOffset ? Math.max(1, maxCols - 1) : maxCols;

      let x = currentCol * itemFullWidth;
      if (isOffset) {
        x += w / 2 + gap / 2; // shift odd rows right by half a cell
      }

      const y = currentRow * (h + rowOffsetTop);

      child.style.position = "absolute";
      child.style.left = `${x}px`;
      child.style.top = `${y}px`;
      child.style.margin = "0";
      child.style.width = `${w}px`;
      child.style.height = `${h}px`;

      currentCol++;
      if (currentCol >= colsInThisRow) {
        currentCol = 0;
        isOffset = !isOffset;
        currentRow++;
      }
    }

    // Set container height to wrap all children
    let totalHeight: number;
    if (currentCol > 0) {
      totalHeight = currentRow * (h + rowOffsetTop) + h;
    } else {
      totalHeight = (currentRow - 1) * (h + rowOffsetTop) + h;
    }
    this.container.style.height = `${totalHeight}px`;
  }

  // ─── Flat-top (Variant 2) ─────────────────────────────────────────────────
  // Columns advance by 75% of hex width; odd columns are shifted down by half
  // a row height, producing the classic flat-top honeycomb.
  private layoutFlat(
    children: HTMLElement[],
    containerWidth: number,
    w: number,
    h: number,
    gap: number,
  ): void {
    const colAdvanceX = w * 0.75 + gap;
    const rowAdvanceY = h + gap;

    let maxCols = Math.floor((containerWidth - w) / colAdvanceX) + 1;
    if (containerWidth < w) maxCols = 1;

    let currentCol = 0;
    let currentRow = 0;
    let maxBottom = 0;

    for (const child of children) {
      const x = currentCol * colAdvanceX;
      let y = currentRow * rowAdvanceY;

      // Odd columns drop down by half a row
      if (currentCol % 2 === 1) {
        y += rowAdvanceY / 2;
      }

      child.style.position = "absolute";
      child.style.left = `${x}px`;
      child.style.top = `${y}px`;
      child.style.margin = "0";
      child.style.width = `${w}px`;
      child.style.height = `${h}px`;

      const bottom = y + h;
      if (bottom > maxBottom) maxBottom = bottom;

      currentCol++;
      if (currentCol >= maxCols) {
        currentCol = 0;
        currentRow++;
      }
    }

    this.container.style.height = `${maxBottom}px`;
  }

  destroy(): void {
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
  }
}
