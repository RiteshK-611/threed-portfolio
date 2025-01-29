import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import GlowingBall from "@/components/GlowingBall";
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
        {/* <Skills /> */}
        <Projects />
        <Blogs />
        {/* <Clients /> */}
        {/* <WorkExperience /> */}
        <Contact />
        <Footer />
      </main>
    </GlowingBallProvider>
  );
}
