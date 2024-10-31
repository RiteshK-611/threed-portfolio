import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Clients from "@/sections/Clients";
import WorkExperience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import GlowingBall from "@/components/GlowingBall";
import Skills from "@/sections/Skills";
import RotatingCircle from "@/components/RotatingCircle";

export default function App() {
  return (
    <main>
      <GlowingBall />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      {/* <RotatingCircle /> */}
      <Projects />
      <Clients />
      <WorkExperience />
      <Contact />
    </main>
  );
}
