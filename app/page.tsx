import Hero from "@/sections/Hero";
import Description from "@/sections/Description";
import Featured from "@/sections/Featured";
import CtaSection from "@/sections/CtaSection";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <Description />

      <Featured/>
      
      <CtaSection />

    </main>
  );
}