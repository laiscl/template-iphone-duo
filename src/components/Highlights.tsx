import { useEffect, useRef, useState } from "react";
import { CameraBack, CoverPhone, FlowScreen, OpenPair } from "./illustrations";
import { PauseIcon, PlayIcon } from "./Icons";

const cards = [
  { title: "Abre. E continua fino.", art: <OpenPair /> },
  { title: "A imagem atravessa a dobra.", art: <FlowScreen /> },
  { title: "Uma câmera, dois lados.", art: <CameraBack /> },
  { title: "Bateria para o dia aberto.", art: <CoverPhone mode="battery" /> },
];

export function Highlights() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(true);

  const alignTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = [...track.querySelectorAll<HTMLElement>("[data-card]")];
    const card = items[next];
    const first = items[0];
    if (!card || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
    setIndex(next);
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const next = (index + 1) % cards.length;
      const track = trackRef.current;
      const items = track ? [...track.querySelectorAll<HTMLElement>("[data-card]")] : [];
      const card = items[next];
      const first = items[0];
      if (track && card && first) {
        track.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: "smooth" });
      }
      setIndex(next);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [paused, index]);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const items = [...track.querySelectorAll<HTMLElement>("[data-card]")];
    const first = items[0];
    if (!first) return;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    items.forEach((card, cardIndex) => {
      const distance = Math.abs(card.offsetLeft - first.offsetLeft - track.scrollLeft);
      if (distance < bestDist) {
        bestDist = distance;
        best = cardIndex;
      }
    });
    setIndex((current) => (current === best ? current : best));
  };

  return (
    <section className="band" id="destaques">
      <div className="shell band-head">
        <h2 className="feature-heading">Destaques.</h2>
        <a className="text-link" href="#design">
          Ver todos os destaques ›
        </a>
      </div>
      <div
        className="carousel-track"
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Carrossel de destaques"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            alignTo(Math.min(cards.length - 1, index + 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            alignTo(Math.max(0, index - 1));
          }
        }}
      >
        {cards.map((card, cardIndex) => (
          <article className="hl-card" data-card="" key={card.title}>
            <h3>{card.title}</h3>
            <div className="hl-visual" aria-hidden="true">
              {card.art}
            </div>
            <span className="sr-only">
              Destaque {cardIndex + 1} de {cards.length}
            </span>
          </article>
        ))}
      </div>
      <div className="playback-row">
        <div className="playback" role="group" aria-label="Controle do carrossel">
          {cards.map((card, cardIndex) => (
            <button
              key={card.title}
              type="button"
              className="dot"
              aria-label={`Ir para ${card.title}`}
              aria-current={cardIndex === index ? "true" : undefined}
              onClick={() => alignTo(cardIndex)}
            />
          ))}
          <button
            type="button"
            aria-pressed={!paused}
            aria-label={paused ? "Reproduzir destaques" : "Pausar destaques"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      </div>
    </section>
  );
}
