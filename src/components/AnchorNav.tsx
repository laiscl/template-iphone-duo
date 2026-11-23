import { useEffect, useState } from "react";
import { anchors } from "../data";

export function AnchorNav() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const nodes = anchors
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={current ? "anchors is-tracking" : "anchors"} aria-label="Nesta página">
      {anchors.map((item) => (
        <a key={item.id} href={`#${item.id}`} aria-current={current === item.id ? "true" : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
