// COPO / Emergence brand palette — mirrors the named palette in tokens.css.
// The color controls offer exactly these swatches so canvas output (stroke and
// background) is always on brand.

export interface BrandColor {
  name: string;
  hex: string;
}

export const BRAND_PALETTE: BrandColor[] = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Cream", hex: "#F5F5F2" },
  { name: "Pale Green", hex: "#EBFADC" },
  { name: "Gold", hex: "#C0B663" },
  { name: "Light Green", hex: "#509137" },
  { name: "Mid Green", hex: "#195519" },
  { name: "Dark Green", hex: "#00280F" },
  { name: "Gray", hex: "#808080" },
  { name: "Black", hex: "#000000" },
];
