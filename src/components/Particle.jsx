"use client";

import { motion } from "framer-motion";

const Particle = ({ delay }) => {
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 200 - 100;
  const size = Math.random() * 8 + 4;

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-white to-white/60"
      initial={{
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
};

const ParticleBackground = () => {
  return (
    // <div className="absolute inset-0 pointer-events-none">
    //   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[200px] h-[200px]">
        {Array.from({ length: 30 }).map((_, index) => (
          <Particle key={index} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;