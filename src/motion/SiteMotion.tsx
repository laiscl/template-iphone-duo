import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { drivers, foldIntro, prefersReducedMotion } from "./poses";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pressable = "a, button, .hl-card, .swatch, .storage-option, .pose-pill";

let scroller: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (scroller) scroller.scrollTo(el, { offset: -96, duration: 1.05 });
  else el.scrollIntoView();
}

export function SiteMotion() {
  useGSAP(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -96, duration: 1.05 },
      stopInertiaOnNavigate: true,
    });
    scroller = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    gsap.from(".product-name", { y: 14, opacity: 0, duration: 0.6, ease: "power3.out" });
    gsap.from(".hero-sub p", {
      y: 18,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.18,
    });
    gsap.from(".hero .capsule", {
      y: 22,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.42,
    });

    gsap.utils.toArray<HTMLElement>(".feature-heading").forEach((heading) => {
      if (heading.querySelector(".split-word")) return;
      gsap.from(heading, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 86%" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".feature-copy, .kicker, .spec-stack div").forEach((block) => {
      gsap.from(block, {
        y: 22,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: block, start: "top 88%" },
      });
    });

    gsap.from(".hl-card", {
      y: 36,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.08,
      scrollTrigger: { trigger: ".carousel-track", start: "top 82%" },
    });

    gsap.from(".pose-pill", {
      x: -16,
      opacity: 0,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: { trigger: ".pose-list", start: "top 84%" },
    });

    gsap.to(foldIntro, {
      t: 1,
      duration: 1.05,
      ease: "power3.inOut",
      stagger: 0.12,
      scrollTrigger: { trigger: "#design", start: "top 72%" },
    });

    gsap.fromTo(
      drivers.hero,
      { scrollTilt: 0 },
      {
        scrollTilt: -0.16,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );

    gsap.fromTo(
      drivers.display,
      { fold: 0.82, tilt: -0.52, yaw: 0.04, lift: -0.28, scale: 0.68 },
      {
        fold: 0.06,
        tilt: -0.08,
        yaw: 0,
        lift: 0.05,
        scale: 1.42,
        ease: "none",
        scrollTrigger: {
          trigger: "#tela",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
        },
      },
    );

    gsap.fromTo(
      drivers.camera,
      { cam: 0, yaw: -0.55, lift: 0, fold: 1, scale: 0.78 },
      {
        cam: 1,
        yaw: -1.05,
        lift: 0.04,
        fold: 1,
        scale: 0.86,
        ease: "none",
        scrollTrigger: {
          trigger: "#camera",
          start: "top 75%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      },
    );

    gsap.utils.toArray<HTMLElement>(".story-photo").forEach((photo) => {
      gsap.fromTo(
        photo,
        { y: 28 },
        {
          y: -28,
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });

    const xTo = gsap.quickTo(".cursor", "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(".cursor", "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      gsap.set(".cursor", { opacity: 1 });
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const targetOf = (event: Event) => {
      const node = event.target;
      if (!(node instanceof Element)) return null;
      return node.closest(pressable);
    };

    const onOver = (event: PointerEvent) => {
      const el = targetOf(event);
      if (!el) return;
      if (event.relatedTarget instanceof Node && el.contains(event.relatedTarget)) return;
      if (el.matches(".phone-hit")) {
        const slot = el.closest(".phone-slot");
        if (slot) gsap.to(slot, { scale: 1.025, duration: 0.45, ease: "power3.out" });
        gsap.to(".cursor", { scale: 1.7, duration: 0.35, ease: "power3.out" });
        return;
      }
      if (el.classList.contains("hl-card") || el.closest(".hl-card") === el) {
        gsap.to(el, { y: -8, duration: 0.5, ease: "power3.out" });
      } else if (el.matches("a") && !el.classList.contains("pill")) {
        gsap.to(el, { x: 4, duration: 0.35, ease: "power3.out" });
      } else {
        gsap.to(el, { scale: 1.04, duration: 0.35, ease: "power3.out" });
      }
      gsap.to(".cursor", { scale: 1.7, duration: 0.35, ease: "power3.out" });
    };

    const onOut = (event: PointerEvent) => {
      const el = targetOf(event);
      if (!el) return;
      if (event.relatedTarget instanceof Node && el.contains(event.relatedTarget)) return;
      if (el.matches(".phone-hit")) {
        const slot = el.closest(".phone-slot");
        if (slot) gsap.to(slot, { scale: 1, duration: 0.45, ease: "power3.out" });
      }
      gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      gsap.to(".cursor", { scale: 1, duration: 0.35, ease: "power3.out" });
    };

    const onDown = (event: PointerEvent) => {
      const el = targetOf(event);
      gsap.to(".cursor", { scale: 0.75, duration: 0.16, ease: "power3.out" });
      if (!el || el.matches(".phone-hit")) return;
      gsap.to(el, { scale: 0.96, duration: 0.16, ease: "power3.out" });
    };

    const onUp = (event: PointerEvent) => {
      const el = targetOf(event);
      gsap.to(".cursor", { scale: 1, duration: 0.4, ease: "power3.out" });
      if (!el || el.matches(".phone-hit")) return;
      if (el.classList.contains("hl-card")) {
        gsap.to(el, { scale: 1, duration: 0.4, ease: "power3.out" });
        return;
      }
      const resting = el.matches("a") && !el.classList.contains("pill") ? 1 : 1.04;
      gsap.to(el, { scale: resting, duration: 0.4, ease: "power3.out" });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      scroller = null;
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  });

  return <div className="cursor" aria-hidden="true" />;
}
