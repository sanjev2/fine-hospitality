"use client";

import { useEffect, useRef } from "react";
import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  Lightbulb,
  UserRoundCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: UserRoundCheck,
    title: "Expert Trainers",
    description:
      "Learn from skilled hospitality professionals with real café, bar, hotel, and service experience.",
  },
  {
    icon: Award,
    title: "Industry Recognized Certificates",
    description:
      "Complete your training with certificates designed to support your hospitality career path.",
  },
  {
    icon: Lightbulb,
    title: "Practical Learning",
    description:
      "Hands-on barista and bartending training focused on real service situations.",
  },
  {
    icon: Handshake,
    title: "100% Job Support Assistance",
    description:
      "Guidance and support to help students prepare for cafés, bars, hotels, and restaurants.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Guaranteed International Internship",
    description:
      "Pathway support for students aiming to gain international hospitality exposure.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Guidance",
    description:
      "Individual attention to help students build confidence, discipline, and service presence.",
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-kicker",
        { y: 24, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".why-title-line span",
        { yPercent: 115, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        }
      );

      gsap.fromTo(
        ".why-copy",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 64%" },
        }
      );

      gsap.fromTo(
        ".why-image-shell",
        {
          y: 90,
          scale: 0.96,
          rotate: -1.5,
          opacity: 0,
          clipPath: "inset(14% 10% 14% 10% round 3rem)",
        },
        {
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 3rem)",
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: { trigger: ".why-stage", start: "top 76%" },
        }
      );

      gsap.fromTo(
        ".why-card",
        { y: 60, opacity: 0, filter: "blur(10px)", scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.08,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: { trigger: ".why-card-stack", start: "top 80%" },
        }
      );

      gsap.to(".why-bg-word", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2,
        },
      });

      gsap.to(".why-image-inner", {
        scale: 1.08,
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".why-card:nth-child(odd)", {
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.8,
        },
      });

      gsap.to(".why-card:nth-child(even)", {
        y: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F7F1EA] px-5 py-28 text-[#1A120F] sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(215,166,168,0.35),transparent_30%),radial-gradient(circle_at_84%_80%,rgba(232,220,201,0.95),transparent_38%),linear-gradient(135deg,#F7F1EA_0%,#E8DCC9_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(26,18,15,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(26,18,15,.14)_1px,transparent_1px)] [background-size:78px_78px]" />

      <div className="why-bg-word pointer-events-none absolute -left-[8vw] bottom-[-5vw] font-serif text-[25vw] leading-none tracking-[-0.07em] text-[#1A120F]/[0.04]">
        WHY
      </div>

      <div className="pointer-events-none absolute left-[5%] top-24 h-80 w-80 rounded-full bg-[#D7A6A8]/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[8%] h-96 w-96 rounded-full bg-[#A56F73]/18 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.76fr] lg:items-end">
          <div>
            <p className="why-kicker mb-5 text-xs uppercase tracking-[0.46em] text-[#A56F73]">
              Why Choose Fine Hospitality
            </p>

            <h2 className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.065em]">
              <span className="why-title-line block overflow-visible pb-2">
                <span className="block">Why choose</span>
              </span>
              <span className="why-title-line block overflow-visible pb-2 text-[#A56F73]">
                <span className="block">Fine Hospitality?</span>
              </span>
            </h2>
          </div>

          <p className="why-copy max-w-xl text-base leading-8 text-[#1A120F]/65 sm:text-lg">
            Practical hospitality education shaped around expert trainers,
            recognized certificates, career support, international exposure, and
            confident service delivery.
          </p>
        </div>

        <div className="mb-10 h-px bg-[#1A120F]/15" />

        <div className="why-stage grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="why-image-shell relative min-h-[680px] overflow-hidden rounded-[3rem] border border-[#1A120F]/10 bg-[#1A120F] shadow-[0_35px_100px_rgba(26,18,15,0.18)]">
            <div className="why-image-inner absolute inset-0 bg-[linear-gradient(135deg,rgba(9,9,9,0.18),rgba(26,18,15,0.12)_38%,rgba(9,9,9,0.65)),url('/images/why-choose/why-choose-main.jpg')] bg-cover bg-center" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(247,241,234,0.05),transparent_32%),linear-gradient(to_top,rgba(9,9,9,0.88),rgba(9,9,9,0.08)_52%,rgba(9,9,9,0.2))]" />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(215,166,168,0.16),transparent_42%,rgba(232,220,201,0.12))]" />

            <div className="absolute left-7 top-7 rounded-full border border-[#F7F1EA]/15 bg-black/30 px-5 py-3 text-[10px] uppercase tracking-[0.34em] text-[#F7F1EA]/80 backdrop-blur-xl">
              Fine Hospitality Group
            </div>

            <div className="absolute bottom-8 left-7 right-7">
              <p className="mb-4 text-xs uppercase tracking-[0.42em] text-[#D7A6A8]">
                Luxury Barista + Bartending Academy
              </p>

              <h3 className="max-w-3xl font-serif text-[clamp(3.4rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.065em] text-[#F7F1EA]">
                Skill shaped through real hospitality practice.
              </h3>
            </div>
          </div>

          <div className="why-card-stack grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className={`why-card group relative overflow-hidden rounded-[1.75rem] border border-[#1A120F]/10 bg-[#F7F1EA]/80 p-5 shadow-[0_24px_70px_rgba(26,18,15,0.1)] backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#A56F73]/35 hover:bg-[#F7F1EA] lg:p-6 ${
                    index % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D7A6A8]/25 blur-3xl transition duration-700 group-hover:scale-125" />

                  <div className="relative flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] border border-[#1A120F]/10 bg-gradient-to-br from-[#090909] to-[#2A1F1B] text-[#D7A6A8] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition duration-700 group-hover:scale-105 group-hover:from-[#A56F73] group-hover:to-[#1A120F] group-hover:text-[#F7F1EA]">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl leading-[1.05] tracking-[-0.035em] text-[#1A120F] sm:text-3xl">
                        {reason.title}
                      </h3>

                      <p className="mt-4 border-t border-[#1A120F]/10 pt-4 text-sm leading-7 text-[#1A120F]/62">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#1A120F]/10 pt-6 text-xs uppercase tracking-[0.28em] text-[#1A120F]/45 sm:flex-row sm:items-center sm:justify-between">
          <span>Expert Trainers</span>
          <span>Recognized Certificates</span>
          <span>International Internship</span>
        </div>
      </div>
    </section>
  );
}