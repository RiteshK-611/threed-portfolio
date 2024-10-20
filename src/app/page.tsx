import Navbar from "@/sections/Navbar";
import Navbar1 from "@/sections/Navbar1";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Clients from "@/sections/Clients";
import WorkExperience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import GlowingBall from "@/components/GlowingBall";

export default function App() {
  return (
    <main>
      <GlowingBall />
      <Navbar />
      <Navbar1 />
      <Hero />
      <About />
      <Projects />
      <Clients />
      <WorkExperience />
      <Contact />
      <Footer />
    </main>
  );
}
