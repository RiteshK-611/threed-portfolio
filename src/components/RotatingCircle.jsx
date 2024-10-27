// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { iconList } from "@/data";

// const RotatingCircle = () => {
//   const [isInView, setIsInView] = useState(false);
//   const circleRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsInView(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (circleRef.current) {
//       observer.observe(circleRef.current);
//     }

//     return () => {
//       if (circleRef.current) {
//         observer.unobserve(circleRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={circleRef}
//       className="absolute inset-0 w-full h-full flex justify-center items-center -z-10">
//       <div className="absolute w-full h-full flex justify-center items-center top-[-35%]">
//         {iconList.map((url, index) => (
//           <div
//             key={index}
//             className="absolute w-[110px] h-[110px] flex items-center justify-center group"
//             style={{
//               transformOrigin: "center 650px",
//               transform: `rotate(calc(360deg / ${iconList.length} * ${index}))`,
//               opacity: isInView ? 1 : 0,
//               transition: `opacity 0.5s ease ${
//                 index * 0.1
//               }s, transform 1s ease ${index * 0.1}s`,
//               animation: isInView
//                 ? `rotate 30s linear infinite ${index * -1.25}s`
//                 : "none",
//               willChange: "transform"
//             }}>
//             <Image
//               className="absolute blur-sm opacity-30 custom-transform-backdrop-2 group-hover:custom-transform-hover"
//               src={`/assets/svgs${url[0]}`}
//               width={40}
//               height={40}
//               alt={url[1]}
//             />
//             <Image
//               className="relative transition-transform ease-in-out duration-300 group-hover:scale-105"
//               src={`/assets/svgs${url[0]}`}
//               width={40}
//               height={40}
//               alt={url[1]}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RotatingCircle;

"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { iconList } from "@/constants";

const RotatingCircle = () => {
  const controls = useAnimation();
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true, amount: 0.3 });
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, imagesLoaded, controls]);

  return (
    <div
      ref={circleRef}
      className="relative w-full h-full flex justify-center items-center -z-10">
      <div className="absolute w-full h-full flex justify-center items-center bottom-[50%]">
        {iconList.map((url, index) => (
          <motion.div
            key={index}
            className="absolute flex items-center justify-center"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: {
                opacity: 0,
                rotate: 0,
              },
              visible: {
                opacity: 1,
                rotate: [0, 360],
                transition: {
                  opacity: { delay: index * 0.1, duration: 0.5 },
                  rotate: {
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                    delay: index * -1.25,
                  },
                },
              },
            }}
            style={{
              transformOrigin: "center 600px",
              willChange: "transform, opacity",
            }}>
            <Image
              className="absolute blur-sm opacity-30 custom-transform-backdrop-2 group-hover:custom-transform-hover"
              src={`/assets${url[0]}`}
              width={40}
              height={40}
              alt={url[1]}
              loading="eager"
              onLoad={handleImageLoad}
            />
            <Image
              className="relative transition-transform ease-in-out duration-300 group-hover:scale-105"
              src={`/assets${url[0]}`}
              width={40}
              height={40}
              alt={url[1]}
              loading="eager"
              onLoad={handleImageLoad}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(RotatingCircle);