"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GlassCard = ({ text, className, children }) => (
  <div
    className={cn(
      `relative w-[180px] sm:w-[180px] md:w-[180px] h-[200px] sm:h-[200px] md:h-[200px] bg-white/10 border border-white/10 shadow-[0_25px_25px_rgba(0,0,0,0.25)] flex justify-center items-center transition-all duration-500 rounded-[10px] -mx-[20px] sm:-mx-[30px] md:-mx-[45px] backdrop-blur-[10px] group-hover:rotate-0 group-hover:mx-1 sm:group-hover:mx-2 md:group-hover:mx-2.5`,
      className
    )}
    data-text={text}
  >
    {children}
  </div>
);

const GlassContainer = () => {
  return (
    <motion.div
      className="relative flex justify-center items-center group scale-75 sm:scale-90 md:scale-100"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <GlassCard text="riteshkokam" className="-rotate-15">
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-10 h-10"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>X</title>
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </GlassCard>
      <GlassCard text="riteshk-611" className="rotate-5">
        <svg
          viewBox="0 0 496 512"
          className="w-10 h-10"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      </GlassCard>
      <GlassCard text="riteshkokam" className="rotate-25">
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-10 h-10"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </GlassCard>
    </motion.div>
  );
};

export default GlassContainer;

// const Particle = ({ delay }) => {
//   const randomX = Math.random() * 300 - 150;
//   const randomY = Math.random() * 300 - 150;
//   const size = Math.random() * 6 + 3;

//   return (
//     <motion.div
//       className="absolute rounded-full bg-gradient-to-br from-white to-white/40"
//       initial={{
//         x: 0,
//         y: 0,
//         opacity: 0,
//         scale: 0,
//       }}
//       animate={{
//         x: randomX,
//         y: randomY,
//         opacity: [0, 0.6, 0],
//         scale: [0, 1, 0],
//       }}
//       transition={{
//         duration: 4,
//         delay: delay,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//       style={{
//         width: size,
//         height: size,
//         boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
//       }}
//     />
//   );
// };