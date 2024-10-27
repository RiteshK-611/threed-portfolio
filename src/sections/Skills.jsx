import React from "react";
import RotatingCircle from "../components/RotatingCircle";

const Skills = () => {
  return (
    <section className="c-space my-20 h-screen overflow-hidden">
      <h3 className="head-text">My Skills</h3>

      <div className="relative top-10">
        <RotatingCircle />
      </div>

      <div className="absolute bottom-0 w-full h-20 bg-white"></div>
    </section>
  );
};

export default Skills;
