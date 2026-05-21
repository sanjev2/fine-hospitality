"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/sites";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        {
          opacity: 0,
          y: 90,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.35,
          stagger: 0.13,
          delay: 4.9,
          ease: "power4.out",
        }
      );

      gsap.set(".hero-video-inner", {
        opacity: 0,
      });

      gsap.to(".hero-video-inner", {
        opacity: 1,
        duration: 0.45,
        delay: 6.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#090909] text-[#F7F1EA]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,9,0.35),#090909_92%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(215,166,168,0.16),transparent_34%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.045),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-16 pt-32 md:grid-cols-12 lg:px-10">
        {/* LEFT */}
        <div className="md:col-span-7">
          <p className="hero-reveal mb-6 text-[10px] uppercase tracking-[0.6em] text-[#D7A6A8] md:text-xs">
            Luxury Hospitality Academy
          </p>

          <h1 className="hero-reveal font-serif text-[4.25rem] leading-[0.9] tracking-[-0.04em] sm:text-[5.5rem] md:text-[6.75rem] lg:text-[8rem] xl:text-[8.6rem]">
            Fine
            <br />
            Hospitality
            <br />
            Group
          </h1>

          <p className="hero-reveal mt-8 max-w-xl text-base leading-8 text-white/68 md:text-lg">
            {siteConfig.tagline}
            <br />
            Professional barista and bartending training crafted for students
            seeking premium hospitality careers.
          </p>

          <div className="hero-reveal mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#courses"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D7A6A8] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.32em] text-black shadow-[0_0_40px_rgba(215,166,168,0.25)] transition duration-500 hover:bg-[#F7F1EA]"
            >
              Explore Courses

              <ArrowUpRight
                size={18}
                className="transition duration-300 group-hover:rotate-45"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition duration-500 hover:border-[#D7A6A8] hover:bg-[#D7A6A8]/10 hover:text-[#D7A6A8]"
            >
              Enquire Now
            </a>
          </div>
        </div>

        {/* HERO GLASS */}
        <div className="hero-video-card relative flex justify-center md:col-span-5">
          <div
            data-hero-video-target
            className="hero-video-inner relative h-[650px] w-[520px] opacity-0"
          >
            {/* VIDEO INSIDE GLASS */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage: "url('/glass-mask.png')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",

                maskImage: "url('/glass-mask.png')",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                maskPosition: "center",
              }}
            >
              {/* VIDEO */}
              <video
                className="absolute inset-0 h-full w-full object-cover scale-[1.12]"
                src="/videos/hero-barista.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* DEPTH */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />

              {/* LIQUID SHADOW */}
              <div className="absolute bottom-0 h-[30%] w-full bg-gradient-to-t from-black/50 to-transparent" />

              {/* GLASS REFRACTION */}
              <div className="absolute inset-0 backdrop-blur-[1px]" />
            </div>

            {/* GLASS OUTLINE */}
            <img
              src="/glass-mask.png"
              alt="Glass Outline"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"
            />

            {/* LEFT GLOSS */}
            <div className="absolute left-[18%] top-[10%] h-[42%] w-[14%] rounded-full bg-white/[0.10] blur-3xl" />

            {/* RIGHT LIGHT */}
            <div className="absolute right-[18%] top-[12%] h-[60%] w-[1px] bg-white/20 blur-[1px]" />

            {/* BOTTOM LIGHT */}
            <div className="absolute bottom-[8%] left-1/2 h-8 w-[42%] -translate-x-1/2 rounded-full bg-white/[0.06] blur-2xl" />

            {/* GLOW */}
            <div className="absolute inset-0 -z-10 bg-[#D7A6A8]/20 blur-3xl" />
          </div>

          {/* LABEL */}
          <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/[0.06] px-6 py-3 text-[10px] uppercase tracking-[0.38em] text-white/75 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            Master the Craft
          </div>
        </div>
      </div>
    </section>
  );
}