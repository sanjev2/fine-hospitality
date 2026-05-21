"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Fine Hospitality Group changed how I serve. The training gave me confidence, posture, rhythm, and the discipline luxury hospitality demands.",
    name: "Aarav Shrestha",
    role: "Bartending Graduate",
  },
  {
    quote:
      "It felt polished, practical, and deeply professional. Every detail taught us how to serve with elegance.",
    name: "Nisha Gurung",
    role: "Barista Graduate",
  },
  {
    quote:
      "You do not just learn drinks here. You learn presence, guest handling, and the theatre behind great service.",
    name: "Samir Thapa",
    role: "Hospitality Professional",
  },
  {
    quote:
      "The instructors made luxury service feel calm, practical, and achievable.",
    name: "Riya Lama",
    role: "Hospitality Student",
  },
  {
    quote:
      "The environment, the details, and the way they teach confidence behind the counter is unlike any class I have taken.",
    name: "Kiran Bista",
    role: "Barista Trainee",
  },
  {
    quote:
      "The course helped me understand not just drinks, but how to carry myself in front of guests.",
    name: "Manish Rai",
    role: "Bartending Student",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const [featured, ...rest] = testimonials;

  const duplicated = useMemo(() => [...rest, ...rest], [rest]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ts-kicker",
        { y: 24, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".ts-title-line span",
        { yPercent: 120, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".ts-copy",
        { y: 30, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
          },
        }
      );

      gsap.fromTo(
        ".ts-feature",
        {
          y: 90,
          x: -40,
          rotate: -2,
          scale: 0.96,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".ts-stage",
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        ".ts-card",
        {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
          rotate: 1.5,
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          rotate: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".ts-wall",
            start: "top 82%",
          },
        }
      );

      gsap.to(".ts-feature", {
        y: -16,
        rotate: 0.35,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ts-quote-mark", {
        y: -18,
        rotate: -4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ts-bg-word", {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      if (railRef.current) {
        gsap.to(railRef.current, {
          y: "-50%",
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".ts-hover");

      cards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(card, {
            rotateY: ((x / rect.width) - 0.5) * 5,
            rotateX: ((y / rect.height) - 0.5) * -5,
            transformPerspective: 1200,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#090909] px-5 py-28 text-[#F7F1EA] sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(215,166,168,0.18),transparent_28%),radial-gradient(circle_at_85%_85%,rgba(165,111,115,0.14),transparent_32%),linear-gradient(135deg,#121111_0%,#090909_52%,#1A120F_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(247,241,234,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,234,.7)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="ts-bg-word pointer-events-none absolute -left-[8vw] bottom-[-6vw] font-serif text-[28vw] leading-none text-[#F7F1EA]/[0.03]">
        TRUST
      </div>

      <div className="pointer-events-none absolute left-[5%] top-24 h-72 w-72 rounded-full bg-[#D7A6A8]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-[8%] h-96 w-96 rounded-full bg-[#A56F73]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="ts-kicker mb-5 text-xs uppercase tracking-[0.42em] text-[#D7A6A8]">
              Voices of Craft
            </p>

            <h2 className="font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              <span className="ts-title-line block overflow-hidden">
                <span className="block">Students</span>
              </span>

              <span className="ts-title-line block overflow-hidden text-[#D7A6A8]">
                <span className="block">remember us</span>
              </span>
            </h2>
          </div>

          <p className="ts-copy max-w-xl text-base leading-8 text-[#E8DCC9]/70 lg:ml-auto">
            Real words from people trained in discipline, service, confidence,
            and luxury hospitality presence.
          </p>
        </div>

        <div className="mb-12 h-px bg-[#F7F1EA]/10" />

        <div className="ts-stage grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <article className="ts-feature ts-hover group relative z-20 overflow-visible rounded-[2rem] border border-[#F7F1EA]/10 bg-[#121111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-700 ease-out hover:border-[#D7A6A8]/35 sm:p-10 lg:p-12">
              <div className="ts-quote-mark pointer-events-none absolute -right-8 -top-14 font-serif text-[13rem] leading-none text-[#D7A6A8]/10">
                ”
              </div>

              <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#D7A6A8]/10 blur-3xl transition duration-700 group-hover:scale-125" />

              <p className="relative font-serif text-3xl leading-[1.12] sm:text-5xl">
                “{featured.quote}”
              </p>

              <div className="relative mt-12 border-t border-[#F7F1EA]/10 pt-6">
                <h3 className="text-sm uppercase tracking-[0.28em]">
                  {featured.name}
                </h3>

                <p className="mt-2 text-sm text-[#9A8F88]">{featured.role}</p>
              </div>
            </article>
          </div>

          <div className="ts-wall relative h-[640px] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-44 bg-gradient-to-b from-[#090909] via-[#090909]/90 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-[#090909] to-transparent" />

            <div ref={railRef} className="flex flex-col gap-5">
              {duplicated.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className={`ts-card ts-hover group relative overflow-visible rounded-[1.7rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.055] p-7 backdrop-blur-xl transition duration-700 ease-out hover:border-[#D7A6A8]/40 hover:bg-[#F7F1EA]/[0.085] ${
                    index % 2 === 0 ? "mr-10" : "ml-14"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#D7A6A8]/10 blur-3xl transition duration-700 group-hover:scale-125" />

                  <p className="relative font-serif text-2xl leading-[1.2] text-[#F7F1EA]">
                    “{item.quote}”
                  </p>

                  <div className="relative mt-8 border-t border-[#F7F1EA]/10 pt-5">
                    <h3 className="text-xs uppercase tracking-[0.26em]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#9A8F88]">{item.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#F7F1EA]/10 pt-6 text-xs uppercase tracking-[0.28em] text-[#E8DCC9]/45 sm:flex-row sm:items-center sm:justify-between">
          <span>Master the Craft</span>
          <span>Serve with Elegance</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </section>
  );
}