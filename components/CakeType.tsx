// components/CakeType.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Cake {
  id: number;
  image: string;
}

interface CakeTypeProps {
  title?: string;
  cakes?: Cake[];
  bg?: string;
}

const defaultCakes: Cake[] = [
  { id: 1, image: "/chocolate_cake_mountain.png" },
  { id: 2, image: "/chocolate_cake_mountain.png" },
  { id: 3, image: "/chocolate_cake_mountain.png" },
  { id: 4, image: "/chocolate_cake_mountain.png" },
];

export default function CakeType({
  title = "Our Cakes",
  cakes = defaultCakes,
  bg = "#ffffff",
}: CakeTypeProps) {
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
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20"
      style={{ backgroundColor: bg }}
    >
      <div
        className={`w-[90%] sm:w-[80%] mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-left">
          {title}
        </h2>

        {/* Grid — always 4 columns */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {cakes.slice(0, 4).map((cake, i) => (
            <button
              key={cake.id}
              onClick={() => setSelectedCake(cake)}
              className={`group cursor-pointer transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-200">
                <Image
                  src={cake.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </button>
          ))}
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
                alt={title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}