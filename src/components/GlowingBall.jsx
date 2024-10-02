"use client";

import { useState, useEffect } from "react";

const GlowingBall = () => {
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

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

  useEffect(() => {
    const animateBall = () => {
      const dx = mouseX - ballX;
      const dy = mouseY - ballY;

      setBallX(ballX + dx * 0.1);
      setBallY(ballY + dy * 0.1);

      requestAnimationFrame(animateBall);
    };

    animateBall();
  }, [ballX, ballY, mouseX, mouseY]);

  return (
    <div
      style={{
        position: "fixed",
        left: `${ballX}px`,
        top: `${ballY}px`,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#ff4500",
        pointerEvents: "none",
        boxShadow: "0 0 20px 5px rgba(255, 69, 0, 0.7)",
        transition: "all 0.3s ease",
      }}
    />
  );
};

export default GlowingBall;
