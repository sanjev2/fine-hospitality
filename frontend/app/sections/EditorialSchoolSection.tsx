// src/components/sections/EditorialSchoolSection.tsx

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featurePoints = [
  "Hands-on barista training",
  "Cocktail technique & service",
  "Premium hospitality etiquette",
];

export default function EditorialSchoolSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".school-kicker", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
        },
      });

      gsap.from(".school-line", {
        yPercent: 115,
        opacity: 0,
        filter: "blur(14px)",
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.from(".school-copy-item", {
        opacity: 0,
        y: 34,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
        },
      });

      gsap.from(".school-image-main", {
        clipPath: "inset(0% 50% 0% 50% round 2rem)",
        scale: 1.08,
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".school-visual-wrap",
          start: "top 72%",
        },
      });

      gsap.from(".school-image-small", {
        clipPath: "inset(50% 0% 50% 0% round 1.5rem)",
        y: 48,
        opacity: 0,
        scale: 0.94,
        duration: 1.15,
        delay: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".school-visual-wrap",
          start: "top 70%",
        },
      });

      gsap.from(".school-floating-card", {
        opacity: 0,
        y: 38,
        scale: 0.92,
        duration: 1,
        delay: 0.32,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".school-visual-wrap",
          start: "top 70%",
        },
      });

      gsap.to(".school-main-img", {
        scale: 1.08,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.25,
        },
      });

      gsap.to(".school-small-img", {
        scale: 1.08,
        xPercent: -4,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.25,
        },
      });

      gsap.to(".school-glow", {
        yPercent: -16,
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

  return (
    <section
      id="school"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F1EA] px-5 py-24 text-[#1A120F] sm:px-8 md:py-32 lg:px-12"
    >
      <div className="school-glow pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#D7A6A8]/28 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-14rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[#A56F73]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="school-kicker mb-7 text-xs uppercase tracking-[0.48em] text-[#A56F73]">
              About the School
            </p>

            <h2 className="font-serif text-[clamp(3rem,5.2vw,5.8rem)] leading-[1.04] tracking-[-0.065em]">
              <span className="block overflow-visible pb-3">
                <span className="school-line inline-block">Built for</span>
              </span>
              <span className="block overflow-visible pb-3">
                <span className="school-line inline-block">
                  modern hospitality.
                </span>
              </span>
            </h2>

            <div className="mt-8 max-w-xl">
              <p className="school-copy-item text-lg leading-8 text-[#1A120F]/70 md:text-xl md:leading-9">
                Fine Hospitality Group is built for students who want more than
                basic training. We shape craft, rhythm, confidence, body
                language, guest service, and premium presentation through a
                refined academy experience.
              </p>

              <div className="school-copy-item mt-8 space-y-4 border-l border-[#A56F73]/30 pl-6">
                {featurePoints.map((point) => (
                  <p
                    key={point}
                    className="text-xs uppercase tracking-[0.28em] text-[#9A8F88]"
                  >
                    {point}
                  </p>
                ))}
              </div>

              <a
                href="#contact"
                className="school-copy-item mt-10 inline-flex items-center gap-3 rounded-full bg-[#1A120F] px-7 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#F7F1EA] transition duration-500 hover:bg-[#A56F73]"
              >
                Join the Class
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="school-visual-wrap relative min-h-[620px] lg:min-h-[700px]">
            <div className="school-image-main absolute right-0 top-0 h-[520px] w-[76%] overflow-hidden rounded-[2rem] bg-[#121111] shadow-[0_34px_110px_rgba(26,18,15,0.18)] sm:w-[68%] md:h-[610px]">
              <Image
                src="/images/school-1.png"
                alt="Fine Hospitality Group practical academy training"
                fill
                sizes="(max-width: 768px) 76vw, 48vw"
                className="school-main-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/45 via-transparent to-transparent" />
            </div>

            <div className="school-image-small absolute -left-3 bottom-4 h-[280px] w-[42%] overflow-hidden rounded-[1.5rem] bg-[#121111] shadow-[0_30px_90px_rgba(26,18,15,0.22)] sm:-left-8 md:bottom-0 md:h-[350px] md:w-[38%] lg:-left-10">
              <Image
                src="/images/school-2.png"
                alt="Fine Hospitality Group hospitality classroom detail"
                fill
                sizes="(max-width: 768px) 42vw, 26vw"
                className="school-small-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/45 via-transparent to-transparent" />
            </div>

            <div className="school-floating-card absolute bottom-6 right-3 w-[210px] rounded-[1.5rem] border border-[#F7F1EA]/15 bg-[#121111]/88 p-5 text-[#F7F1EA] shadow-[0_24px_80px_rgba(9,9,9,0.3)] backdrop-blur-xl sm:right-12 md:bottom-10 md:w-[225px]">
              <div className="flex items-end justify-between gap-4">
                <p className="font-serif text-5xl leading-none text-[#D7A6A8]">
                  2
                </p>
                <p className="pb-1 text-right text-[10px] uppercase leading-5 tracking-[0.28em] text-[#E8DCC9]/70">
                  Core Programs
                </p>
              </div>

              <div className="mt-5 h-px w-full bg-[#F7F1EA]/10" />

              <p className="mt-4 text-sm leading-6 text-[#E8DCC9]/68">
                Barista and bartending pathways for confident, elegant service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}