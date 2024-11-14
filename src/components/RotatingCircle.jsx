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
      className="relative w-full h-full flex justify-center items-center"
    >
      <div className="absolute w-full h-full flex justify-center items-center bottom-1/2">
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
            }}
          >
            <Image
              className="relative transition-transform ease-in-out duration-300 rounded-lg"
              src={`/assets/skills${url[0]}`}
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
