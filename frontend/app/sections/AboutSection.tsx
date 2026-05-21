"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imagePanels = [
  {
    src: "/images/about-1.jpg",
    alt: "Fine Hospitality Group barista training",
    label: "Barista Craft",
  },
  {
    src: "/images/about-2.jpg",
    alt: "Fine Hospitality Group bartending training",
    label: "Bartending Discipline",
  },
  {
    src: "/images/about-3.jpg",
    alt: "Fine Hospitality Group hospitality culture",
    label: "Hospitality Culture",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-word", {
        yPercent: 120,
        opacity: 0,
        filter: "blur(16px)",
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".about-accent", {
        yPercent: 120,
        opacity: 0,
        filter: "blur(18px)",
        duration: 1.2,
        delay: 0.22,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".about-copy", {
        y: 42,
        opacity: 0,
        duration: 1,
        delay: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.from(".about-tagline", {
        opacity: 0,
        y: 24,
        letterSpacing: "0.35em",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 66%",
        },
      });

      gsap.from(".about-main-card", {
        clipPath: "inset(50% 0% 50% 0% round 2rem)",
        scale: 1.08,
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".about-gallery-wrap",
          start: "top 72%",
        },
      });

      gsap.from(".about-panel", {
        opacity: 0,
        y: 80,
        scale: 0.96,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-gallery-wrap",
          start: "top 74%",
        },
      });

      gsap.to(trackRef.current, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-gallery-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(".about-main-image", {
        scale: 1.1,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-gallery-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F1EA] px-5 py-28 text-[#1A120F] sm:px-8 md:py-36 lg:px-12"
    >
      {/* Ambient Editorial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(215,166,168,0.18),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(165,111,115,0.14),transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        {/* LEFT */}
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.42em] text-[#A56F73]">
            About Fine Hospitality Group
          </p>

          <h2 className="font-serif text-[clamp(3.4rem,8vw,9rem)] leading-[0.86] tracking-[-0.075em]">
            <span className="block overflow-hidden">
              <span className="about-word inline-block">Where</span>
            </span>

            <span className="block overflow-hidden">
              <span className="about-word inline-block">
                hospitality
              </span>
            </span>

            <span className="block overflow-hidden">
              <span className="about-accent inline-block italic text-[#A56F73]">
                becomes art.
              </span>
            </span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="about-copy max-w-xl lg:pb-6">
          <p className="text-lg leading-8 text-[#3A2D29] md:text-xl md:leading-9">
            Fine Hospitality Group is a premium barista and bartending academy
            based in Tej Bhawan, Uttardhoka, Lazimpat, Kathmandu — designed for
            students who seek elegance, beverage mastery, refined service, and
            immersive hospitality culture.
          </p>

          <p className="about-tagline mt-8 text-xs uppercase tracking-[0.3em] text-[#9A8F88] md:text-sm">
            BARISTA ACADEMY · BARTENDING ACADEMY · HOSPITALITY CULTURE
          </p>
        </div>
      </div>

      {/* MAIN IMAGE CARD */}
      <div className="about-gallery-wrap relative mx-auto mt-24 max-w-7xl md:mt-28">
        <div className="about-main-card relative h-[540px] overflow-hidden rounded-[2rem] bg-[#121111] shadow-[0_40px_120px_rgba(18,17,17,0.22)] md:h-[650px]">
          <Image
            src="/images/about-1.jpg"
            alt="Luxury hospitality academy"
            fill
            sizes="100vw"
            className="about-main-image object-cover opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#E8DCC9]">
              Master the Craft. Serve with Elegance.
            </p>

            <h3 className="max-w-4xl font-serif text-4xl leading-[0.95] tracking-[-0.05em] text-[#F7F1EA] md:text-6xl">
              Hospitality training shaped with atmosphere, discipline, and
              cinematic presence.
            </h3>
          </div>
        </div>

        {/* FLOATING HORIZONTAL PANELS */}
        <div className="relative -mt-20 overflow-visible md:-mt-28">
          <div
            ref={trackRef}
            className="flex w-max gap-5 pl-[8vw] pr-[20vw] md:gap-7"
          >
            {imagePanels.map((panel, index) => (
              <article
                key={panel.label}
                className="about-panel group relative h-64 w-[72vw] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121111] shadow-[0_24px_70px_rgba(18,17,17,0.24)] sm:w-[430px] md:h-80"
              >
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  fill
                  sizes="(max-width:768px) 72vw, 430px"
                  className="object-cover opacity-85 transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                  <div>
                    <h4 className="font-serif text-3xl tracking-[-0.04em] text-[#F7F1EA]">
                      {panel.label}
                    </h4>
                  </div>

                  <span className="text-xs uppercase tracking-[0.3em] text-[#D7A6A8]">
                    0{index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}