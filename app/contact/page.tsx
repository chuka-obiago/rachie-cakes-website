"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_LINK } from "@/lib/contacts";

// Extracted SVG path to avoid JSX parsing errors with long string characters
const whatsappIconPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const infoCards = [
  { label: "Location", value: "Paynesville, Liberia" },
  { label: "Hours", value: "Mon – Sat: 8am – 7pm" },
  { label: "WhatsApp", value: "+234 88 137 1963" },
];

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const info = useReveal();
  const cta = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="w-full bg-white">

      {/* Hero */}
      <section className="relative w-full h-[clamp(280px,30vw,350px)] overflow-hidden">
        <Image
          src="/contact_rachie.png"
          alt="Contact hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight transition-all duration-700 ease-out ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Contact Us
          </h1>
          <p
            className={`text-white/80 text-base sm:text-lg transition-all duration-700 ease-out delay-150 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* We&apos;d love to hear from you */}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 sm:py-20 bg-[#f1f3f4]">
        <div
          ref={cta.ref}
          className={`w-[85%] sm:w-[80%] mx-auto flex flex-col items-center text-center transition-all duration-700 ease-out ${
            cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Ready to Place an Order?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-md">
            Tap below to chat with us directly on WhatsApp
          </p>
          
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 cursor-pointer inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-base transition-all duration-300 hover:bg-[#1ebe5d] hover:scale-105 active:scale-95"
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={whatsappIconPath} />
            </svg>
            Message us on WhatsApp
          </a>
        </div>
      </section>

      {/* Info */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div
          ref={info.ref}
          className={`w-[85%] sm:w-[80%] mx-auto text-center transition-all duration-700 ease-out ${
            info.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
            Get In Touch
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Let&apos;s Create Sweet Memories
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
            Whether you&apos;re planning an event, or just treating yourself, we&apos;re here to help. Reach out and we&apos;ll
            get back to you as soon as possible.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-left">
            {infoCards.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[#f1f3f4]"
                style={{
                  opacity: info.visible ? 1 : 0,
                  transform: info.visible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                  transitionDelay: info.visible ? `${i * 100}ms` : "0ms",
                }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5E3C]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}