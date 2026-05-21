"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteConfig } from "@/data/sites";
import type { ContactFormData } from "@/types/contact";

gsap.registerPlugin(ScrollTrigger);

const initialForm: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  course: "Barista" as ContactFormData["course"],
  message: "",
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] =
    useState<ContactFormData>(initialForm);

  const [courseOpen, setCourseOpen] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function updateField(
    field: keyof ContactFormData,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    setStatus("idle");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit"
        );
      }

      setStatus("success");

      setForm(initialForm);
    } catch (error) {
      console.error(error);

      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setCourseOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-kicker",
        {
          y: 20,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".contact-title-line span",
        {
          yPercent: 115,
          rotate: 2,
        },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
          },
        }
      );

      gsap.fromTo(
        ".contact-copy",
        {
          y: 28,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 64%",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        {
          y: 44,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-panel",
        {
          y: 70,
          opacity: 0,
          scale: 0.98,
          clipPath:
            "inset(8% 6% 8% 6% round 2rem)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          clipPath:
            "inset(0% 0% 0% 0% round 2rem)",
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-panel",
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        ".contact-field",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-panel",
            start: "top 70%",
          },
        }
      );

      gsap.to(".contact-bg-word", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2,
        },
      });

      const button = buttonRef.current;

      if (button) {
        const onMove = (
          event: MouseEvent
        ) => {
          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          gsap.to(button, {
            x: x * 0.14,
            y: y * 0.18,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease:
              "elastic.out(1, 0.45)",
          });
        };

        button.addEventListener(
          "mousemove",
          onMove
        );

        button.addEventListener(
          "mouseleave",
          onLeave
        );

        return () => {
          button.removeEventListener(
            "mousemove",
            onMove
          );

          button.removeEventListener(
            "mouseleave",
            onLeave
          );
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate overflow-hidden bg-[#090909] px-5 py-24 text-[#F7F1EA] sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(215,166,168,0.16),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(165,111,115,0.14),transparent_34%),linear-gradient(135deg,#121111_0%,#090909_52%,#1A120F_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(247,241,234,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,234,.7)_1px,transparent_1px)] [background-size:76px_76px]" />

      <div className="contact-bg-word pointer-events-none absolute -left-[8vw] bottom-[-5vw] font-serif text-[21vw] leading-none text-[#F7F1EA]/[0.03]">
        KATHMANDU
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0">
            <p className="contact-kicker mb-5 text-xs uppercase tracking-[0.42em] text-[#D7A6A8]">
              Private Enquiry
            </p>

            <h2 className="max-w-[720px] font-serif text-[clamp(3.4rem,7.5vw,6.7rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="contact-title-line block overflow-visible">
                <span className="block">
                  Begin your
                </span>
              </span>

              <span className="contact-title-line block overflow-visible text-[#D7A6A8]">
                <span className="block">
                  hospitality
                </span>
              </span>

              <span className="contact-title-line block overflow-visible text-[#D7A6A8]">
                <span className="block">
                  journey.
                </span>
              </span>
            </h2>

            <p className="contact-copy mt-8 max-w-xl text-base leading-8 text-[#E8DCC9]/70 sm:text-lg">
              Send an enquiry for
              barista or bartending
              training. Our team will
              contact you with
              availability, schedules,
              course details, and the
              next step toward joining
              Fine Hospitality Group.
            </p>

            <div className="contact-info mt-12 grid gap-4">
              <InfoCard
                label="Academy"
                icon={<MapPin size={18} />}
              >
                {siteConfig.location}
              </InfoCard>

              <InfoCard
                label="Direct Call"
                icon={<Phone size={18} />}
                href={`tel:${siteConfig.phone}`}
              >
                {siteConfig.phone}
              </InfoCard>

              <InfoCard
                label="WhatsApp"
                icon={
                  <ArrowUpRight size={18} />
                }
                href={`https://wa.me/${siteConfig.phone.replace(
                  /\D/g,
                  ""
                )}`}
              >
                Message us directly for
                course availability.
              </InfoCard>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-panel relative overflow-visible rounded-[2rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.055] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7 lg:p-8"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D7A6A8]/10 blur-3xl" />

            <div className="relative mb-7 border-b border-[#F7F1EA]/10 pb-6">
              <p className="text-xs uppercase tracking-[0.34em] text-[#D7A6A8]">
                Enquiry Form
              </p>

              <h3 className="mt-4 max-w-md font-serif text-3xl leading-tight text-[#F7F1EA] sm:text-4xl">
                Tell us what you want
                to master.
              </h3>
            </div>

            <div className="relative z-[20] grid gap-6 md:grid-cols-2">
              <Field
                label="Full Name"
                className="contact-field"
              >
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Your name"
                  className="luxury-input"
                />
              </Field>

              <Field
                label="Phone Number"
                className="contact-field"
              >
                <input
                  required
                  value={form.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value
                    )
                  }
                  placeholder="+977..."
                  className="luxury-input"
                />
              </Field>

              <Field
                label="Email Optional"
                className="contact-field"
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="you@example.com"
                  className="luxury-input"
                />
              </Field>

              <Field
                label="Interested Course"
                className="contact-field relative z-[120]"
              >
                <div
                  ref={dropdownRef}
                  className="relative z-[9999]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCourseOpen(
                        (prev) => !prev
                      )
                    }
                    className={`group flex w-full items-center justify-between border-b border-[#F7F1EA]/15 pb-4 pt-3 text-left transition duration-500 ${
                      courseOpen
                        ? "border-[#D7A6A8]"
                        : ""
                    }`}
                  >
                    <span className="text-[#F7F1EA] transition duration-500 group-hover:text-[#D7A6A8]">
                      {form.course}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`text-[#D7A6A8] transition duration-500 ${
                        courseOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 right-0 top-[calc(100%+14px)] z-[99999] overflow-hidden rounded-[1.5rem] border border-[#F7F1EA]/10 bg-[#121111]/95 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-500 ${
                      courseOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,166,168,0.12),transparent_65%)]" />

                    <div className="relative p-2">
                      {[
                        "Barista",
                        "Bar Level 1",
                        "Bar Level 2",
                      ].map((course) => (
                        <button
                          key={course}
                          type="button"
                          onClick={() => {
                            updateField(
                              "course",
                              course as ContactFormData["course"]
                            );

                            setCourseOpen(
                              false
                            );
                          }}
                          className={`group relative flex w-full items-center justify-between rounded-[1rem] px-4 py-4 text-left transition-all duration-500 ${
                            form.course ===
                            course
                              ? "bg-[#D7A6A8]/10 text-[#D7A6A8]"
                              : "text-[#E8DCC9]/75 hover:bg-[#F7F1EA]/[0.04] hover:text-[#F7F1EA]"
                          }`}
                        >
                          <span className="text-sm tracking-[0.08em]">
                            {course}
                          </span>

                          <span
                            className={`h-[6px] w-[6px] rounded-full bg-[#D7A6A8] transition duration-500 ${
                              form.course ===
                              course
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Field>
            </div>

            <Field
              label="Message"
              className="contact-field relative mt-5"
            >
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={(e) =>
                  updateField(
                    "message",
                    e.target.value
                  )
                }
                placeholder="Tell us what you want to learn..."
                className="luxury-input resize-none"
              />
            </Field>

            <div className="contact-field relative mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                ref={buttonRef}
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D7A6A8] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#1A120F] transition duration-500 hover:bg-[#F7F1EA] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Enquiry"}

                <Send
                  size={18}
                  className="transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              {status ===
                "success" && (
                <p className="text-sm text-[#D7A6A8]">
                  Thank you. Your
                  enquiry has been
                  submitted.
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-red-300">
                  Something went
                  wrong. Please try
                  again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .luxury-input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid
            rgba(247, 241, 234, 0.16);
          background: transparent;
          padding: 0.85rem 0;
          color: #f7f1ea;
          outline: none;
          transition:
            border-color 500ms ease,
            color 500ms ease,
            transform 500ms ease;
        }

        .luxury-input::placeholder {
          color: rgba(
            154,
            143,
            136,
            0.55
          );
        }

        .luxury-input:focus {
          border-bottom-color: #d7a6a8;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`block ${className}`}>
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#9A8F88]">
        {label}
      </span>

      {children}
    </div>
  );
}

function InfoCard({
  label,
  icon,
  href,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <div className="mb-4 flex items-center gap-3 text-[#D7A6A8]">
        {icon}

        <span className="text-xs uppercase tracking-[0.28em]">
          {label}
        </span>
      </div>

      <p className="text-sm leading-7 text-[#E8DCC9]/75">
        {children}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={
          href.startsWith("http")
            ? "_blank"
            : undefined
        }
        rel={
          href.startsWith("http")
            ? "noreferrer"
            : undefined
        }
        className="contact-card rounded-[1.35rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] p-5 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/35 hover:bg-[#F7F1EA]/[0.07]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="contact-card rounded-[1.35rem] border border-[#F7F1EA]/10 bg-[#F7F1EA]/[0.045] p-5 backdrop-blur-xl transition duration-500 hover:border-[#D7A6A8]/35 hover:bg-[#F7F1EA]/[0.07]">
      {content}
    </div>
  );
}