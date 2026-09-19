import { Navbar } from "@/components/Navbar/Navbar";
import { Hero3D } from "@/components/Hero3D/Hero3D";
import { About } from "@/components/About/About";
import { SkillsGalaxy } from "@/components/SkillsGalaxy/SkillsGalaxy";
import { Timeline } from "@/components/Timeline/Timeline";
import { Projects } from "@/components/ProjectCard3D/Projects";
import { ArchitectureScene } from "@/components/ArchitectureScene/ArchitectureScene";
import { Certifications } from "@/components/Certifications/Certifications";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { BackgroundFx } from "@/components/shared/background-fx";
import { CursorSpotlight } from "@/components/shared/cursor-spotlight";

export default function Home() {
  return (
    <>
      <BackgroundFx />
      <CursorSpotlight />
      <Navbar />
      <main className="relative">
        <Hero3D />
        <About />
        <SkillsGalaxy />
        <Timeline />
        <Projects />
        <ArchitectureScene />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
