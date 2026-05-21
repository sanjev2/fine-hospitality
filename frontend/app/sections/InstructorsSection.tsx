"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { instructors } from "@/data/instructors";

gsap.registerPlugin(ScrollTrigger);

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const instructor = instructors[active];

  function changeInstructor(index: number) {
    if (index === active) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        setActive(index);

        requestAnimationFrame(() => {
          gsap.fromTo(
            [imageWrapRef.current, contentRef.current],
            {
              y: 36,
              autoAlpha: 0,
              filter: "blur(14px)",
              scale: 0.98,
            },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              scale: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power4.out",
            }
          );
        });
      },
    });

    tl.to([imageWrapRef.current, contentRef.current], {
      y: -28,
      autoAlpha: 0,
      filter: "blur(12px)",
      scale: 0.98,
      duration: 0.45,
      stagger: 0.04,
    });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".master-kicker",
        { y: 24, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        }
      );

      gsap.fromTo(
        ".master-title span",
        { yPercent: 120, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".master-stage",
        {
          y: 90,
          scale: 0.96,
          opacity: 0,
          filter: "blur(12px)",
          clipPath: "inset(10% 8% 10% 8% round 2.5rem)",
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: { trigger: ".master-stage", start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".master-tab",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".master-tabs", start: "top 84%" },
        }
      );

      gsap.to(".master-bg-word", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2,
        },
      });

      gsap.to(".master-image-inner", {
        scale: 1.08,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="instructors"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#090909] px-5 py-28 text-[#F7F1EA] sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(215,166,168,0.16),transparent_30%),radial-gradient(circle_at_85%_82%,rgba(165,111,115,0.16),transparent_34%),linear-gradient(135deg,#090909_0%,#121111_52%,#1A120F_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(247,241,234,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,234,.65)_1px,transparent_1px)] [background-size:76px_76px]" />

      <div className="master-bg-word pointer-events-none absolute -left-[9vw] bottom-[-5vw] font-serif text-[23vw] leading-none tracking-[-0.06em] text-[#F7F1EA]/[0.03]">
        MASTERS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="master-kicker mb-5 text-xs uppercase tracking-[0.46em] text-[#D7A6A8]">
              Class Instructors
            </p>

            <h2 className="master-title font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[0.92] tracking-[-0.06em]">
              <span className="block overflow-visible pb-2">
                <span className="block">Meet the</span>
              </span>
              <span className="block overflow-visible pb-2 text-[#D7A6A8]">
                <span className="block">masters.</span>
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-[#E8DCC9]/70 sm:text-lg">
            A focused learning experience guided by hospitality professionals
            who understand craft, service, confidence, and guest presence.
          </p>
        </div>

        <div className="master-stage relative overflow-hidden rounded-[2.75rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.035] p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-5 lg:p-6">
          <div className="grid gap-6 lg:min-h-[700px] lg:grid-cols-[1.15fr_0.85fr]">
            <div
              ref={imageWrapRef}
              className="relative min-h-[560px] overflow-hidden rounded-[2.25rem] border border-[#F7F1EA]/10 bg-[#121111]"
            >
              <div className="master-image-inner absolute inset-0">
                <Image
                  key={instructor.image}
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-top grayscale transition duration-700 hover:grayscale-0"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-[#F7F1EA]/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#F7F1EA]/70 backdrop-blur-xl">
                Instructor Image
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-4 text-xs uppercase tracking-[0.38em] text-[#D7A6A8]">
                  {instructor.role}
                </p>

                <h3 className="max-w-4xl font-serif text-[clamp(4.2rem,8vw,9rem)] leading-[0.84] tracking-[-0.075em] text-[#F7F1EA]">
                  {instructor.name}
                </h3>
              </div>
            </div>

            <div
              ref={contentRef}
              className="relative flex flex-col justify-between rounded-[2.25rem] border border-[#F7F1EA]/10 bg-[#090909]/60 p-7 lg:p-9"
            >
              <div>
                <p className="text-xs uppercase leading-6 tracking-[0.34em] text-[#D7A6A8]">
                  Instructor Profile
                </p>

                <p className="mt-8 text-sm uppercase leading-7 tracking-[0.22em] text-[#E8DCC9]/50">
                  {instructor.subtitle}
                </p>

                <div className="my-8 h-px bg-[#F7F1EA]/10" />

                <p className="text-sm uppercase leading-7 tracking-[0.18em] text-[#9A8F88]">
                  {instructor.experience}
                </p>

                <p className="mt-8 text-[15px] leading-9 text-[#E8DCC9]/75">
                  {instructor.bio}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  {instructor.specialties.slice(0, 5).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#E8DCC9]/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-[#F7F1EA]/10 pt-7">
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#D7A6A8]">
                  Certifications
                </p>

                {instructor.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {instructor.certifications.slice(0, 3).map((cert) => (
                      <span
                        key={cert.title}
                        className="rounded-full border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#E8DCC9]/75"
                      >
                        {cert.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs uppercase leading-6 tracking-[0.24em] text-[#E8DCC9]/45">
                    Certifications & achievements can be added once available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="master-tabs mt-8 grid gap-4 sm:grid-cols-2">
          {instructors.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => changeInstructor(index)}
              className={`master-tab group rounded-[1.5rem] border p-5 text-left backdrop-blur-xl transition duration-500 ${
                active === index
                  ? "border-[#D7A6A8]/45 bg-[#D7A6A8]/10"
                  : "border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.035] hover:border-[#D7A6A8]/30 hover:bg-[#F7F1EA]/[0.06]"
              }`}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#D7A6A8]">
                {item.role}
              </p>

              <div className="flex items-end justify-between gap-5">
                <h4 className="font-serif text-3xl leading-none tracking-[-0.05em] text-[#F7F1EA] sm:text-4xl">
                  {item.name}
                </h4>

                <span className="text-xs uppercase tracking-[0.24em] text-[#E8DCC9]/45">
                  0{index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}