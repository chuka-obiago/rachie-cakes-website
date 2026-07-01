// Sections/Description.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const benefits = [
  "Freshly baked daily",
  "Custom designs for any event",
  "Reliable, on-time delivery",
  "Loved by customers across Liberia",
];

export default function Description() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f1f3f4] py-16 sm:py-24">
      <div className="w-[80%] sm:w-[80%] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Image */}
        <div
          className={`w-full md:w-1/2 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/chocolate_cake_mountain.png"
              alt="Chocolate cake mountain"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={`w-full md:w-1/2 transition-all duration-700 ease-out delay-150 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Baked With Passion, <br/> Delivered With Care
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
            Every cake and pastry at Rachie&apos;s is handcrafted from scratch
            and delivered fresh to your door.
          </p>

          <ul className="mt-6 space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-800">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-[#8B5E3C]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-base sm:text-lg whitespace-nowrap">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}