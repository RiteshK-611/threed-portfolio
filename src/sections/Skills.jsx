"use client";

import React from "react";
import RotatingCircle from "../components/RotatingCircle";
import BackgroundLines from "../components/BackgroundLines";

const Skills = () => {
  return (
    <section className="c-space my-20 h-svh overflow-hidden relative">
      <h3 className="head-text">My Skills</h3>

      <div className="relative top-6">
        <RotatingCircle />
      </div>

      <BackgroundLines>
        <h2 className="text-2xl md:text-4xl bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white font-semibold absolute top-1/2 left-1/2 -translate-x-1/2">
          Always pushing the boundries <br />
          to learn new technologies.
        </h2>
      </BackgroundLines>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black-100"></div>
    </section>
  );
};

export default Skills;
