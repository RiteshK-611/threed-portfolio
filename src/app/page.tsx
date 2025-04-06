import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import GlowingBall from "@/components/GlowingBall";
import { GlowingBallProvider } from "@/context/GlowingBallContext";
import Blogs from "@/sections/Blogs";
import Footer from "@/sections/Footer";
import WorkExperience from "@/sections/Experience";
import WorkExperienceTree from "@/sections/WorkExperienceTree";

export default function App() {
  return (
    <GlowingBallProvider>
      <main className="overflow-x-hidden">
        <GlowingBall />
        <Navbar />
        <Hero />
        <About />
        {/* <Skills /> */}
        <Projects />
        <WorkExperienceTree />
        {/* <Clients /> */}
        {/* <WorkExperience /> */}
        <Blogs />
        <Contact />
        <Footer />
      </main>
    </GlowingBallProvider>
  );
}
