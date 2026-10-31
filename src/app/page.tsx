import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProjectShowcase projects={projects} />
        <About />
        <Skills />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
