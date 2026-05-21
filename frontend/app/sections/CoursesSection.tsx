// src/components/sections/CoursesSection.tsx

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Coffee, Martini, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { courses } from "@/data/courses";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  barista: Coffee,
  "bartending-basic": Martini,
  "bartending-intermediate": Martini,
};

type SelectedCourse = (typeof courses)[number];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(
    null
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".courses-reveal", {
        opacity: 0,
        y: 28,
        filter: "blur(10px)",
        stagger: 0.08,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
      });

      gsap.fromTo(
        ".course-card",
        {
          y: 54,
          scale: 0.96,
          filter: "blur(10px)",
        },
        {
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".courses-grid",
            start: "top 88%",
          },
        }
      );

      gsap.to(".courses-glow", {
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

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#090909] px-5 py-24 text-[#F7F1EA] sm:px-8 md:py-32 lg:px-12"
    >
      <div className="courses-glow pointer-events-none absolute left-[-10rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#D7A6A8]/12 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-12rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#A56F73]/14 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-[0.95fr_0.75fr] lg:items-end lg:justify-between">
          <div>
            <p className="courses-reveal mb-6 text-xs uppercase tracking-[0.48em] text-[#D7A6A8]">
              Programs
            </p>

            <h2 className="courses-reveal max-w-3xl font-serif text-[clamp(3.2rem,5.8vw,6.6rem)] leading-[0.98] tracking-[-0.07em]">
              Courses for serious craft.
            </h2>
          </div>

          <p className="courses-reveal max-w-xl pb-2 text-lg leading-8 text-[#E8DCC9]/72 md:text-xl md:leading-9 lg:justify-self-end">
            Practical barista and bartending pathways designed for skill,
            confidence, service discipline, and elegant presentation.
          </p>
        </div>

        <div className="courses-grid grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = iconMap[course.id as keyof typeof iconMap] ?? Coffee;

            return (
              <article
                key={course.id}
                className="course-card group relative flex min-h-[720px] origin-center flex-col overflow-hidden rounded-[2rem] border border-[#F7F1EA]/10 bg-[#121111] shadow-[0_28px_90px_rgba(0,0,0,0.36)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:z-20 hover:-translate-y-5 hover:scale-[1.035] hover:border-[#D7A6A8]/55 hover:shadow-[0_45px_140px_rgba(215,166,168,0.16)]"
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(215,166,168,0.09),transparent_58%)] opacity-0 transition duration-700 group-hover:opacity-100" />

                <div className="relative h-64 shrink-0 overflow-hidden bg-[#1A120F] md:h-72">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-78 grayscale transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#121111] via-[#121111]/28 to-transparent" />

                  <p className="absolute right-5 top-5 z-20 font-serif text-7xl leading-none text-[#D7A6A8]/16 md:text-8xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <span className="absolute left-5 top-5 z-20 rounded-full bg-[#D7A6A8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#090909] shadow-[0_12px_40px_rgba(215,166,168,0.18)]">
                    {course.badge}
                  </span>
                </div>

                <div className="relative z-20 flex flex-1 flex-col p-6 md:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-full border border-[#D7A6A8]/20 bg-[#D7A6A8]/12 p-3 text-[#D7A6A8] transition duration-500 group-hover:scale-110 group-hover:bg-[#D7A6A8]/18">
                      <Icon size={24} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F7F1EA]/10 text-[#F7F1EA] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-[#D7A6A8]/60 group-hover:text-[#D7A6A8]"
                      aria-label={`View ${course.title}`}
                    >
                      <ArrowUpRight size={19} />
                    </button>
                  </div>

                  <p className="mb-3 min-h-[14px] text-xs uppercase tracking-[0.32em] text-[#9A8F88]">
                    {course.category}
                  </p>

                  <h3 className="min-h-[80px] font-serif text-3xl leading-[1.02] tracking-[-0.045em] md:text-4xl">
                    {course.title}
                  </h3>

                  <p className="mt-5 min-h-[112px] text-sm leading-7 text-[#E8DCC9]/68 md:text-base">
                    {course.description}
                  </p>

                  <div className="mt-6 flex min-h-[84px] flex-wrap content-start gap-2">
                    {course.highlights.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.025] px-3 py-2 text-xs text-[#E8DCC9]/70 transition duration-500 group-hover:border-[#D7A6A8]/25"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-5 border-t border-[#F7F1EA]/10 pt-6">
                    <div>
                      <p className="text-sm text-[#9A8F88] line-through">
                        {course.originalPrice}
                      </p>
                      <p className="mt-1 font-serif text-3xl text-[#D7A6A8]">
                        {course.price}
                      </p>
                    </div>

                    <p className="text-right text-xs uppercase tracking-[0.22em] text-[#E8DCC9]/65">
                      {course.duration}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F7F1EA] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#090909] transition-all duration-500 hover:bg-[#D7A6A8] group-hover:shadow-[0_18px_60px_rgba(247,241,234,0.12)]"
                  >
                    View Details
                    <ArrowUpRight
                      size={17}
                      className="transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090909]/82 px-4 backdrop-blur-xl">
          <div className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-[#F7F1EA]/10 bg-[#121111] p-6 text-[#F7F1EA] shadow-[0_40px_140px_rgba(0,0,0,0.65)] md:p-9">
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#F7F1EA]/10 text-[#F7F1EA] transition hover:border-[#D7A6A8]/60 hover:text-[#D7A6A8]"
              aria-label="Close course details"
            >
              <X size={20} />
            </button>

            <p className="mb-4 text-xs uppercase tracking-[0.42em] text-[#D7A6A8]">
              {selectedCourse.category}
            </p>

            <h3 className="max-w-3xl pr-12 font-serif text-5xl leading-none tracking-[-0.06em] md:text-7xl">
              {selectedCourse.title}
            </h3>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#D7A6A8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#090909]">
                {selectedCourse.badge}
              </span>

              <span className="rounded-full border border-[#F7F1EA]/10 px-4 py-2 text-sm text-[#E8DCC9]/75">
                {selectedCourse.duration}
              </span>

              <span className="rounded-full border border-[#F7F1EA]/10 px-4 py-2 text-sm text-[#E8DCC9]/75">
                <span className="mr-2 text-[#9A8F88] line-through">
                  {selectedCourse.originalPrice}
                </span>
                {selectedCourse.price}
              </span>
            </div>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#E8DCC9]/75">
              {selectedCourse.description}
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {selectedCourse.curriculum.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex gap-4 rounded-2xl border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.03] p-4"
                >
                  <span className="font-serif text-2xl leading-none text-[#D7A6A8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-[#E8DCC9]/75">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setSelectedCourse(null)}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#F7F1EA] px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#090909] transition hover:bg-[#D7A6A8]"
            >
              Enquire Now
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}