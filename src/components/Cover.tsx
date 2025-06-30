import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Cpu } from 'lucide-react';

const Cover: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full-screen Brain Image */}
      <div className="absolute inset-0">
        <motion.img
          src="/main.svg"
          alt="Anatomical brain illustration representing synthetic creativity"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

        {/* Animated glitch overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-pink/10 to-accent-turquoise/10 mix-blend-multiply"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Typography Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">

        {/* Main Title Box - Centered and contained */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-8 py-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="font-space font-light text-5xl md:text-7xl lg:text-8xl text-accent-turquoise uppercase tracking-wider leading-tight mb-6 animate-pulse-slow">
              Synthetic
            </h1>
            <h1 className="font-space font-light text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider leading-tight mb-4">
              Creativity
            </h1>

            <div className="border-t border-white/30 pt-6 mt-6">
              <p className="font-inter font-light text-xl md:text-2xl lg:text-3xl text-white mb-3">
              A Dramaturgy <em className="font-courier underline decoration-accent-turquoise">in vitro</em>
              </p>
              <p className="font-inter font-light text-lg md:text-xl lg:text-2xl text-gray-200 opacity-90">
              Uma Dramaturgia <em className="font-courier underline decoration-accent-turquoise">in vitro</em>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Experimental Publication Badge */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg px-8 py-4 border border-white/20">
            <div className="font-courier text-accent-pink text-lg tracking-widest animate-glitch">
              [ EXPERIMENTAL PUBLICATION ]
            </div>
            <div className="font-courier text-accent-turquoise text-lg tracking-widest opacity-80 mt-1">
              [ PUBLICAÇÃO EXPERIMENTAL ]
            </div>
          </div>
        </motion.div>

        {/* Author Credits - Natural flow positioning */}
        <motion.div
          className="mt-16 flex justify-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20 w-full max-w-4xl">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-white">
              <div className="flex items-center space-x-2">
                <Users size={20} className="text-accent-pink" />
                <span className="font-inter font-light text-lg">Human Co-authorship</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Cpu size={20} className="text-accent-turquoise" />
                <span className="font-inter font-light text-lg">AI Co-authorship</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Zap size={20} className="animate-pulse text-accent-pink" />
                <span className="font-inter font-light text-lg">Emergent Process</span>
              </div>
            </div>

            {/* Publication Info */}
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <div className="text-sm font-courier text-gray-300 space-y-1">
                <p>Bilingual Edition • Edição Bilíngue</p>
                <p>2024 • Laboratory of Creativity in vitro</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles for atmosphere */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Spectral visualization at edges */}
      <div className="absolute top-0 left-0 w-full h-2 opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 1200 8">
          {Array.from({ length: 60 }, (_, i) => (
            <motion.rect
              key={i}
              x={i * 20}
              y={0}
              width="2"
              height="8"
              fill={i % 3 === 0 ? '#EA7DFF' : i % 3 === 1 ? '#08F2DB' : '#FFFFFF'}
              animate={{
                height: [4, 8, 4],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.02
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Cover;
