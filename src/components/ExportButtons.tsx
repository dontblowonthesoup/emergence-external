import { useEffect, useRef, useState } from "react";

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

interface ExportButtonsProps {
  /** Export a PNG. `transparent` true → no background, false → with background. */
  onPNG: (transparent: boolean) => void;
  /** Export an SVG. Always rendered without a background. */
  onSVG: () => void;
  disabled?: boolean;
}

/**
 * Shared export control: one Export menu with PNG (background / transparent) and SVG.
 * Aspect ratio and Record stay as separate header controls.
 */
export default function ExportButtons({ onPNG, onSVG, disabled }: ExportButtonsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="export-menu" ref={ref}>
      <button
        type="button"
        className="btn"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <DownloadIcon />
        Export
        <svg
          className="export-menu__caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="export-menu__list" role="menu">
          <button
            type="button"
            role="menuitem"
            className="export-menu__item"
            onClick={() => {
              setOpen(false);
              onPNG(false);
            }}
          >
            PNG with background
          </button>
          <button
            type="button"
            role="menuitem"
            className="export-menu__item"
            onClick={() => {
              setOpen(false);
              onPNG(true);
            }}
          >
            PNG transparent
          </button>
          <button
            type="button"
            role="menuitem"
            className="export-menu__item"
            onClick={() => {
              setOpen(false);
              onSVG();
            }}
          >
            SVG
          </button>
        </div>
      )}
    </div>
  );
}
