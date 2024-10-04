"use client";

import { useState, useEffect } from "react";

const GlowingBall = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);

  // Listen to mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate ball to follow the cursor
  useEffect(() => {
    const animateBall = () => {
      let dx = mouseX - ballX;
      let dy = mouseY - ballY;

      setBallX((prevBallX) => prevBallX + dx * 0.01);
      setBallY((prevBallY) => prevBallY + dy * 0.01);

      requestAnimationFrame(animateBall);
    };

    animateBall();
  }, [mouseX, mouseY, ballX, ballY]);

  return (
    <div className="absolute inset-0">
      <div
        id="ball"
        className="w-3 h-3 bg-orange-600 rounded-full fixed pointer-events-none shadow-[0_0_20px_5px_rgba(255,69,0,0.7)]"
        style={{
          position: "absolute",
          left: `${ballX}px`,
          top: `${ballY}px`,
          transform: "translate(-50%, -50%)"
        }}
      />
    </div>
  );
};

export default GlowingBall;
