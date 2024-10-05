"use client";

import { useEffect, useRef } from "react";

const GlowingBall = () => {
  const ballRef = useRef(null);
  const ballPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animateBall = () => {
      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;
      ballPos.current.x += dx * 0.07;
      ballPos.current.y += dy * 0.07;

      if (ballRef.current) {
        ballRef.current.style.left = `${ballPos.current.x}px`;
        ballRef.current.style.top = `${ballPos.current.y}px`;
      }

      requestAnimationFrame(animateBall);
    };

    animateBall();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ballRef}
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#ff4500",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        boxShadow: "0 0 20px 5px rgba(255, 69, 0, 0.7)",
        transition: "all 0.3s ease",
      }}
    />
  );
};

export default GlowingBall;
