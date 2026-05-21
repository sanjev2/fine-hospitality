// src/lib/animations.ts

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function revealUp(
  selector: string,
  trigger: Element | string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
    delay?: number;
  }
) {
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: options?.y ?? 70,
      filter: "blur(14px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: options?.duration ?? 1.15,
      stagger: options?.stagger ?? 0.12,
      delay: options?.delay ?? 0,
      ease: "power4.out",
      scrollTrigger: {
        trigger,
        start: options?.start ?? "top 72%",
      },
    }
  );
}

export function imageReveal(
  selector: string,
  trigger: Element | string,
  options?: {
    scale?: number;
    start?: string;
    stagger?: number;
  }
) {
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale: options?.scale ?? 1.14,
      clipPath: "inset(18% 18% 18% 18% round 36px)",
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 36px)",
      filter: "blur(0px)",
      duration: 1.35,
      stagger: options?.stagger ?? 0.12,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger,
        start: options?.start ?? "top 72%",
      },
    }
  );
}

export function parallax(
  selector: string,
  trigger: Element | string,
  yPercent = -12
) {
  return gsap.to(selector, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}