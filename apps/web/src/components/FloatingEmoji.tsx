"use client";

import { motion } from "motion/react";

interface FloatingEmojiProps {
  emoji: string;
  index: number;
}

export function FloatingEmoji({ emoji, index }: FloatingEmojiProps) {
  return (
    <motion.div
      className="absolute text-4xl md:text-6xl opacity-10 pointer-events-none"
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-30, -50, -30, 0],
        rotate: [0, 5, -5, 3, 0],
        opacity: 0.1,
      }}
      transition={{
        duration: 18 + (index % 4) * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.8,
      }}
      style={{
        left: `${(index * 15 + 5) % 90}%`,
        top: `${(index * 20) % 80}%`,
      }}
    >
      {emoji}
    </motion.div>
  );
}
