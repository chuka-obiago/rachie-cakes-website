// Sections/Featured.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Cake {
  id: number;
  name: string;
  image: string;
}

const cakes: Cake[] = [
  { id: 1, name: "Red Velvet Cake", image: "/cakepics/rachie_cake_1.png" },
  { id: 2, name: "Chocolate Cake", image: "/cakepics/rachie_cake_two.png" },
  { id: 3, name: "Wedding Cake", image: "/cakepics/rachie_cake_three.png" },
  { id: 4, name: "Vanilla Cake", image: "/cakepics/rachie_cake_sample2.png" },
  { id: 5, name: "Carrot Cake", image: "/cakepics/rachie_cake_sample.png" },
  { id: 6, name: "Lemon Cake", image: "/cakepics/rachie_cake_sample.png" },
  { id: 7, name: "Birthday Cake", image: "/cakepics/rachie_cake_sample.png" },
  { id: 8, name: "Cupcakes", image: "/cakepics/rachie_cake_sample.png" },
];

export default function Featured() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll and allow Escape to close modal
  useEffect(() => {
    if (!selectedCake) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCake(null);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedCake]);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-24">
      <div
        className={`w-[90%] sm:w-[80%] mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-center">
          Our Featured Cakes
        </h2>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {cakes.slice(0, 8).map((cake, i) => (
            <button
              key={cake.id}
              onClick={() => setSelectedCake(cake)}
              className={`group cursor-pointer text-left transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-200">
                <Image
                  src={cake.image}
                  alt={cake.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <p className="mt-3 text-sm sm:text-base font-medium text-gray-900">
                {cake.name}
              </p>
            </button>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/cakes"
            className="cursor-pointer px-8 py-3 rounded-full bg-[#8B5E3C] text-white font-medium transition-all duration-300 hover:bg-[#B38B64]"
          >
            View all
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selectedCake && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-[fadeIn_0.25s_ease-out_forwards]"
          onClick={() => setSelectedCake(null)}
        >
          <div
            className="relative w-full max-w-2xl animate-[scaleIn_0.25s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCake(null)}
              aria-label="Close"
              className="cursor-pointer absolute -top-10 right-0 sm:-top-2 sm:-right-10 text-white text-3xl leading-none hover:opacity-70 transition-opacity"
            >
              &times;
            </button>
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
              <Image
                src={selectedCake.image}
                alt={selectedCake.name}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-white text-lg font-medium">
              {selectedCake.name}
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}