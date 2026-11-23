import { useState } from "react";
import type { PoseId } from "../motion/poses";
import { SplitHeading } from "../motion/SplitHeading";
import { PhoneSlot } from "../three/PhoneSlot";

const poses: { id: PoseId; label: string; copy: string }[] = [
  { id: "landscape", label: "Landscape", copy: "Open flat, the inner display is wide enough for a film, a map, and a message at once." },
  { id: "portrait", label: "Portrait", copy: "Turn it upright and each half stays a full app, with the hinge out of the way." },
  { id: "closed", label: "Closed", copy: "Folded, it is a pocket phone. The outer display keeps the day in view." },
  { id: "seated", label: "Seated", copy: "Prop it like a tent on the table for a call or a show." },
  { id: "standing", label: "Standing", copy: "Stand it up and the screen faces you while the back stays planted." },
  { id: "durability", label: "Durability", copy: "The hinge is built for daily open-and-close, with a seal rated IP68." },
];

export function Stories() {
  const [pose, setPose] = useState<PoseId>("landscape");
  const active = poses.find((item) => item.id === pose) ?? {
    copy: "Aberto, fechado ou em tenda: a dobradiça acompanha o clique.",
  };

  return (
    <>
      <section className="story reveal" id="design">
        <div className="shell">
          <SplitHeading className="feature-heading center-title" text="A new iPhone enters the fold." />
          <p className="feature-copy center-copy">
            The largest display ever — 50 percent larger than iPhone 18 Pro Max — with an outer display
            that still fits a pocket. It is an iPhone unlike any iPhone.
          </p>
          <div className="pose-row">
            <PhoneSlot pose="closed" screen="back" introIndex={0} />
            <PhoneSlot pose="open" screen="home" introIndex={1} />
            <PhoneSlot pose="closed" screen="lock" introIndex={2} />
          </div>
        </div>
      </section>

      <section className="band reveal" id="closer">
        <div className="shell">
          <SplitHeading className="feature-heading" text="Take a closer look." />
          <div className="closer">
            <div>
              <p className="feature-copy">{active.copy}</p>
              <div className="pose-list">
                {poses.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="pose-pill"
                    aria-pressed={pose === item.id}
                    onClick={() => setPose(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="closer-stage">
              <PhoneSlot
                pose={pose}
                onPoseChange={setPose}
                screen={pose === "closed" ? "back" : "home"}
                label="Modelo de Take a closer look. Clique para alternar a dobradiça."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="story display-pin" id="tela">
        <div className="display-sticky">
          <div className="shell display-grid">
            <div>
              <SplitHeading className="feature-heading" text="Expansive display." />
              <p className="feature-copy">
                iPhone Duo offers the most immersive viewing experience of any iPhone. The 7.6-inch inner
                display stays consistent with the outer one, with a nano-texture finish that cuts glare.
              </p>
            </div>
            <dl className="spec-stack">
              <div>
                <dt>Nano-texture finish</dt>
                <dd>on the inner display to reduce glare</dd>
              </div>
              <div>
                <dt>Wide-angle OLEDs</dt>
                <dd>for excellent viewing angles</dd>
              </div>
              <div>
                <dt>3000 nits</dt>
                <dd>peak brightness</dd>
              </div>
            </dl>
          </div>
          <div className="shell display-stage">
            <PhoneSlot
              driver="display"
              screen="home"
              label="Tela expansiva. A abertura acompanha a rolagem."
            />
          </div>
        </div>
      </section>

      <section className="story reveal" id="versatility">
        <div className="shell center-block">
          <p className="kicker">Versatility</p>
          <SplitHeading className="feature-heading" text="Reimagined iOS. Anything’s possible." />
        </div>
      </section>

      <section className="band reveal" id="day">
        <div className="shell">
          <SplitHeading className="feature-heading" text="Whatever shape your day takes." />
          <div className="duo-cards">
            <article className="feature-card">
              <h3 className="feature-heading">Split View multitasking.</h3>
              <p className="feature-copy">
                Browse the photo library on one side and drag a picture into Mail on the other.
              </p>
              <div className="feature-art">
                <PhoneSlot screen="home" />
              </div>
            </article>
            <article className="feature-card">
              <h3 className="feature-heading">Siri AI.</h3>
              <p className="feature-copy">
                Ask questions on a larger canvas. The conversation stays beside whatever you are doing.
              </p>
              <div className="feature-art">
                <PhoneSlot screen="lock" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="story reveal" id="camera">
        <div className="shell camera-grid">
          <div>
            <p className="kicker">Advanced camera system</p>
            <SplitHeading className="feature-heading" text="Your new favorite camera features. Hands down." />
            <p className="feature-copy">
              Duo Preview and Kid Cue help everyone look their best. Capture 48MP photos and 4K 120 fps
              video, then stay in the moment instead of behind the lens.
            </p>
          </div>
          <div className="camera-stage">
            <PhoneSlot driver="camera" screen="back" pose="closed" label="Módulo de câmera. Ele gira com a rolagem." />
          </div>
        </div>
      </section>

      <section className="band reveal" id="stunning">
        <div className="shell">
          <SplitHeading className="feature-heading" text="Set to stunning." />
          <div className="duo-cards">
            <article className="feature-card">
              <img className="story-photo" src="/memory-portrait.jpg" alt="Portrait with a flower" />
              <h3 className="feature-heading">Photographic Styles.</h3>
              <p className="feature-copy">Tune tone and color, then keep the picture true to what you saw.</p>
            </article>
            <article className="feature-card">
              <img className="story-photo" src="/dune-wallpaper.jpg" alt="Desert landscape" />
              <h3 className="feature-heading">Intelligent photo editing.</h3>
              <p className="feature-copy">Reframe after the shot, extend the canvas, and clean up distractions.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="story reveal" id="chip">
        <div className="shell">
          <p className="kicker">Performance and battery life</p>
          <SplitHeading className="feature-heading" text="Power on full display." />
          <p className="feature-copy">
            The A20 Pro chip and a vapor chamber keep intensive work, and long games, inside a thin body.
          </p>
          <div className="battery-stats">
            <div>
              <p className="feature-heading">31 hours</p>
              <p className="feature-copy">video playback on the inner display</p>
            </div>
            <div>
              <p className="feature-heading">44 hours</p>
              <p className="feature-copy">video playback on the outer display</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band reveal" id="family">
        <div className="shell center-block">
          <p className="kicker">All in the family</p>
          <SplitHeading className="feature-heading" text="All the must-haves. All on iPhone." />
        </div>
        <div className="shell display-stage family-stage">
          <PhoneSlot screen="home" />
        </div>
      </section>

      <section className="story reveal" id="connect">
        <div className="shell">
          <SplitHeading className="feature-heading" text="Connectivity. Peace of mind in your pocket." />
          <div className="duo-cards">
            <article className="feature-card">
              <h3 className="feature-heading">eSIM.</h3>
              <p className="feature-copy">Transfer a number without a physical card. Useful when you travel.</p>
            </article>
            <article className="feature-card">
              <h3 className="feature-heading">Messages via satellite.</h3>
              <p className="feature-copy">Send and receive when you are off the grid and still need to check in.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band reveal" id="accessories">
        <div className="shell center-block">
          <p className="kicker">Accessories</p>
          <SplitHeading className="feature-heading" text="Snap it on. Stand it up." />
          <p className="feature-copy">
            iPhone Duo Case adds a light shell in a few colors. iPhone Duo Folio with Kickstand holds a
            range of viewing angles.
          </p>
          <a className="text-link" href="#preco">
            Shop iPhone Duo ›
          </a>
        </div>
      </section>
    </>
  );
}
