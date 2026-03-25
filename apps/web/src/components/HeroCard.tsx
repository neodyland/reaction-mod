"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Logo from "@/assets/logo.png";

interface HeroCardProps {
  inviteUrl: string;
}

export function HeroCard({ inviteUrl }: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl" />

      <div className="relative p-8 md:p-12 space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={Logo.src}
                alt="Reaction Moderator Logo"
                width={200}
                height={200}
                className="rounded-xl drop-shadow-2xl relative"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Reaction Moderator
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Add the bot and run{" "}
            <code className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold rounded-lg shadow-lg inline-block">
              /settings
            </code>{" "}
            to get started!
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />

            <span className="relative z-10">Invite Bot to Discord</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}