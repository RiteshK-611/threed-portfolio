"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AvatarCircles = ({ className, avatarUrls }) => {
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

  return (
    <div className={cn("z-10 flex -space-x-3 rtl:space-x-reverse", className)}>
      {avatarUrls.map(({ id, name, path }) => (
        <div
          key={id}
          onMouseEnter={() => setHoveredAvatar(id)}
          onMouseLeave={() => setHoveredAvatar(null)}
          className="relative"
        >
          <Image
            className="p-3"
            src={`/assets/svgs${path}`}
            width={45}
            height={45}
            alt={name}
          />
          <AnimatePresence>
            {hoveredAvatar === id && name && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
              >
                {name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AvatarCircles;
