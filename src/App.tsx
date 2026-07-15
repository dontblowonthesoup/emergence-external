import { useState } from 'react';
import wordmark from './assets/copo-watermark.png';
import RootBrush from './tools/RootBrush';
import FlowField from './tools/FlowField';
import Jagged from './tools/Jagged';
import Contour from './tools/Contour';
import RoadColors from './tools/RoadColors';
import RootsText from './tools/RootsText';

interface ToolDef {
  id: string;
  label: string;
  Component: () => React.ReactNode;
}

const TOOLS: ToolDef[] = [
  { id: 'root-brush', label: 'Root Brush', Component: RootBrush },
  { id: 'flow-field', label: 'Fingerprint', Component: FlowField },
  { id: 'jagged', label: 'Jagged Fingerprint', Component: Jagged },
  { id: 'contour', label: 'Contour', Component: Contour },
  { id: 'road-colors', label: 'Map', Component: RoadColors },
  { id: 'roots-text', label: 'Roots + Text', Component: RootsText },
];

export default function App() {
  const [activeId, setActiveId] = useState(TOOLS[0].id);
  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0];
  const Active = active.Component;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <img
            src="/emergence-logo.png"
            alt="Emergence"
            className="app-header__logo"
          />
        </div>
      </header>

      <nav className="tool-tabs" aria-label="Tools">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={
              t.id === activeId ? 'tool-tabs__tab tool-tabs__tab--active' : 'tool-tabs__tab'
            }
            aria-pressed={t.id === activeId}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {/* Remount on tool change so each engine resets its canvas/state cleanly. */}
        <Active key={active.id} />
      </main>

      <footer className="app-footer">
        <img src={wordmark} alt="Company Policy" className="app-footer__wordmark" />
      </footer>
    </div>
  );
}
