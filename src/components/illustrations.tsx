import { useId } from "react";

const sans = "Inter, -apple-system, system-ui, Helvetica Neue, Arial, sans-serif";

function Lens({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} fill="#8e8e93" />
      <circle cx={cx} cy={cy} r={r} fill="#0c0e12" />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="#1b2c46" />
      <circle cx={cx} cy={cy} r={r * 0.28} fill="#07080a" />
      <circle cx={cx + r * 0.28} cy={cy - r * 0.28} r={r * 0.12} fill="#d5e2ef" />
    </g>
  );
}

function Chassis({
  x,
  y,
  w,
  h,
  rx = 48,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="#1c1c1e" />
      <rect
        x={x + 1.5}
        y={y + 1.5}
        width={w - 3}
        height={h - 3}
        rx={rx - 2}
        fill="none"
        stroke="#d2d2d7"
        strokeWidth="1.6"
      />
      <rect
        x={x + 5}
        y={y + 5}
        width={w - 10}
        height={h - 10}
        rx={rx - 6}
        fill="none"
        stroke="#3a3a3c"
        strokeWidth="2"
      />
    </g>
  );
}

function CameraIsland({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="118" height="132" rx="28" fill="#2a2a2e" stroke="#8e8e93" strokeWidth="2" />
      <Lens cx={x + 36} cy={y + 38} r={18} />
      <Lens cx={x + 82} cy={y + 38} r={18} />
      <Lens cx={x + 36} cy={y + 90} r={14} />
      <circle cx={x + 86} cy={y + 92} r="8" fill="#f4efe8" />
      <circle cx={x + 86} cy={y + 92} r="3" fill="#fff6ea" />
      <circle cx={x + 104} cy={y + 108} r="3" fill="#6e6e73" />
    </g>
  );
}

export function FlowScreen() {
  const id = useId().replace(/:/g, "");
  const left = `${id}-l`;
  const right = `${id}-r`;
  const scene = (
    <>
      <rect x="0" y="0" width="780" height="480" fill="#d7e4f2" />
      <circle cx="390" cy="176" r="46" fill="#f2d48a" />
      <path d="M0 250c80-30 140-4 210 12 80 18 120 6 180-14 70-22 120-4 180 10v222H0Z" fill="#e6c79a" />
      <path d="M0 320c100-24 160 8 250 10 80 2 130-22 200-8 50 8 90 2 130-4v162H0Z" fill="#f4dfc4" />
    </>
  );

  return (
    <svg className="illus" viewBox="0 0 780 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <clipPath id={left}>
          <rect x="34" y="36" width="332" height="420" rx="30" />
        </clipPath>
        <clipPath id={right}>
          <rect x="414" y="36" width="332" height="420" rx="30" />
        </clipPath>
      </defs>
      <Chassis x={16} y={16} w={360} h={460} rx={48} />
      <Chassis x={404} y={16} w={360} h={460} rx={48} />
      <rect x="372" y="40" width="36" height="412" rx="10" fill="#141416" />
      <rect x="386" y="58" width="6" height="376" rx="3" fill="#d2d2d7" />
      <g clipPath={`url(#${left})`}>{scene}</g>
      <g clipPath={`url(#${right})`}>{scene}</g>
    </svg>
  );
}

export function OpenPair() {
  return (
    <svg className="illus" viewBox="0 0 720 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Chassis x={18} y={28} w={320} h={460} />
      <Chassis x={382} y={28} w={320} h={460} />
      <rect x="334" y="52" width="52" height="412" rx="12" fill="#121214" />
      <rect x="356" y="70" width="8" height="376" rx="4" fill="#c7c7cc" />
      <rect x="36" y="46" width="284" height="424" rx="34" fill="#6f8caf" />
      <path fill="#141416" d="M70 70c40-20 110-16 150 10 16 40-10 70-50 78-40 6-80-10-96-40 8-20 4-36-4-48Z" />
      <ellipse cx="168" cy="150" rx="36" ry="42" fill="#e7b79a" />
      <path fill="#f4f1ea" d="M36 240c50-16 100 4 150 10 40 6 80 2 110-6v226H36Z" />
      <path fill="#d5ddd4" d="M36 300c70-10 120 8 180 8 40 0 70-6 100-2v40H36Z" />
      <circle cx="250" cy="286" r="14" fill="#d45386" />
      <circle cx="236" cy="300" r="12" fill="#e07aa0" />
      <rect x="400" y="46" width="284" height="424" rx="34" fill="#f6ead8" />
      <path d="M400 280c50-20 100 10 150 8 40-2 80-16 134-6v188H400Z" fill="#e6c79a" />
      <rect x="418" y="68" width="150" height="96" rx="20" fill="rgba(210,228,248,0.95)" />
      <rect x="580" y="68" width="86" height="96" rx="20" fill="#d5e6ea" />
      <rect x="418" y="180" width="52" height="52" rx="14" fill="#34c759" />
      <rect x="478" y="180" width="52" height="52" rx="14" fill="#fff" />
      <rect x="538" y="180" width="52" height="52" rx="14" fill="#1d1d1f" />
      <rect x="598" y="180" width="52" height="52" rx="14" fill="#0a84ff" />
    </svg>
  );
}

export function CoverPhone({ mode = "clock" }: { mode?: "clock" | "battery" }) {
  return (
    <svg className="illus" viewBox="0 0 420 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Chassis x={48} y={16} w={324} h={640} rx={54} />
      <rect x="64" y="32" width="292" height="608" rx="42" fill="#ece8e2" />
      <rect x="168" y="44" width="84" height="18" rx="9" fill="#1c1c1e" />
      {mode === "clock" ? (
        <>
          <text x="210" y="280" textAnchor="middle" fill="#1d1d1f" fontFamily={sans} fontSize="76" fontWeight="600">
            9:41
          </text>
          <text x="210" y="322" textAnchor="middle" fill="#707070" fontFamily={sans} fontSize="16">
            segunda, 23 de novembro
          </text>
          <rect x="158" y="352" width="104" height="74" rx="16" fill="#6f8caf" />
          <circle cx="196" cy="384" r="10" fill="#d45386" />
          <path d="M158 400c18-8 34 0 50 4 14 4 28 2 36-4v26h-86Z" fill="#f4f1ea" />
        </>
      ) : (
        <>
          <text x="210" y="300" textAnchor="middle" fill="#1d1d1f" fontFamily={sans} fontSize="72" fontWeight="600">
            28 h
          </text>
          <text x="210" y="340" textAnchor="middle" fill="#707070" fontFamily={sans} fontSize="16">
            de vídeo
          </text>
          {Array.from({ length: 12 }, (_, index) => (
            <rect
              key={index}
              x={112 + index * 16}
              y="378"
              width="8"
              height={index < 9 ? 26 : 16}
              rx="2"
              fill={index < 9 ? "#1d1d1f" : "#c8c8cc"}
            />
          ))}
        </>
      )}
      <rect x="44" y="150" width="6" height="36" rx="2" fill="#d2d2d7" />
      <rect x="44" y="198" width="6" height="54" rx="2" fill="#d2d2d7" />
      <rect x="370" y="176" width="6" height="78" rx="2" fill="#d2d2d7" />
    </svg>
  );
}

export function ProfileShot() {
  return (
    <svg className="illus" viewBox="0 0 720 680" aria-hidden="true">
      <Chassis x={70} y={28} w={324} h={620} rx={54} />
      <rect x="86" y="44" width="292" height="588" rx="42" fill="#ece8e2" />
      <rect x="186" y="56" width="92" height="18" rx="9" fill="#1c1c1e" />
      <text x="232" y="300" textAnchor="middle" fill="#1d1d1f" fontFamily={sans} fontSize="72" fontWeight="600">
        9:41
      </text>
      <text x="232" y="340" textAnchor="middle" fill="#707070" fontFamily={sans} fontSize="16">
        fechado, 11,2 mm
      </text>
      <path d="M394 58h22l16 18v520l-16 18h-22V58Z" fill="#2c2c2e" />
      <path d="M416 76h8l10 14v492l-10 14h-8V76Z" fill="#8e8e93" />
      <rect x="408" y="168" width="8" height="34" rx="2" fill="#d2d2d7" />
      <rect x="408" y="214" width="8" height="52" rx="2" fill="#d2d2d7" />
      <path d="M470 70h26M470 80h14M484 590h12M470 602h26" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M484 80v510" stroke="#86868b" strokeWidth="1.5" />
      <text x="508" y="348" fill="#707070" fontFamily={sans} fontSize="15">
        11,2 mm
      </text>
    </svg>
  );
}

export function CameraBack() {
  return (
    <svg className="illus" viewBox="0 0 460 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Chassis x={60} y={20} w={340} h={650} rx={56} />
      <rect x="76" y="36" width="308" height="618" rx="44" fill="#161618" />
      <CameraIsland x={96} y={64} />
      <rect x="250" y="120" width="2" height="420" fill="#2e2e32" />
      <rect x="56" y="160" width="6" height="40" rx="2" fill="#d2d2d7" />
      <rect x="56" y="214" width="6" height="58" rx="2" fill="#d2d2d7" />
      <rect x="398" y="188" width="6" height="84" rx="2" fill="#d2d2d7" />
    </svg>
  );
}

export function Silicon() {
  return (
    <svg className="illus" viewBox="0 0 640 480" aria-hidden="true">
      <rect x="150" y="70" width="340" height="340" rx="36" fill="#1d1d1f" />
      {Array.from({ length: 14 }, (_, index) => (
        <rect key={`t-${index}`} x={176 + index * 22} y="86" width="8" height="16" rx="1" fill="#d7a15f" />
      ))}
      {Array.from({ length: 14 }, (_, index) => (
        <rect key={`b-${index}`} x={176 + index * 22} y="378" width="8" height="16" rx="1" fill="#d7a15f" />
      ))}
      {Array.from({ length: 10 }, (_, index) => (
        <rect key={`l-${index}`} x="166" y={118 + index * 24} width="16" height="8" rx="1" fill="#d7a15f" />
      ))}
      {Array.from({ length: 10 }, (_, index) => (
        <rect key={`r-${index}`} x="458" y={118 + index * 24} width="16" height="8" rx="1" fill="#d7a15f" />
      ))}
      <rect x="206" y="126" width="228" height="228" rx="16" fill="#243246" />
      {Array.from({ length: 24 }, (_, index) => {
        const col = index % 6;
        const row = Math.floor(index / 6);
        const hot = index === 8 || index === 15 || index === 21;
        return (
          <rect
            key={index}
            x={222 + col * 34}
            y={142 + row * 50}
            width="26"
            height="36"
            rx="4"
            fill={hot ? "#d7a15f" : "#3e5c78"}
          />
        );
      })}
    </svg>
  );
}

export function HingeMacro() {
  return (
    <svg className="illus" viewBox="0 0 680 420" aria-hidden="true">
      <rect x="24" y="60" width="270" height="300" rx="40" fill="#1c1c1e" stroke="#d2d2d7" strokeWidth="2" />
      <rect x="386" y="60" width="270" height="300" rx="40" fill="#1c1c1e" stroke="#d2d2d7" strokeWidth="2" />
      <rect x="286" y="88" width="108" height="244" rx="54" fill="#2a2a2e" />
      <rect x="332" y="104" width="14" height="212" rx="7" fill="#e5e5ea" />
      <rect x="48" y="86" width="210" height="248" rx="24" fill="#111113" />
      <rect x="422" y="86" width="210" height="248" rx="24" fill="#111113" />
    </svg>
  );
}

export function WaterGuard() {
  return (
    <svg className="illus" viewBox="0 0 420 500" aria-hidden="true">
      <Chassis x={90} y={16} w={240} h={460} rx={44} />
      <rect x="104" y="30" width="212" height="432" rx="32" fill="#ece8e2" />
      <text x="210" y="190" textAnchor="middle" fill="#1d1d1f" fontFamily={sans} fontSize="42" fontWeight="600">
        IP68
      </text>
      <rect x="104" y="250" width="212" height="212" fill="#c5d8e8" />
      <path d="M104 250c24-14 48 10 80 10s56-18 80-10 28 8 52 0v22H104Z" fill="#d7e7f3" />
    </svg>
  );
}
