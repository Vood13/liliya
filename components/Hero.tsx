
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none mb-4 select-none">
          котенок
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase opacity-60"
        >
          Lily / Digital Fortress
        </motion.p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className={`w-[1px] h-12 ${isDarkMode ? 'bg-white' : 'bg-black'} opacity-20`}></div>
      </motion.div>
    </section>
  );
};
