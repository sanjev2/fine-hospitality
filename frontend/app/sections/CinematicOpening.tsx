"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type CinematicOpeningProps = {
  onComplete?: () => void;
};

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const shakerRef = useRef<HTMLDivElement | null>(null);
  const liquidRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const transitionVideoRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const getHeroVideoTarget = () => {
      const target = document.querySelector<HTMLElement>(
        "[data-hero-video-target]"
      );

      if (!target) {
        const width = window.innerWidth < 768 ? 320 : 400;
        const height = window.innerWidth < 768 ? 457 : 571;

        return {
          width,
          height,
          left: window.innerWidth / 2 - width / 2,
          top: window.innerHeight / 2 - height / 2,
        };
      }

      const rect = target.getBoundingClientRect();

      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    };

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.set(loaderRef.current, {
      display: "flex",
      opacity: 1,
      pointerEvents: "auto",
      backgroundColor: "#F7F1EA",
    })
      .set(fillRef.current, {
        scaleY: 0,
        opacity: 1,
        transformOrigin: "50% 100%",
      })
      .set(shakerRef.current, {
        opacity: 0,
        scale: 0.72,
        rotate: 0,
        x: 0,
        y: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      })
      .set(liquidRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 0%",
      })
      .set(introTextRef.current, {
        opacity: 0,
        y: 22,
        filter: "blur(8px)",
      })
      .set(transitionVideoRef.current, {
        autoAlpha: 0,
        display: "none",
        visibility: "hidden",
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        borderRadius: "0px",
        clipPath: "inset(0% 0% 0% 0% round 0px)",
      })

      .to(introTextRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.62,
        ease: "power4.out",
      })

      .to(
        shakerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.25)",
        },
        "-=0.15"
      )

      .to(shakerRef.current, {
        keyframes: [
          { x: -8, rotate: -5, duration: 0.055 },
          { x: 8, rotate: 5, duration: 0.055 },
          { x: -7, rotate: -4.5, duration: 0.055 },
          { x: 7, rotate: 4.5, duration: 0.055 },
          { x: -5, rotate: -3, duration: 0.055 },
          { x: 5, rotate: 3, duration: 0.055 },
          { x: 0, rotate: 0, duration: 0.08 },
        ],
        ease: "sine.inOut",
      })

      .to(shakerRef.current, {
        rotate: -54,
        x: 44,
        y: -24,
        duration: 0.72,
        ease: "expo.inOut",
      })

      .to(
        liquidRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.48,
          ease: "power4.inOut",
        },
        "-=0.28"
      )

      .to(fillRef.current, {
        scaleY: 1,
        duration: 0.72,
        ease: "expo.inOut",
      })

      .to(
        introTextRef.current,
        {
          color: "#F7F1EA",
          duration: 0.22,
        },
        "-=0.48"
      )

      .to(
        [shakerRef.current, liquidRef.current, introTextRef.current],
        {
          opacity: 0,
          y: -18,
          filter: "blur(8px)",
          duration: 0.36,
          ease: "power2.out",
        },
        "-=0.05"
      )

      .set(transitionVideoRef.current, {
        display: "block",
        visibility: "visible",
      })

      .to(transitionVideoRef.current, {
        autoAlpha: 1,
        duration: 0.45,
        ease: "power2.out",
      })

      .to(transitionVideoRef.current, {
        width: () => getHeroVideoTarget().width,
        height: () => getHeroVideoTarget().height,
        left: () => getHeroVideoTarget().left,
        top: () => getHeroVideoTarget().top,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        borderRadius: "999px 999px 48px 48px",
        clipPath: "inset(0% 0% 0% 0% round 999px 999px 48px 48px)",
        duration: 2.15,
        ease: "expo.inOut",
      })

      .to(
        fillRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=1.25"
      )

      .to(
        loaderRef.current,
        {
          backgroundColor: "rgba(9,9,9,0)",
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.95"
      )

      .to(transitionVideoRef.current, {
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.out",
      })

      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.out",
      })

      .set(transitionVideoRef.current, {
        display: "none",
        visibility: "hidden",
      })

      .set(loaderRef.current, {
        display: "none",
        pointerEvents: "none",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F7F1EA]"
    >
      <div
        ref={fillRef}
        className="absolute inset-0 origin-bottom scale-y-0 bg-[#090909]"
      />

      <div
        ref={transitionVideoRef}
        style={{
          display: "none",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
        className="absolute overflow-hidden bg-transparent shadow-[0_40px_160px_rgba(215,166,168,0.2)] will-change-[width,height,left,top,border-radius,clip-path]"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/hero-bartender.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={shakerRef}
          className="relative h-32 w-20 origin-bottom rounded-t-[2.5rem] rounded-b-2xl bg-[#090909] shadow-[0_40px_120px_rgba(0,0,0,0.35)] will-change-transform"
        >
          <div className="absolute -top-5 left-1/2 h-6 w-12 -translate-x-1/2 rounded-t-xl bg-[#090909]" />
          <div className="absolute inset-x-5 top-7 h-16 rounded-full border border-[#D7A6A8]/50" />
          <div className="absolute bottom-5 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-[#D7A6A8]" />
        </div>

        <div
          ref={liquidRef}
          className="mt-4 h-[45vh] w-3 origin-top scale-y-0 rounded-full bg-[#090909] opacity-0 will-change-transform"
        />

        <div ref={introTextRef} className="mt-10 text-center text-[#090909]">
          <p className="font-serif text-4xl">Fine</p>
          <p className="mt-2 text-xs uppercase tracking-[0.5em]">
            Hospitality Group
          </p>
        </div>
      </div>
    </div>
  );
}