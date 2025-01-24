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
import { GlowingBallProvider } from "@/context/GlowingBallContext";
import Blogs from "@/sections/Blogs";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <GlowingBallProvider>
      <main>
        <GlowingBall />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Blogs />
        <Contact />
        <Footer />
      </main>
    </GlowingBallProvider>
  );
}
