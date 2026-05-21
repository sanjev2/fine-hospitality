// src/components/sections/MissionCocktailsSection.tsx

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const drinks = [
  {
    name: "Espresso",
    label: "Coffee Craft",
    description: "Extraction, crema, balance",
    image: "/images/drink-espresso.png",
  },
  {
    name: "Signature Cocktail",
    label: "Bar Craft",
    description: "Shake, stir, garnish",
    image: "/images/drink-cocktail.png",
  },
  {
    name: "Latte Art",
    label: "Milk Craft",
    description: "Texture, pour, pattern",
    image: "/images/drink-latte.png",
  },
];

export default function MissionCocktailsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % drinks.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mission-kicker", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".mission-word", {
        yPercent: 100,
        opacity: 0,
        filter: "blur(14px)",
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.from(".mission-copy", {
        opacity: 0,
        y: 34,
        duration: 1,
        delay: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 64%",
        },
      });

      gsap.from(".mission-stage", {
        opacity: 0,
        y: 70,
        scale: 0.97,
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".mission-stage",
          start: "top 78%",
        },
      });

      gsap.to(".mission-glow", {
        yPercent: -18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".active-drink-copy",
      {
        opacity: 0,
        y: 24,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      ".active-product-pop",
      {
        scale: 0.86,
        y: 64,
        filter: "blur(10px)",
      },
      {
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "elastic.out(1, 0.72)",
      }
    );
  }, [activeIndex]);

  function getPosition(index: number) {
    const total = drinks.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  }

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#090909] px-5 py-24 text-[#F7F1EA] sm:px-8 md:py-32 lg:px-12"
    >
      <div className="mission-glow pointer-events-none absolute left-[-10rem] top-10 h-96 w-96 rounded-full bg-[#D7A6A8]/16 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-12rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#A56F73]/18 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="mission-kicker mb-6 text-xs uppercase tracking-[0.48em] text-[#D7A6A8]">
              Our Mission
            </p>

            <h2 className="max-w-[780px] font-serif text-[clamp(3.3rem,6.6vw,7.2rem)] leading-[1.02] tracking-[-0.065em]">
              {["Craft", "served", "with", "elegance."].map((word) => (
                <span key={word} className="block overflow-visible pb-5">
                  <span className="mission-word inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="mission-copy max-w-2xl lg:pb-16">
            <p className="text-lg font-medium leading-8 text-[#E8DCC9]/78 md:text-xl md:leading-9">
              Fine Hospitality Group prepares students with beverage mastery,
              refined service, and professional confidence for cafés, bars,
              hotels, and luxury hospitality spaces.
            </p>

            <p className="mt-8 text-xs uppercase tracking-[0.38em] text-[#9A8F88]">
              Coffee · Cocktails · Service · Presence
            </p>
          </div>
        </div>

        <div className="mission-stage relative mx-auto mt-24 h-[590px] max-w-6xl overflow-hidden rounded-[2rem] border border-[#F7F1EA]/10 bg-[#121111] shadow-[0_40px_140px_rgba(0,0,0,0.55)] md:mt-28 md:h-[650px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(215,166,168,0.2),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />

          {drinks.map((drink, index) => {
            const position = getPosition(index);
            const isActive = position === "center";

            const positionClass =
              position === "center"
                ? "left-1/2 z-30 -translate-x-1/2 scale-100 opacity-100 blur-0"
                : position === "right"
                  ? "left-[82%] z-20 -translate-x-1/2 scale-[0.56] opacity-28 blur-[2px]"
                  : "left-[18%] z-20 -translate-x-1/2 scale-[0.56] opacity-28 blur-[2px]";

            return (
              <button
                key={drink.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`absolute top-8 h-[410px] w-[280px] transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] sm:w-[340px] md:top-8 md:h-[500px] md:w-[420px] ${positionClass}`}
                aria-label={`Show ${drink.name}`}
              >
                <div
                  className={`relative h-full w-full ${
                    isActive ? "active-product-pop" : ""
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7A6A8]/25 blur-[80px]" />
                  )}

                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    priority={isActive}
                    sizes="(max-width: 768px) 280px, 420px"
                    className="object-contain drop-shadow-[0_70px_90px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#121111] via-[#121111]/90 to-transparent px-6 pb-10 pt-32 text-center md:px-10 md:pb-12">
            <p className="active-drink-copy text-xs uppercase tracking-[0.46em] text-[#D7A6A8]">
              {drinks[activeIndex].label}
            </p>

            <h3 className="active-drink-copy mt-4 font-serif text-5xl leading-none tracking-[-0.06em] text-[#F7F1EA] md:text-7xl">
              {drinks[activeIndex].name}
            </h3>

            <p className="active-drink-copy mt-5 text-xs uppercase tracking-[0.36em] text-[#9A8F88] md:text-sm">
              {drinks[activeIndex].description}
            </p>

            <div className="mt-8 flex justify-center gap-3">
              {drinks.map((drink, index) => (
                <button
                  key={drink.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "w-10 bg-[#D7A6A8]"
                      : "w-2 bg-[#F7F1EA]/25 hover:bg-[#D7A6A8]/60"
                  }`}
                  aria-label={`Show ${drink.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}