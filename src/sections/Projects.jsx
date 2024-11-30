"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useState, useEffect, useRef } from "react";

import { myProjects } from "../constants/index.js";
import AvatarCircles from "@/components/AvatarCircles.jsx";
import GlowingBall from "@/components/GlowingBall.jsx";
import LiquidDistortion from "@/components/LiquidDistortion.tsx";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextProjectIndex, setNextProjectIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageAspectRatios, setImageAspectRatios] = useState({});

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

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

  // Preload all project images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = myProjects.flatMap((project) => [
        project.img,
        project.spotlight,
      ]);
      const uniqueUrls = [...new Set(imageUrls)];
      const ratios = {};

      try {
        await Promise.all(
          uniqueUrls.map(async (url) => {
            new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Still resolve on error to continue loading
              img.src = url;
            });
            const ratio = await getImageAspectRatio(url);
            ratios[url] = ratio;
          })
        );
      } catch (error) {
        console.error("Error preloading images:", error);
      }

      setImagesLoaded(true);
      setImageAspectRatios(ratios);
    };

    preloadImages();
  }, []);

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
          {/* <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 opacity-0 blur-xl transition-all duration-500 md:group-hover:opacity-10 animate-gradient-xy" /> */}

          {/* Content container with white background */}
          <GlowingBall isHovering={isHovering} text="Explore" />
          
          <LiquidDistortion
            currentImage={currentProject.img}
            nextImage={nextProject.img}
            isTransitioning={isTransitioning}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // aspectRatio={imageAspectRatios[currentImage]}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
