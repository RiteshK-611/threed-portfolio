"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import { myProjects } from "../constants/index.js";
import AvatarCircles from "@/components/AvatarCircles.jsx";
import LiquidDistortion from "@/components/LiquidDistortion.tsx";
import { useGlowingBall } from "@/context/GlowingBallContext";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const { setIsHovering, setText } = useGlowingBall();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextProjectIndex, setNextProjectIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setText("Explore");
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setText("");
  };

  const handleNavigation = (direction) => {
    if (isTransitioning) return;

    const nextIndex =
      direction === "previous"
        ? selectedProjectIndex === 0
          ? projectCount - 1
          : selectedProjectIndex - 1
        : selectedProjectIndex === projectCount - 1
        ? 0
        : selectedProjectIndex + 1;

    setNextProjectIndex(nextIndex);
    setIsTransitioning(true);

    gsap
      .timeline()
      .to(".animatedText", {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.inOut",
      })
      .call(() => {
        setSelectedProjectIndex(nextIndex);
      })
      .fromTo(
        ".animatedText",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.inOut",
          delay: 0.3,
        }
      )
      .call(() => {
        setIsTransitioning(false);
      });
  };

  const currentProject = myProjects[selectedProjectIndex];
  const nextProject = myProjects[nextProjectIndex];

  return (
    <section className="c-space my-20" id="work">
      <p className="head-text">Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <motion.div
          className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200"
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText lg:hidden xl:block">
              {currentProject.subdesc}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              <AvatarCircles key={selectedProjectIndex} avatarUrls={currentProject.tags} />
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-lg">Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </motion.div>
        <motion.div
          className="group relative flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => window.open(currentProject.href, "_blank")}
        >
          <LiquidDistortion
            currentImage={currentProject.img}
            nextImage={nextProject.img}
            isTransitioning={isTransitioning}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
