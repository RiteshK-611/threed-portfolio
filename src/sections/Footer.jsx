// https://blog.olivierlarose.com/tutorials/text-along-path

"use client";

import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { devIcons, footerIcons } from "../constants";

export default function Footer() {
  const container = useRef();
  const [showIcons, setShowIcons] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Control navbar visibility
      const navbar = document.getElementById("navbar");
      if (value > 0.4 && !showIcons) {
        setShowIcons(true);
        if (navbar) {
          navbar.style.opacity = "0";
          navbar.style.transform = "translateY(100%)";
          navbar.style.pointerEvents = "none";
        }
      } else if (value <= 0.4 && showIcons) {
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
      <CurvePath iconList={devIcons} scrollYProgress={scrollYProgress} />
        <Logos
          scrollProgress={scrollYProgress}
          showIcons={showIcons}
          icons={footerIcons}
        />
      </div>
  );
}

const CurvePath = ({ iconList, scrollYProgress }) => {
  const iconsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    // Set initial positions
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.set(icon, {
          x: 0,
          y: 88.5,
          transformOrigin: "50% 50%",
        });
      }
    });
  }, []);

  useEffect(() => {
    let animations = [];

    // Create animations
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        const anim = gsap.to(icon, {
          motionPath: {
            path: "#curve",
            autoRotate: false,
            useRadians: true,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
          paused: true,
        });
        animations[index] = anim;
      }
    });

    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Calculate spacing based on array length to evenly distribute icons
      const spacing = 1 / iconsRef.current.length;
      animations.forEach((anim, index) => {
        if (anim) {
          const progress = (value + index * spacing) % 1;
          anim.progress(progress);
        }
      });
    });

    return () => {
      unsubscribe();
      animations.forEach((anim) => anim && anim.kill());
    };
  }, [scrollYProgress]);

  return (
    <svg className="w-full mb-10" viewBox="0 0 256 97">
      <defs>
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
          // stroke="rgba(255,255,255,0.1)"
        />
      </defs>

      <image
        href="/rk.png"
        width="40"
        height="40"
        className="rounded-lg absolute"
        x="108"
        y="50"
      ></image>

      {iconList.map((icon, index) => (
        <g key={index}>
          <image
            ref={(el) => (iconsRef.current[index] = el)}
            href={icon}
            width="10"
            height="10"
            className="invert"
            style={{ position: "absolute" }}
          />
        </g>
      ))}
    </svg>
  );
};

const Logos = ({ scrollProgress, showIcons, icons }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-[150px] sm:h-[200px] md:h-[250px] overflow-hidden">
      <motion.div
        style={{
          y: useTransform(
            scrollProgress,
            [0, 1],
            [isMobile ? -300 : -700, isMobile ? 500 : 600]
          ),
        }}
        className="h-full flex justify-center gap-10 items-center p-10"
      >
        <AnimatePresence>
          {icons.map((link, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, scale: 0, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -50, scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={link} alt={link} className="w-7 h-7 md:w-10 md:h-10" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
