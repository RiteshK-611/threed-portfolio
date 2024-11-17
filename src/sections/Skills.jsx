"use client";

import React from "react";
import RotatingCircle from "../components/RotatingCircle";
import BackgroundLines from "../components/BackgroundLines";

const Skills = () => {
  return (
    <section className="c-space my-20 h-svh overflow-hidden relative">
      <h3 className="head-text">My Skills</h3>

      {/* <div className="relative top-16 sm:top-6">
        <RotatingCircle />
      </div> */}

      <BackgroundLines className="bg-transparent">
        <h2 className="text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent text-center bg-gradient-to-br from-[#8964e8] to-[#25a6e9] font-semibold absolute top-1/2 left-1/2 -translate-x-1/2">
          Always pushing the boundries <br />
          to learn new technologies.
        </h2>
      </BackgroundLines>

      <div
        style={{ clipPath: "circle(30rem at bottom center)" }}
        className="bg-gradient-to-b from-indigo-500 to-purple-500 opacity-10 h-64 w-full"
      ></div>

      <div
        style={{ clipPath: "circle(8rem at bottom center)" }}
        className="bg-gradient-to-b from-purple-500 to-pink-500 opacity-5 h-64 w-full"
      ></div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black-100 md:block hidden"></div>
    </section>
  );
};

export default Skills;
