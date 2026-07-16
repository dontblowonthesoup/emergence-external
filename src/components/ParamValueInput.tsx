import { useEffect, useRef, useState } from "react";

function decimalsIn(step: number): number {
  const s = String(step);
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

/** Clamp and snap a number to the same grid as a range input. */
export function quantizeParam(
  n: number,
  min: number,
  max: number,
  step: number,
): number {
  const clamped = Math.min(max, Math.max(min, n));
  if (!(step > 0)) return clamped;
  const snapped = Math.round((clamped - min) / step) * step + min;
  return Number(Math.min(max, Math.max(min, snapped)).toFixed(decimalsIn(step)));
}

interface ParamValueInputProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
  /** Accessible name when the visual label is elsewhere */
  "aria-label"?: string;
}

/**
 * Compact editable readout for slider params — type a value, Enter/blur commits
 * (clamped + snapped to the slider step).
 */
export default function ParamValueInput({
  value,
  min,
  max,
  step,
  onChange,
  suffix = "",
  "aria-label": ariaLabel = "Value",
}: ParamValueInputProps) {
  const [draft, setDraft] = useState(() => String(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft(String(value));
  }, [value]);

  const commit = () => {
    focused.current = false;
    const n = Number.parseFloat(draft);
    if (!Number.isFinite(n)) {
      setDraft(String(value));
      return;
    }
    const next = quantizeParam(n, min, max, step);
    onChange(next);
    setDraft(String(next));
  };

  return (
    <span className="tool-param-row__value-wrap">
      <input
        type="number"
        className="tool-param-row__value"
        min={min}
        max={max}
        step={step}
        value={draft}
        aria-label={ariaLabel}
        style={{ width: `${Math.max(3, draft.length + 1)}ch` }}
        onFocus={() => {
          focused.current = true;
        }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        onClick={(e) => e.stopPropagation()}
      />
      {suffix ? <span className="tool-param-row__suffix">{suffix}</span> : null}
    </span>
  );
}
