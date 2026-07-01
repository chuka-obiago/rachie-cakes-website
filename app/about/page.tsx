// app/about/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const story = useReveal();
  const mission = useReveal();
  const values = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="w-full bg-white">
      {/* ── Hero ── */}
      <section className="relative w-full h-[clamp(280px,30vw,350px)] overflow-hidden">
        <Image
          src="/hero_for_rachie.png"
          alt="About hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight transition-all duration-700 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            About
          </h1>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="w-full py-16 sm:py-20 bg-[#f1f3f4]">
        <div
          ref={story.ref}
          className={`w-[85%] sm:w-[80%] mx-auto transition-all duration-700 ease-out ${
            story.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
            Our Story
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight max-w-2xl">
            Born From a Love of Baking
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Rachie&apos;s Cakes &amp; Pastries started in a small kitchen in
              Paynesville knowing that every celebration
              deserves something truly special. What began as weekend baking for
              family and friends quickly grew into a local favorite.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Today we serve the Paynesville community, crafting custom cakes
              and pastries for birthdays, weddings, and special events, each one made fresh to order, with the same care that started it all.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="w-full py-16 sm:py-20 bg-[#f1f3f4]">
        <div
          ref={mission.ref}
          className={`w-[85%] sm:w-[80%] mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center transition-all duration-700 ease-out ${
            mission.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/newest_cake_rachie.png"
                alt="Our mission"
                fill
                sizes="(max-width: 768px) 85vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
              Our Mission
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Quality in Every Bite
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              We use only premium, locally-sourced ingredients, no shortcuts,
              no preservatives. Our mission is simple: deliver cakes and
              pastries so good they become the highlight of your celebration.
            </p>
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              Every order is treated with the same personal attention, whether
              it&apos;s a single cupcake or a five-tier wedding cake.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div
          ref={values.ref}
          className={`w-[85%] sm:w-[80%] mx-auto transition-all duration-700 ease-out ${
            values.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
            What We Stand For
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: "Freshness",
                desc: "We make sure every item is baked and delivered fresh to our customers.",
              },
              {
                title: "Craftsmanship",
                desc: "Each cake is hand-decorated with care and precision, built to impress.",
              },
              {
                title: "Community",
                desc: "We proudly source local ingredients and support our Paynesville community.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#f1f3f4] transition-all duration-700 ease-out"
                style={{
                  transitionDelay: values.visible ? `${i * 120}ms` : "0ms",
                  opacity: values.visible ? 1 : 0,
                  transform: values.visible
                    ? "translateY(0)"
                    : "translateY(24px)",
                }}
              >
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-base text-gray-700 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}