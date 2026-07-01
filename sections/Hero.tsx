// Sections/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

let heroHasPlayed = false;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
  if (heroHasPlayed) {
    setShowLoader(false);
    return;
  }

  const timer = setTimeout(() => {
    setShowLoader(false);
    heroHasPlayed = true;
  }, 900);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay blocked — poster image remains visible
    });
  }, []);

  return (
    <>
      {/* Initial loading screen */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-400 ${
          showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!showLoader}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rachie_cakes_logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="animate-pulse rounded-full object-cover"
          style={{ width: "200px", height: "200px", aspectRatio: "1 / 1" }}
        />
      </div>

      <section className="relative w-full h-[100svh] min-h-[480px] overflow-hidden">
        {/* Background video — plays once and freezes on last frame */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/kling_hero.jpg"
        >
          <source src="/animated_hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 h-full w-[80%] mx-auto flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight max-w-3xl opacity-0 translate-y-6 animate-[fadeUp_0.7s_ease-out_0.2s_forwards]">
            Welcome to Rachie&apos;s <br /> Cakes &amp; Pastries
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl opacity-0 translate-y-6 animate-[fadeUp_0.7s_ease-out_0.4s_forwards]">
            Handcrafted cakes and pastries where every bite tells a sweet story
          </p>
          <div className="mt-8 flex gap-4 opacity-0 translate-y-6 animate-[fadeUp_0.7s_ease-out_0.6s_forwards]">
            <Link href="/contact">
              <button className="cursor-pointer px-6 py-3 rounded-full bg-white text-black font-medium transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95">
                Order Now
              </button>
            </Link>
            <Link href="/cakes">
              <button className="cursor-pointer px-6 py-3 rounded-full border border-white/40 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/70 hover:scale-105 active:scale-95">
                View Our Cakes
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}