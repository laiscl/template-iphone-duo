import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "./poses";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3";

export function SplitHeading({
  as = "h2",
  className,
  text,
}: {
  as?: Tag;
  className?: string;
  text: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const TagName = as;
  const parts = text.split(/(\s+)/);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".split-word");
      if (!words?.length || prefersReducedMotion()) return;
      gsap.from(words, {
        yPercent: 112,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
        },
      });
    },
    { scope: ref },
  );

  return (
    <TagName ref={ref} className={className}>
      {parts.map((part, index) =>
        part.trim() === "" ? (
          <span key={index}> </span>
        ) : (
          <span className="split-mask" key={index}>
            <span className="split-word">{part}</span>
          </span>
        ),
      )}
    </TagName>
  );
}
