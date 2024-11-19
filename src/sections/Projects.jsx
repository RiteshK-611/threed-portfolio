"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useState, useEffect, useRef } from "react";

import { myProjects } from "../constants/index.js";
import AvatarCircles from "@/components/AvatarCircles.jsx";
import GlowingBall from "@/components/GlowingBall.jsx";
import LiquidDistortion from "@/components/LiquidDistortion.jsx";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextProjectIndex, setNextProjectIndex] = useState(0);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // const handleNavigation = (direction) => {
  //   setSelectedProjectIndex((prevIndex) => {
  //     if (direction === "previous") {
  //       return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
  //     } else {
  //       return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
  //     }
  //   });
  // };

  const handleNavigation = (direction) => {
    const nextIndex = direction === 'previous'
      ? selectedProjectIndex === 0 ? projectCount - 1 : selectedProjectIndex - 1
      : selectedProjectIndex === projectCount - 1 ? 0 : selectedProjectIndex + 1;
    
    setNextProjectIndex(nextIndex);
    setIsTransitioning(true);
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [selectedProjectIndex]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setSelectedProjectIndex(nextProjectIndex);
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];
  const nextProject = myProjects[nextProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
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
              {/* {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))} */}
              <AvatarCircles avatarUrls={currentProject.tags} />
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Live Site</p>
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
        </div>
        <div className="group relative flex items-center justify-center">
          {/* Background gradient animation container */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 opacity-0 blur-xl transition-all duration-500 md:group-hover:opacity-10 animate-gradient-xy" />

          {/* Content container with white background */}
          <GlowingBall isHovering={isHovering} text="Explore" />
          {/* <div
            className="relative flex items-center justify-center rounded-lg bg-white/5 border-5 border-white md:p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
          <img className="rounded-lg" src={currentProject.img} />
        </div> */}
        <LiquidDistortion
          currentImage={currentProject.img}
          nextImage={nextProject.img}
          isTransitioning={isTransitioning}
        />
        </div>
      </div>
    </section>
  );
};

export default Projects;
