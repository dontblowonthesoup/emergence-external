import { BRAND_PALETTE } from "../brand/palette";

interface PaletteColorRowProps {
  label: string;
  tip?: string;
  value: string;
  onChange: (hex: string) => void;
}

/**
 * Brand-palette color picker — a row of fixed swatches in place of a free hex
 * input, so stroke/background colors always stay on brand.
 */
export default function PaletteColorRow({
  label,
  tip,
  value,
  onChange,
}: PaletteColorRowProps) {
  const active = value.trim().toLowerCase();
  return (
    <div
      className={`tool-param-row${tip ? " has-tip" : ""} palette-row`}
      data-tip={tip}
      role="radiogroup"
      aria-label={label}
    >
      <span className="tool-param-row__label">{label}</span>
      <span className="palette-row__swatches">
        {BRAND_PALETTE.map((c) => {
          const selected = active === c.hex.toLowerCase();
          return (
            <button
              key={c.hex}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`palette-row__swatch${selected ? " is-active" : ""}`}
              style={{ background: c.hex }}
              title={c.name}
              aria-label={`${label}: ${c.name}`}
              onClick={() => onChange(c.hex)}
            />
          );
        })}
      </span>
    </div>
  );
}
