"use client";

import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { navLinks, iconList } from "@/constants/index.js";
import Link from "next/link";

export default function Footer() {
  const container = useRef();
  const paths = useRef([]);
  const [showIcons, setShowIcons] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const icons = [
    "https://api.iconify.design/tabler:triangle.svg?color=%23DF0024",
    "https://api.iconify.design/tabler:x.svg?color=%23F3C300",
    "https://api.iconify.design/tabler:circle.svg?color=%2300AC9F",
    "https://api.iconify.design/tabler:square.svg?color=%232E6DB4",
  ];

  const devIcons = [
    "https://api.iconify.design/tabler:code.svg",
    "https://api.iconify.design/tabler:brand-react.svg",
    "https://api.iconify.design/tabler:brand-javascript.svg",
    "https://api.iconify.design/tabler:brand-typescript.svg",
    "https://api.iconify.design/tabler:brand-nextjs.svg",
    "https://api.iconify.design/tabler:brand-git.svg",
    "https://api.iconify.design/tabler:code.svg",
    "https://api.iconify.design/tabler:brand-react.svg",
    "https://api.iconify.design/tabler:brand-javascript.svg",
    "https://api.iconify.design/tabler:brand-typescript.svg",
    "https://api.iconify.design/tabler:brand-nextjs.svg",
    "https://api.iconify.design/tabler:brand-git.svg",
    "https://api.iconify.design/tabler:code.svg",
    "https://api.iconify.design/tabler:brand-react.svg",
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      paths.current.forEach((path, i) => {
        if (path) {
          const offset = (value + i * 0.0415) % 1;
          path.setAttribute("keyPoints", `${offset}; ${offset}`);
          path.setAttribute("keyTimes", "0; 1");
        }
      });

      // Control navbar visibility
      const navbar = document.getElementById("navbar");
      if (value > 0.8 && !showIcons) {
        setShowIcons(true);
        if (navbar) {
          navbar.style.opacity = "0";
          navbar.style.transform = "translateY(100%)";
          navbar.style.pointerEvents = "none";
        }
      } else if (value <= 0.8 && showIcons) {
        setShowIcons(false);
        if (navbar) {
          navbar.style.opacity = "1";
          navbar.style.transform = "translateY(0)";
          navbar.style.pointerEvents = "auto";
        }
      }
    });

    return () => unsubscribe();
  }, [showIcons]);

  return (
    <div ref={container}>
      <CurvePath iconList={iconList} paths={paths} />
      <Logos scrollProgress={scrollYProgress} showIcons={showIcons} icons={icons} />
    </div>
  );
}

const CurvePath = ({ iconList, paths }) => {
  return (
    <svg className="w-full mb-40" viewBox="0 0 250 90">
      <defs>
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
      </defs>
      
      <image
        href="/rk.png"
        width="20"
        height="20"
        className="rounded-lg"
        x="115"
        y="50"
      >
      </image>

      {iconList.map((icon, index) => (
        <g key={index}>
          <image
            href={icon[0]}
            width="4"
            height="4"
            className="rounded-lg border border-white"
          >
            <animateMotion
              ref={(ref) => (paths.current[index] = ref)}
              dur="1s"
              repeatCount="1"
              calcMode="linear"
              keyPoints="0; 0"
              keyTimes="0; 1"
              fill="freeze"
            >
              <mpath href="#curve" />
            </animateMotion>
          </image>
        </g>
      ))}
    </svg>
  );
};

const Logos = ({ scrollProgress, showIcons, icons }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-[250px] bg-black overflow-hidden">
      <motion.div
        style={{ 
          y: useTransform(
            scrollProgress, 
            [0, 1], 
            [isMobile ? -100 : -700, 0]
          ) 
        }}
        className="h-full bg-black flex justify-center gap-10 items-center p-10"
      >
        <AnimatePresence mode="wait">
          {showIcons &&
            icons.map((link, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, scale: 0, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: -50, scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* <Link
                  href={link}
                  className="w-[80px] h-[80px] rounded-full bg-black-300 border border-black-200 flex items-center justify-center hover:bg-black-400 transition-colors"
                >
                </Link> */}
                <img src={link} alt={link} className="w-10 h-10" />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
