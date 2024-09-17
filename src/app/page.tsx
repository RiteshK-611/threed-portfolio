import Image from "next/image";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
