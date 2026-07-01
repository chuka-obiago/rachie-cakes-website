"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CakeType from "@/components/CakeType";

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

export default function CakesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const custom = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="relative w-full h-[clamp(280px,30vw,350px)] overflow-hidden">
        <Image
          src="/about_cake_hero.jpg"
          alt="Cakes hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight transition-all duration-700 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Cakes
          </h1>
          <p
            className={`text-white/80 text-sm sm:text-base text-center max-w-md px-4 transition-all duration-700 ease-out delay-150 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            For every occasion
          </p>
        </div>
      </section>

      {/* Imported component goes here */}
      <CakeType
        title="Classic Cakes"
        bg="#f1f3f4"
        cakes={[
          { id: 1, image: "/cakepics/rachie_2.png" },
          { id: 2, image: "/cakepics/rachie_5.png" },
          { id: 3, image: "/cakepics/rachie_4.png" },
          { id: 4, image: "/cakepics/rachie_cake_sample.png" },
        ]}
      />

      <CakeType
        title="Character Themed Cakes"
        bg="#f1f3f4"
        cakes={[
          { id: 1, image: "/cakepics/rachie_cake_two.png" },
          { id: 2, image: "/cakepics/rachie_cake_three.png" },
          { id: 3, image: "/cakepics/rachie_cake_1.png" },
          { id: 4, image: "/cakepics/rachie_6.png" },
        ]}
      />

      <CakeType
        title="Birthday Cakes"
        bg="#f1f3f4"
        cakes={[
          { id: 1, image: "/cakepics/rachie_1.png" },
          { id: 2, image: "/cakepics/rachie_cake_sample2.png" },
          { id: 3, image: "/cakepics/rachie_8.png" },
          { id: 4, image: "/cakepics/rachie_3.png" },
        ]}
      />

      {/* Custom Cakes */}
      <section className="w-full py-20 sm:py-30 bg-[#f1f3f4]">
        <div
          ref={custom.ref}
          className={`w-[85%] sm:w-[80%] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-700 ease-out ${
            custom.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/about_extra_pic.jpg"
                alt="Custom cake"
                fill
                sizes="(max-width: 768px) 85vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className="w-full md:w-1/2"
            style={{
              opacity: custom.visible ? 1 : 0,
              transform: custom.visible ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
            }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
              Custom Cakes
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Have a Design in Mind?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              Whether it&apos;s a birthday, wedding, anniversary, or any special
              occasion, we&apos;ll create a custom cake that&apos;s as beautiful
              as it is delicious.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex cursor-pointer items-center px-7 py-3 rounded-full bg-[#8B5E3C] text-white font-medium transition-all duration-300 hover:bg-[#B38B64] hover:scale-105 active:scale-95"
            >
              Request a Custom Cake
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}