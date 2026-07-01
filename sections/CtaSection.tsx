"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK } from "@/lib/contacts";

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

interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function CtaSection({
  title = "Ready to Place an Order?",
  description = "Tap below to chat with us directly on WhatsApp",
  buttonText = "Message us on WhatsApp",
}: CtaSectionProps) {
  const cta = useReveal();

  return (
    <section className="w-full py-16 sm:py-20 bg-[#f1f3f4]">
      <div
        ref={cta.ref}
        className={`w-[85%] sm:w-[80%] mx-auto flex flex-col items-center text-center transition-all duration-700 ease-out ${
          cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-md">
          {description}
        </p>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 cursor-pointer inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-base transition-all duration-300 hover:bg-[#1ebe5d] hover:scale-105 active:scale-95"
        >
          <FaWhatsapp className="h-5 w-5 flex-shrink-0 text-xl" />
          {buttonText}
        </a>
      </div>
    </section>
  );
}