import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Kpis } from "@/components/Kpis";
import { Pipeline } from "@/components/Pipeline";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Profile } from "@/components/Profile";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Kpis />
        <Pipeline />
        <Experience />
        <Skills />
        <Profile />
      </main>
      <Contact />
    </>
  );
}
