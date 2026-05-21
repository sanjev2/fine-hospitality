// src/components/sections/GallerySection.tsx

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/images/gallery-1.jpg", label: "Training", title: "Hands-on craft" },
  { src: "/images/gallery-2.jpg", label: "Service", title: "Elegant presentation" },
  { src: "/images/gallery-3.jpg", label: "Coffee", title: "Espresso rituals" },
  { src: "/images/gallery-4.jpg", label: "Bar", title: "Cocktail precision" },
  { src: "/images/gallery-5.jpg", label: "Academy", title: "Student practice" },
  { src: "/images/gallery-6.jpg", label: "Atmosphere", title: "Hospitality culture" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (nextIndex: number) => {
    if (!stackRef.current) return;

    const total = galleryImages.length;
    const normalizedIndex = (nextIndex + total) % total;

    if (normalizedIndex === activeRef.current) return;

    const currentCard = stackRef.current.querySelector<HTMLElement>(
      `[data-gallery-card="${activeRef.current}"]`
    );
    const nextCard = stackRef.current.querySelector<HTMLElement>(
      `[data-gallery-card="${normalizedIndex}"]`
    );

    if (!currentCard || !nextCard) return;

    const nextImage = nextCard.querySelector(".gallery-stack-image");
    const nextContent = nextCard.querySelector(".gallery-stack-content");
    const currentImage = currentCard.querySelector(".gallery-stack-image");

    gsap.killTweensOf([currentCard, nextCard, nextImage, nextContent, currentImage]);

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
      onComplete: () => {
        activeRef.current = normalizedIndex;
        setActiveIndex(normalizedIndex);

        gsap.set(currentCard, {
          zIndex: 1,
          scale: 0.88,
          xPercent: -12,
          yPercent: 8,
          rotateZ: -4,
          opacity: 0.42,
          clipPath: "inset(0% 0% 0% 0% round 2rem)",
        });

        gsap.set(nextCard, {
          zIndex: 6,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 2rem)",
        });
      },
    });

    gsap.set(nextCard, {
      zIndex: 7,
      opacity: 1,
      scale: 1.04,
      xPercent: 10,
      yPercent: 0,
      rotateZ: 2,
      clipPath: "inset(0% 100% 0% 0% round 2rem)",
    });

    tl.to(currentCard, {
      scale: 0.92,
      xPercent: -8,
      yPercent: 4,
      rotateZ: -2.5,
      opacity: 0.56,
      duration: 1.15,
    })
      .to(
        currentImage,
        {
          scale: 1.08,
          duration: 1.2,
        },
        0
      )
      .to(
        nextCard,
        {
          clipPath: "inset(0% 0% 0% 0% round 2rem)",
          scale: 1,
          xPercent: 0,
          rotateZ: 0,
          duration: 1.25,
        },
        0.1
      )
      .fromTo(
        nextImage,
        {
          scale: 1.18,
          xPercent: 6,
        },
        {
          scale: 1,
          xPercent: 0,
          duration: 1.45,
        },
        0.05
      )
      .fromTo(
        nextContent,
        {
          y: 36,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power4.out",
        },
        0.42
      );
  };

  const startAutoLoop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      goToSlide(activeRef.current + 1);
    }, 3600);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-reveal", {
        y: 36,
        clipPath: "inset(0 0 100% 0)",
        filter: "blur(8px)",
        duration: 1.15,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.set(".gallery-stack-card", {
        transformOrigin: "center center",
      });

      galleryImages.forEach((_, index) => {
        const card = stackRef.current?.querySelector<HTMLElement>(
          `[data-gallery-card="${index}"]`
        );

        if (!card) return;

        const depth = index;

        gsap.set(card, {
          zIndex: index === 0 ? 6 : 6 - index,
          scale: index === 0 ? 1 : 1 - depth * 0.035,
          xPercent: index === 0 ? 0 : depth * 6,
          yPercent: index === 0 ? 0 : depth * 3.6,
          rotateZ: index === 0 ? 0 : depth % 2 === 0 ? -2 : 2,
          opacity: index === 0 ? 1 : Math.max(0.2, 0.54 - depth * 0.07),
        });
      });

      gsap.from(".gallery-stack-frame", {
        y: 80,
        scale: 0.96,
        filter: "blur(8px)",
        duration: 1.35,
        ease: "expo.out",
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 84%",
        },
      });

      gsap.to(".gallery-orbit-text", {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".gallery-stack-image", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      if (!reduceMotion) {
        startAutoLoop();
      }
    }, sectionRef);

    return () => {
      ctx.revert();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleManualSlide = (index: number) => {
    goToSlide(index);
    startAutoLoop();
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F1EA] py-28 text-[#1A120F] md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(215,166,168,0.16),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(165,111,115,0.1),transparent_30%),linear-gradient(180deg,#F7F1EA_0%,#EFE3D4_100%)]" />

      <div className="relative mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-12">
        <div>
          <p className="gallery-reveal mb-5 text-xs uppercase tracking-[0.5em] text-[#A56F73]">
            Gallery
          </p>

          <h2 className="gallery-reveal max-w-4xl font-serif text-[clamp(3.4rem,6.4vw,7.4rem)] leading-[0.92] tracking-[-0.075em]">
            Inside the <span className="italic text-[#A56F73]">craft.</span>
          </h2>

          <p className="gallery-reveal mt-8 max-w-xl text-base leading-7 text-[#1A120F]/62 md:text-lg md:leading-8">
            A cinematic glimpse into coffee, cocktails, training, service, and
            the atmosphere of Fine Hospitality Group.
          </p>

          <div className="gallery-reveal mt-10 flex flex-wrap gap-3">
            {galleryImages.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => handleManualSlide(index)}
                className={`rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] transition duration-500 ${
                  activeIndex === index
                    ? "border-[#A56F73] bg-[#A56F73] text-[#F7F1EA]"
                    : "border-[#1A120F]/15 text-[#1A120F]/55 hover:border-[#A56F73]/60 hover:text-[#A56F73]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-stack-frame relative min-h-[560px] md:min-h-[680px]">
          <div className="pointer-events-none absolute -left-8 top-10 hidden h-32 w-32 rounded-full border border-[#A56F73]/25 md:block">
            <div className="gallery-orbit-text absolute inset-3 rounded-full border border-[#A56F73]/15" />
          </div>

          <div
            ref={stackRef}
            className="relative mx-auto h-[520px] max-w-[860px] md:h-[640px]"
          >
            {galleryImages.map((item, index) => (
              <article
                key={item.src}
                data-gallery-card={index}
                className="gallery-stack-card absolute inset-0 overflow-hidden rounded-[2rem] bg-[#121111] shadow-[0_36px_110px_rgba(26,18,15,0.2)] will-change-transform"
              >
                <Image
                  src={item.src}
                  alt={`Fine Hospitality Group ${item.label}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 90vw, 860px"
                  className="gallery-stack-image object-cover brightness-[0.92] contrast-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/78 via-[#090909]/18 to-transparent" />

                <div className="gallery-stack-content absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-5 p-7 text-[#F7F1EA] md:p-10">
                  <div>
                    <p className="mb-3 text-[0.68rem] uppercase tracking-[0.4em] text-[#D7A6A8]">
                      {item.label}
                    </p>

                    <h3 className="font-serif text-[2.4rem] leading-none tracking-[-0.06em] md:text-[4rem]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-serif text-[3rem] leading-none text-[#F7F1EA]/90 md:text-[5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-[1380px] items-center justify-center gap-6 px-5 sm:px-8 lg:px-12">
        <span className="hidden h-px w-32 bg-[#1A120F]/12 md:block" />
        <p className="text-center text-[0.65rem] uppercase tracking-[0.42em] text-[#9A8F88]">
          Cinematic image stack · Auto rotating hospitality moments
        </p>
        <span className="hidden h-px w-32 bg-[#1A120F]/12 md:block" />
      </div>
    </section>
  );
}