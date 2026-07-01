"use client";

import Image from "next/image";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0d0f12] text-gray-400 border-t border-white/5 py-12 md:py-16">
      <div className="w-[85%] sm:w-[80%] mx-auto">
        
        {/* Main Grid Layout: items-end aligns both column contents to the bottom baseline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-end pb-12 text-center md:text-left">
          
          {/* Left Column: Logo + Brand Tagline + Location grouped together */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="relative w-32 h-32 transition-transform duration-500 hover:scale-105">
              <Image
                src="/rachie_cakes_logo.png"
                alt="Rachie Cakes Logo"
                fill
                sizes="(max-w-7xl) 128px"
                className="object-contain"
              />
            </div>
            <p className="text-base font-medium text-gray-300 max-w-sm italic mt-1">
              Rachie Cakes, <br/> Where every bite tells a sweet story
            </p>
            <p className="text-sm tracking-wide text-gray-500 font-medium">
              Paynesville, Liberia
            </p>
          </div>

          {/* Right Column: Connect Info */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-lg font-semibold text-white tracking-tight">
              Connect with us...
            </h3>
            
            <a 
              href="https://wa.me/231881371963"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-[#25D366]"
            >
              <FaWhatsapp className="text-base text-[#25D366]" />
              <span>WhatsApp No: +231 881371963</span>
            </a>

            {/* Social Icon Links */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://www.instagram.com/" // Replace with your exact Instagram link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-full bg-white/5 text-gray-400 border border-white/10 transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:-translate-y-1 active:scale-95"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61571966222322&mibextid=wwXIfr&rdid=RmZCIJtZzMwSZE3k&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1CgQTwN1fF%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#" // Replace with your exact Facebook link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-3 rounded-full bg-white/5 text-gray-400 border border-white/10 transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:border-transparent hover:-translate-y-1 active:scale-95"
              >
                <FaFacebookF className="text-lg" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-white/5 mb-8" />

        {/* Bottom Attribution Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-xs tracking-wider uppercase font-medium text-gray-500 text-center sm:text-left">
          <p>© {currentYear} Rachie Cakes. All Rights Reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.clennai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="normal-case text-[#3b82f6] font-semibold transition-colors duration-300 hover:text-[#60a5fa] hover:underline"
            >
              ClennAI
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}