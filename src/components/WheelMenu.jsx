"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import ParticleBackground from "./Particle.jsx";

const socialLinks = [
  {
    name: "X",
    icon: "https://api.iconify.design/tabler:brand-x.svg?color=white",
    url: "https://x.com/riteshkokam",
    color: "#333333",
  },
  {
    name: "GitHub",
    icon: "https://api.iconify.design/tabler:brand-github.svg?color=white",
    url: "https://github.com/riteshk-611",
    color: "#333333",
  },
  {
    name: "LinkedIn",
    icon: "https://api.iconify.design/tabler:brand-linkedin.svg?color=white",
    url: "https://linkedin.com/in/riteshkokam",
    color: "#333333",
  },
];

const WheelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const menuRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!isOpen || !menuRef.current) return;

    const rect = menuRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Get pointer position relative to center
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);

    // Define selection boundaries
    const minDistance = 60; // Distance from center where selection starts
    const maxDistance = 180; // Maximum distance for selection

    // Only select if within the selection ring
    if (distance < minDistance || distance > maxDistance) {
      setSelectedIndex(null);
      return;
    }

    // Calculate angle and convert to degrees
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    // Determine selected segment
    const segmentSize = 360 / socialLinks.length;
    const selected = Math.floor(normalizedAngle / segmentSize);
    setSelectedIndex(selected % socialLinks.length);
  };

  const handlePointerUp = () => {
    if (selectedIndex !== null && isOpen) {
      window.open(socialLinks[selectedIndex].url, "_blank");
    }
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const handlePointerDown = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative h-[400px] w-full touch-none">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-center absolute inset-0">
        {/* Center Button */}
        <div className="relative">
          <motion.div className="w-16 h-16 aspect-square rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-center z-10">
            <span className="text-white/70 select-none text-sm">Socials</span>
          </motion.div>

          {/* Static Circle of Icons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {socialLinks.map((link, index) => {
              const angle = (index * 360) / socialLinks.length;
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              const isHovered = hoveredIndex === index;

              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute"
                  style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  // whileHover={{ scale: 1.1 }}
                >
                  <Socials isSelected={isHovered} link={link} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div
        className="lg:hidden absolute inset-0 flex items-center justify-center"
        ref={menuRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Background Elements */}
        <div className="relative">
          <ParticleBackground />
          <motion.div
            className="w-16 h-16 aspect-square rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer text-center hover:bg-white/20 transition-colors relative z-10"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white/70 select-none text-sm">Socials</span>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Darkened background */}
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Selection wheel */}
              <motion.div
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                {socialLinks.map((link, index) => {
                  const angle = (index * 360) / socialLinks.length;
                  const radius = 120;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  const isSelected = selectedIndex === index;

                  return (
                    <motion.div
                      key={link.name}
                      className="absolute"
                      style={{
                        x,
                        y,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                    >
                      <Socials isSelected={isSelected} link={link} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Socials = ({ isSelected, link }) => {
  return (
    <motion.div
      className="relative"
      animate={{
        scale: isSelected ? 1.2 : 1,
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute -inset-2 border-2 border-white rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}

      {/* Icon container */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${
          isSelected ? "bg-opacity-100" : "bg-white/10"
        }`}
        style={{
          backgroundColor: isSelected ? link.color : "rgba(255, 255, 255, 0.1)",
          boxShadow: isSelected ? `0 0 20px ${link.color}80` : "none",
        }}
      >
        <img
          src={link.icon}
          alt={link.name}
          className="w-8 h-8"
          style={{
            filter: isSelected ? "brightness(1)" : "brightness(0.8)",
          }}
        />
      </div>

      {/* Label */}
      {isSelected && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-3 py-1 rounded-md pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-white text-sm whitespace-nowrap select-none">
            {link.name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WheelMenu;
