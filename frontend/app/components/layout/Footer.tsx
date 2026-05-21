"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/sites";

gsap.registerPlugin(ScrollTrigger);

const contactEmail = "finehospitality100@gmail.com";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589097137865" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com/fine.hospitality?igsh=ZzF0cXprMG8wZWh5&utm_source=qr" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  const whatsappUrl =
  "https://wa.me/9779709111227?text=Hello%20I%20want%20to%20know%20about%20your%20courses";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-kicker",
        { y: 18, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".footer-line span",
        { yPercent: 120, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.08,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".footer-card",
        { y: 35, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-cards",
            start: "top 88%",
          },
        }
      );

      gsap.to(".footer-bg", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden bg-[#090909] px-6 pb-10 pt-20 text-[#F7F1EA] sm:px-8 lg:px-12 lg:pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(215,166,168,0.14),transparent_28%),radial-gradient(circle_at_82%_75%,rgba(165,111,115,0.12),transparent_34%),linear-gradient(135deg,#090909_0%,#121111_50%,#1A120F_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(247,241,234,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,234,.7)_1px,transparent_1px)] [background-size:74px_74px]" />

      <div className="footer-bg pointer-events-none absolute bottom-[-6vw] left-[-2vw] font-serif text-[20vw] leading-none tracking-[-0.06em] text-[#F7F1EA]/[0.03]">
        FHG
      </div>

      <div className="relative z-10 mx-auto max-w-7xl border-t border-[#F7F1EA]/10 pt-14">
        <div className="grid gap-20 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="flex flex-col pt-2">
            <p className="footer-kicker mb-7 text-xs uppercase tracking-[0.45em] text-[#D7A6A8]">
              Fine Hospitality Group
            </p>

            <div className="space-y-1">
              <div className="footer-line overflow-visible pb-2">
                <span className="block font-serif text-[clamp(4rem,8vw,7.6rem)] leading-[0.88] tracking-[-0.06em]">
                  Master the craft.
                </span>
              </div>

              <div className="footer-line overflow-visible pb-2">
                <span className="block font-serif text-[clamp(4rem,8vw,7.6rem)] leading-[0.88] tracking-[-0.06em] text-[#D7A6A8]">
                  Serve with
                </span>
              </div>

              <div className="footer-line overflow-visible pb-2">
                <span className="block font-serif text-[clamp(4rem,8vw,7.6rem)] leading-[0.88] tracking-[-0.06em] text-[#D7A6A8]">
                  elegance.
                </span>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#E8DCC9]/62 sm:text-lg">
              Luxury hospitality education shaped around precision, confidence,
              discipline, and cinematic guest experience.
            </p>
          </div>

          <div className="footer-cards flex flex-col gap-4">
            <FooterCard icon={<MapPin size={16} />} label="Academy">
              {siteConfig.location}
            </FooterCard>

            <FooterCard
              icon={<Phone size={16} />}
              label="Direct Call"
              href={`tel:${siteConfig.phone}`}
            >
              {siteConfig.phone}
            </FooterCard>

            <FooterCard
              icon={<Mail size={16} />}
              label="Email"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </FooterCard>

            <FooterCard
              icon={<MessageCircle size={16} />}
              label="WhatsApp"
              href={whatsappUrl}
            >
              Message us directly
            </FooterCard>

            <div className="footer-card rounded-[1.7rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] p-6 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/25 hover:bg-[#F7F1EA]/[0.06]">
              <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D7A6A8]">
                Social
              </p>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-full border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.02] px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-[#E8DCC9]/70 transition duration-500 hover:border-[#D7A6A8]/35 hover:bg-[#F7F1EA]/[0.05] hover:text-[#D7A6A8]"
                  >
                    {social.label}
                    <ArrowUpRight
                      size={14}
                      className="transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#top"
              className="footer-card group flex items-center justify-between rounded-[1.7rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] px-6 py-5 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/25 hover:bg-[#F7F1EA]/[0.06]"
            >
              <span className="text-xs uppercase tracking-[0.34em] text-[#D7A6A8]">
                Back To Top
              </span>

              <ArrowUpRight
                size={18}
                className="text-[#D7A6A8] transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-[#F7F1EA]/10 pt-6 text-[10px] uppercase tracking-[0.34em] text-[#F7F1EA]/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fine Hospitality Group</p>
          <p>Luxury Barista + Bartending Academy / Kathmandu</p>
          <p>Master The Craft. Serve With Elegance.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCard({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <div>
        <div className="mb-3 flex items-center gap-3 text-[#D7A6A8]">
          {icon}
          <span className="text-xs uppercase tracking-[0.32em]">{label}</span>
        </div>

        <p className="text-sm leading-7 text-[#E8DCC9]/70">{children}</p>
      </div>

      {href && <ArrowUpRight size={18} className="text-[#D7A6A8]" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="footer-card flex items-center justify-between rounded-[1.7rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] p-6 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/25 hover:bg-[#F7F1EA]/[0.06]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="footer-card rounded-[1.7rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] p-6 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/25 hover:bg-[#F7F1EA]/[0.06]">
      {content}
    </div>
  );
}