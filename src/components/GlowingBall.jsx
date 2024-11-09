"use client";

// import { useEffect, useRef } from "react";

// const GlowingBall = () => {
//   const ballRef = useRef(null);
//   const ballPos = useRef({ x: 0, y: 0 });
//   const mousePos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     const animateBall = () => {
//       const dx = mousePos.current.x - ballPos.current.x;
//       const dy = mousePos.current.y - ballPos.current.y;
//       ballPos.current.x += dx * 0.07;
//       ballPos.current.y += dy * 0.07;

//       if (ballRef.current) {
//         ballRef.current.style.left = `${ballPos.current.x}px`;
//         ballRef.current.style.top = `${ballPos.current.y}px`;
//       }

//       requestAnimationFrame(animateBall);
//     };

//     animateBall();

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       ref={ballRef}
//       style={{
//         width: "10px",
//         height: "10px",
//         borderRadius: "50%",
//         backgroundColor: "#ff4500",
//         position: "fixed",
//         transform: "translate(-50%, -50%)",
//         pointerEvents: "none",
//         boxShadow: "0 0 20px 5px rgba(255, 69, 0, 0.7)",
//         transition: "all 0.3s ease",
//       }}
//     />
//   );
// };

// export default GlowingBall;

// import React, { useEffect, useRef, useState } from 'react';

// const GlowingBall = ({
//   isHovering = false,
//   text = "Explore"
// }) => {
//   const ballRef = useRef(null);
//   const ballPos = useRef({ x: 0, y: 0 });
//   const mousePos = useRef({ x: 0, y: 0 });
//   const trailsRef = useRef([]);
//   const requestRef = useRef();
//   const [size, setSize] = useState(10); // Ball size in pixel
//   const [trailSize, setTrailSize] = useState(10); // Size of the trailing glow
//   const trailOpacity = 0.7; // Opacity of the trail
//   const speed = 0.1 // Movement speed

//   useEffect(() => {
//     setSize(isHovering ? 90 : 10);
//     setTrailSize(isHovering ? 90 : 10);

//     console.log("Size: ", size);
//     console.log("Trail Size: ", trailSize)

//     const handleMouseMove = (e) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     const animateBall = () => {
//       const dx = mousePos.current.x - ballPos.current.x;
//       const dy = mousePos.current.y - ballPos.current.y;
//       ballPos.current.x += dx * speed;
//       ballPos.current.y += dy * speed;

//       if (ballRef.current) {
//         ballRef.current.style.left = `${ballPos.current.x}px`;
//         ballRef.current.style.top = `${ballPos.current.y}px`;

//         // Update trails array
//         trailsRef.current.push({ x: ballPos.current.x, y: ballPos.current.y });
//         if (trailsRef.current.length > 20) { // Number of trail elements
//           trailsRef.current.shift();
//         }

//         // Create gradient based on movement direction
//         const angle = Math.atan2(dy, dx) * (180 / Math.PI);
//         const gradient = `linear-gradient(${angle}deg, #8964e8, #25a6e9)`;
//         ballRef.current.style.background = gradient;
//       }

//       requestRef.current = requestAnimationFrame(animateBall);
//     };

//     animateBall();

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(requestRef.current);
//     };
//   }, [speed, isHovering]);

//   return (
//     <div className='relative'>
//       <div
//         ref={ballRef}
//         className="flex items-center justify-center"
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           borderRadius: '50%',
//           background: 'linear-gradient(45deg, #8964e8, #25a6e9)',
//           position: 'fixed',
//           transform: 'translate(-50%, -50%)',
//           pointerEvents: 'none',
//           boxShadow: `
//           0 0 ${trailSize}px ${trailSize / 4}px rgba(137, 100, 232, ${trailOpacity}),
//           0 0 ${trailSize * 1.5}px ${trailSize / 2}px rgba(37, 166, 233, ${trailOpacity * 0.5})
//         `,
//           transition: 'all 0.1s ease',
//           zIndex: 50
//         }}
//       >
//         <span
//           className={`absolute select-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'
//             }`}
//           style={{
//             fontSize: `${size / 6}px`,
//             transform: 'translateY(1px)'
//           }}
//         >
//           {text}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default GlowingBall;

// import React, { useEffect, useRef, useState } from 'react';

// const GlowingBall = ({
//   isHovering = false,
//   text = "Explore"
// }) => {
//   const ballRef = useRef(null);
//   const ballPos = useRef({ x: 0, y: 0 });
//   const velocity = useRef({ x: 0, y: 0 });
//   const mousePos = useRef({ x: 0, y: 0 });
//   const prevMousePos = useRef({ x: 0, y: 0 });
//   const trailsRef = useRef([]);
//   const requestRef = useRef();
//   const [size, setSize] = useState(10); // Ball size in pixel
//   const [trailSize, setTrailSize] = useState(10); // Size of the trailing glow
//   const trailOpacity = 0.7; // Opacity of the trail

//   // Physics constants
//   const speed = 0.15;
//   const maxSquish = 1.5; // Maximum squish factor
//   const squishFactor = 0.15; // How much velocity affects squishing
//   const returnSpeed = 0.2; // How fast the ball returns to its original shape

//   useEffect(() => {
//     setSize(isHovering ? 90 : 10);
//     setTrailSize(isHovering ? 90 : 10);

//     const handleMouseMove = (e) => {
//       prevMousePos.current = { ...mousePos.current };
//       mousePos.current = { x: e.clientX, y: e.clientY };

//       // Calculate velocity based on mouse movement
//       velocity.current = {
//         x: mousePos.current.x - prevMousePos.current.x,
//         y: mousePos.current.y - prevMousePos.current.y
//       };
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     const animateBall = () => {
//       const dx = mousePos.current.x - ballPos.current.x;
//       const dy = mousePos.current.y - ballPos.current.y;

//       // Update ball position with smoothing
//       ballPos.current.x += dx * speed;
//       ballPos.current.y += dy * speed;

//       if (ballRef.current) {
//         // Calculate movement angle and velocity magnitude
//         const angle = Math.atan2(velocity.current.y, velocity.current.x);
//         const velocityMagnitude = Math.sqrt(
//           velocity.current.x ** 2 + velocity.current.y ** 2
//         );

//         // Calculate squish based on velocity
//         const squishX = Math.min(maxSquish, 1 + Math.abs(velocity.current.x) * squishFactor);
//         const squishY = Math.min(maxSquish, 1 + Math.abs(velocity.current.y) * squishFactor);

//         // Apply position and deformation
//         ballRef.current.style.left = `${ballPos.current.x}px`;
//         ballRef.current.style.top = `${ballPos.current.y}px`;
//         ballRef.current.style.transform = `
//           translate(-50%, -50%)
//           scale(${squishX}, ${squishY})
//         `;

//         // Update trails
//         trailsRef.current.push({
//           x: ballPos.current.x,
//           y: ballPos.current.y,
//           squishX,
//           squishY
//         });

//         if (trailsRef.current.length > 20) {
//           trailsRef.current.shift();
//         }

//         // Dynamic gradient based on velocity
//         const gradientAngle = Math.atan2(dy, dx) * (180 / Math.PI);
//         const gradient = `linear-gradient(${gradientAngle}deg, #8964e8, #25a6e9)`;

//         ballRef.current.style.background = gradient;

//         // Gradually reset velocity
//         velocity.current.x *= 0.9;
//         velocity.current.y *= 0.9;
//       }

//       requestRef.current = requestAnimationFrame(animateBall);
//     };

//     animateBall();

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(requestRef.current);
//     };
//   }, [isHovering]);

//   return (
//     <div className='relative'>
//       <div
//         ref={ballRef}
//         className="flex items-center justify-center"
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           borderRadius: '50%',
//           background: 'linear-gradient(45deg, #8964e8, #25a6e9)',
//           position: 'fixed',
//           transform: 'translate(-50%, -50%)',
//           pointerEvents: 'none',
//           boxShadow: `
//           0 0 ${trailSize}px ${trailSize / 4}px rgba(137, 100, 232, ${trailOpacity}),
//           0 0 ${trailSize * 1.5}px ${trailSize / 2}px rgba(37, 166, 233, ${trailOpacity * 0.5})
//         `,
//           transition: 'all 0.1s ease',
//           zIndex: 50,
//           willChange: 'transform, left, top, background'
//         }}
//       >
//         <span
//           className={`absolute select-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'
//             }`}
//           style={{
//             fontSize: `${size / 6}px`,
//             transform: 'translateY(1px)'
//           }}
//         >
//           {text}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default GlowingBall;

import React, { useEffect, useRef, useState } from 'react';

const GlowingBall = ({
  isHovering = false,
  text = "Explore"
}) => {
  const ballRef = useRef(null);
  const ballPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  const trailsRef = useRef([]);
  const requestRef = useRef();
  const [size, setSize] = useState(10); // Ball size in pixel
  const [trailSize, setTrailSize] = useState(10); // Size of the trailing glow
  const trailOpacity = 0.2; // Opacity of the trail

  // Physics constants
  const speed = 0.15;
  const maxSquish = 0.5; // Maximum deformation amount
  const squishFactor = 0.008; // How much velocity affects squishing
  const returnSpeed = 0.2; // How fast the ball returns to its original shape

  useEffect(() => {
    setSize(isHovering ? 90 : 10);
    setTrailSize(isHovering ? 90 : 10);

    const handleMouseMove = (e) => {
      prevMousePos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity based on mouse movement
      velocity.current = {
        x: mousePos.current.x - prevMousePos.current.x,
        y: mousePos.current.y - prevMousePos.current.y
      };
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animateBall = () => {
      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;

      // Update ball position with smoothing
      ballPos.current.x += dx * speed;
      ballPos.current.y += dy * speed;

      if (ballRef.current) {
        // Calculate velocity magnitude and direction
        const velocityMagnitude = Math.sqrt(
          velocity.current.x ** 2 + velocity.current.y ** 2
        );
        
        // Calculate directional deformation
        let scaleX = 1;
        let scaleY = 1;
        
        // Apply deformation based on velocity direction
        if (Math.abs(velocity.current.x) > Math.abs(velocity.current.y)) {
          // Horizontal movement
          const deform = Math.min(maxSquish, Math.abs(velocity.current.x) * squishFactor);
          if (velocity.current.x > 0) {
            // Moving right
            scaleX = 1 + deform;
            scaleY = 1 / (1 + deform * 0.5); // Preserve approximate area
          } else {
            // Moving left
            scaleX = 1 + deform;
            scaleY = 1 / (1 + deform * 0.5); // Preserve approximate area
          }
        } else {
          // Vertical movement
          const deform = Math.min(maxSquish, Math.abs(velocity.current.y) * squishFactor);
          if (velocity.current.y > 0) {
            // Moving down
            scaleY = 1 + deform;
            scaleX = 1 / (1 + deform * 0.5); // Preserve approximate area
          } else {
            // Moving up
            scaleY = 1 + deform;
            scaleX = 1 / (1 + deform * 0.5); // Preserve approximate area
          }
        }

        // Apply position and deformation
        ballRef.current.style.left = `${ballPos.current.x}px`;
        ballRef.current.style.top = `${ballPos.current.y}px`;
        
        // Calculate angle based on movement direction
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        ballRef.current.style.transform = `
          translate(-50%, -50%)
          scale(${scaleX}, ${scaleY})
        `;

        // Update trails
        trailsRef.current.push({ 
          x: ballPos.current.x, 
          y: ballPos.current.y,
          scaleX,
          scaleY 
        });

        // Dynamic gradient based on velocity
        const gradientAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const gradient = `linear-gradient(${gradientAngle}deg, #8964e8, #25a6e9)`;

        ballRef.current.style.background = isHovering ? "#fff" : gradient;

        // Gradually reset velocity
        velocity.current.x *= 0.9;
        velocity.current.y *= 0.9;
      }

      requestRef.current = requestAnimationFrame(animateBall);
    };

    animateBall();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isHovering]);

  return (
    <div className='relative'>
      <div
        ref={ballRef}
        className="flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          // background: 'linear-gradient(45deg, #8964e8, #25a6e9)',
          background: "#fff",
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          boxShadow: `
          0 0 ${trailSize}px ${trailSize / 4}px rgba(137, 100, 232, ${trailOpacity}),
          0 0 ${trailSize * 1.5}px ${trailSize / 2}px rgba(37, 166, 233, ${trailOpacity * 0.5})
        `,
          transition: 'all 0.1s ease',
          zIndex: 50,
          willChange: 'transform, left, top, background'
        }}
      >
        <span
          className={`absolute select-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            fontSize: `${size / 6}px`,
            transform: 'translateY(1px)'
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default GlowingBall;