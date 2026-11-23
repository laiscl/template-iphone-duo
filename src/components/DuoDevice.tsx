import type { CSSProperties } from "react";
import { finishById, type FinishId } from "../data";

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={d} />
    </svg>
  );
}

const glyphs = {
  sun: "M12 7a5 5 0 1 0 .01 10.01A5 5 0 0 0 12 7Zm0-5a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16.6a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.4a1 1 0 0 1 1-1ZM3 11a1 1 0 1 0 0 2h1.4a1 1 0 1 0 0-2H3Zm16.6 0a1 1 0 1 0 0 2H21a1 1 0 1 0 0-2h-1.4ZM5.1 4.1a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm11.6 11.6a1 1 0 0 1 1.4 0l.8.8a1 1 0 0 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4ZM18.9 4.1a1 1 0 0 1 0 1.4l-.8.8a1 1 0 1 1-1.4-1.4l.8-.8a1 1 0 0 1 1.4 0ZM7.3 15.7a1 1 0 0 1 0 1.4l-.8.8a1 1 0 0 1-1.4-1.4l.8-.8a1 1 0 0 1 1.4 0Z",
  mountains: "M3 18 9.2 8.6c.3-.5 1-.5 1.3 0L14 14l1.6-2.2c.3-.4.9-.4 1.2 0L21 18H3Z",
  aperture: "M12 6.2A5.8 5.8 0 1 0 12 17.8 5.8 5.8 0 0 0 12 6.2Zm0 2.2a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z",
  note: "M7 3h7l4 4v14H7V3Zm7 1.6V8h3.4L14 4.6ZM9 11h6v1.4H9V11Zm0 3h6v1.4H9V14Z",
  chat: "M5 5h14v9H9l-4 3.2V5Z",
  pin: "M12 2.8a5 5 0 0 0-5 5c0 3.6 5 9.4 5 9.4s5-5.8 5-9.4a5 5 0 0 0-5-5Zm0 6.6a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Z",
  folder: "M3 7.2A2 2 0 0 1 5 5.2h4l2 2h8a2 2 0 0 1 2 2v8.6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.2Z",
  heart: "M12 19s-7-4.4-7-8.6A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7 2.4C19 14.6 12 19 12 19Z",
  spark: "M12 2 9.8 9.2 2.5 11 9.8 12.8 12 20l2.2-7.2L21.5 11 14.2 9.2 12 2Z",
  music: "M9 17.2a2.2 2.2 0 1 1-2.2-2.2c.3 0 .6 0 .8.1V6.2L18 4v8.2a2.2 2.2 0 1 1-1.4-2V7.2L9 8.6v8.6Z",
  gear: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6ZM4 10.2h2.1a6 6 0 0 1 .8-1.9L5.4 6.9 6.9 5.4 8.3 6.9a6 6 0 0 1 1.9-.8V4h2v2.1a6 6 0 0 1 1.9.8l1.4-1.5 1.5 1.5-1.5 1.4c.4.6.7 1.2.8 1.9H20v2h-2.1a6 6 0 0 1-.8 1.9l1.5 1.4-1.5 1.5-1.4-1.5a6 6 0 0 1-1.9.8V20h-2v-2.1a6 6 0 0 1-1.9-.8l-1.4 1.5-1.5-1.5 1.5-1.4a6 6 0 0 1-.8-1.9H4v-2Z",
  handset: "M7 3.5h2.2L11 7.2 9.2 8.6a12 12 0 0 0 6.2 6.2l1.4-1.8 3.7 1.8V17a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 5 6.7 2 2 0 0 1 7 3.5Z",
  bubble: "M5 4h14v10H8.6L5 16.6V4Z",
  ring: "M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  quaver: "M10 16.8a2.3 2.3 0 1 1-1.6-2.2V5.2L18 3.4v7.6a2.3 2.3 0 1 1-1.5-2.1V6.4L10 7.8v9Z",
} as const;

const grid = [
  { bg: "#f2c14e", glyph: "sun" },
  { bg: "#ffffff", glyph: "cal" },
  { bg: "#7aa2d6", glyph: "mountains" },
  { bg: "#2f2f33", glyph: "aperture" },
  { bg: "#f4d35e", glyph: "note" },
  { bg: "#5eae7a", glyph: "chat" },
  { bg: "#e36b5a", glyph: "pin" },
  { bg: "#e7b15a", glyph: "folder" },
  { bg: "#e25b78", glyph: "heart" },
  { bg: "#6c8cff", glyph: "spark" },
  { bg: "#c94b6a", glyph: "music" },
  { bg: "#8e8e93", glyph: "gear" },
] as const;

const rail = [
  { bg: "#3dbe74", glyph: "handset" },
  { bg: "#53c27a", glyph: "bubble" },
  { bg: "#1f7ae0", glyph: "ring" },
  { bg: "#e4546a", glyph: "quaver" },
] as const;

function AppFace({ bg, glyph }: { bg: string; glyph: string }) {
  if (glyph === "cal") {
    return (
      <span className="app-icon light" style={{ background: bg }}>
        <span className="cal">
          <span className="cal-top" />
          <span className="cal-num">23</span>
        </span>
      </span>
    );
  }
  const tone = bg === "#f2c14e" || bg === "#f4d35e" || bg === "#e7b15a" ? "light" : "";
  return (
    <span className={`app-icon ${tone}`} style={{ background: bg, color: tone ? "#1d1d1f" : "#fff" }}>
      <Glyph d={glyphs[glyph as keyof typeof glyphs]} />
    </span>
  );
}

function LockFace() {
  return (
    <div className="lock-face">
      <small>Wed Apr 1</small>
      <strong>9:41</strong>
    </div>
  );
}

function BackFace() {
  return (
    <div className="back-face">
      <div className="cam-island">
        <span className="lens" />
        <span className="lens small" />
        <span className="flash" />
      </div>
    </div>
  );
}

function MemoryScene() {
  return (
    <>
      <img className="memory-photo" src="/memory-portrait.jpg" alt="" />
      <div className="memory-caption">
        <strong>On This Day</strong>
        <span>April 1, 2025</span>
      </div>
      <span className="memory-play">
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3.2 1.8v8.4L10.2 6 3.2 1.8Z" fill="currentColor" />
        </svg>
      </span>
    </>
  );
}

function HomeScene() {
  return (
    <div className="home">
      <img className="dune-photo" src="/dune-wallpaper.jpg" alt="" />
      <div className="status">
        <span>9:41</span>
        <span className="status-icons">
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
            <rect x="0" y="6" width="2" height="4" rx="0.4" fill="#1d1d1f" />
            <rect x="3.5" y="4" width="2" height="6" rx="0.4" fill="#1d1d1f" />
            <rect x="7" y="2" width="2" height="8" rx="0.4" fill="#1d1d1f" />
            <rect x="10.5" y="0" width="2" height="10" rx="0.4" fill="#1d1d1f" />
          </svg>
          <svg width="13" height="10" viewBox="0 0 13 10" aria-hidden="true">
            <path d="M1 4.2a6 6 0 0 1 11 0" fill="none" stroke="#1d1d1f" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M3.1 6.2a3.4 3.4 0 0 1 6.8 0" fill="none" stroke="#1d1d1f" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6.5" cy="8.4" r="1" fill="#1d1d1f" />
          </svg>
          <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
            <rect x="0.5" y="1" width="14" height="8" rx="1.6" fill="none" stroke="#1d1d1f" strokeWidth="1" />
            <rect x="2" y="2.4" width="9" height="5.2" rx="0.6" fill="#1d1d1f" />
            <rect x="15.2" y="3.2" width="1.6" height="3.6" rx="0.4" fill="#1d1d1f" />
          </svg>
        </span>
      </div>
      <div className="widget-row">
        <div className="weather">
          <p className="weather-city">San Francisco</p>
          <p className="weather-temp">54°</p>
          <p className="weather-meta">Partly Cloudy<br />H:57° L:49°</p>
        </div>
        <div className="map-card">
          <svg viewBox="0 0 160 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="160" height="140" fill="#d7e6ea" />
            <path d="M0 78h160v62H0Z" fill="#c5d7c4" />
            <path d="M18 0h18l28 140H34Z" fill="#f7fbfb" />
            <path d="M78 0h10l-24 140H52Z" fill="#e7eef0" />
            <circle cx="96" cy="58" r="7" fill="#e15a4a" />
            <circle cx="96" cy="58" r="2.5" fill="#fff" />
            <path d="M96 64c8 10 0 18 0 18s-8-8 0-18Z" fill="#e15a4a" />
          </svg>
          <span className="map-label">Channel St</span>
        </div>
      </div>
      <div className="icon-area">
        <div className="icon-grid">
          {grid.map((icon) => (
            <AppFace key={icon.glyph} bg={icon.bg} glyph={icon.glyph} />
          ))}
        </div>
        <div className="rail">
          {rail.map((icon) => (
            <AppFace key={icon.glyph} bg={icon.bg} glyph={icon.glyph} />
          ))}
        </div>
      </div>
      <span className="home-search">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.2 10.2 13.2 13.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

export function DuoDevice({
  finish = "grafite",
  screen = "home",
  pose = "open",
}: {
  finish?: FinishId;
  screen?: "home" | "lock" | "back";
  pose?: "open" | "tent" | "closed";
}) {
  const tone = finishById(finish);
  const face = screen === "back" ? <BackFace /> : screen === "lock" ? <LockFace /> : null;
  return (
    <div
      className={`fold-wrap pose-${pose}`}
      data-finish={tone.id}
      style={{ "--frame": tone.frame, "--hinge": tone.hinge, "--lip": tone.lip } as CSSProperties}
    >
      <div className="fold">
        <div className="panel panel-left">
          <span className="rail-btn vol-up" />
          <span className="rail-btn vol-down" />
          <div className="bezel">
            <div className="screen">
              {face ?? <MemoryScene />}
              <span className="glass-sheen" />
            </div>
          </div>
        </div>
        <div className="hinge" />
        <div className="panel panel-right">
          <span className="rail-btn power" />
          <div className="bezel">
            <div className="screen">
              {face ?? <HomeScene />}
              <span className="glass-sheen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
