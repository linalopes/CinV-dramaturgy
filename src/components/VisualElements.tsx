import React from 'react';
import { motion } from 'framer-motion';

const VisualElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Organic Moss-like Patterns */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-5" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="organic-moss" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <motion.circle 
              cx="60" cy="60" r="3" 
              fill="#CAD8D8"
              animate={{ r: [3, 5, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="30" cy="90" r="2" 
              fill="#08F2DB"
              animate={{ r: [2, 4, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.circle 
              cx="90" cy="30" r="1.5" 
              fill="#EA7DFF"
              animate={{ r: [1.5, 3, 1.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <path 
              d="M20,40 Q40,20 60,40 Q80,20 100,40" 
              stroke="#CAD8D8" 
              strokeWidth="0.5" 
              fill="none" 
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#organic-moss)" />
      </svg>

      {/* Floating Glitch Elements */}
      <motion.div
        className="absolute top-20 left-10 w-px h-20 bg-accent-pink opacity-60"
        animate={{ 
          height: [20, 80, 20],
          opacity: [0.6, 0.9, 0.6] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-px h-16 bg-accent-turquoise opacity-50"
        animate={{ 
          height: [16, 64, 16],
          opacity: [0.5, 0.8, 0.5] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear",
          delay: 1 
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-px h-12 bg-gray-green opacity-40"
        animate={{ 
          height: [12, 48, 12],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "linear",
          delay: 2 
        }}
      />

      {/* Spectral Waves */}
      <div className="absolute bottom-0 left-0 w-full h-24 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 100">
          {Array.from({ length: 60 }, (_, i) => (
            <motion.rect
              key={i}
              x={i * 20}
              y={50}
              width="2"
              height="10"
              fill={i % 4 === 0 ? '#EA7DFF' : i % 4 === 1 ? '#08F2DB' : i % 4 === 2 ? '#CAD8D8' : '#22113E'}
              animate={{
                height: [
                  Math.sin(i * 0.1) * 20 + 25,
                  Math.sin(i * 0.1 + Math.PI) * 20 + 25,
                  Math.sin(i * 0.1) * 20 + 25
                ],
                y: [
                  50 - (Math.sin(i * 0.1) * 20 + 25) / 2,
                  50 - (Math.sin(i * 0.1 + Math.PI) * 20 + 25) / 2,
                  50 - (Math.sin(i * 0.1) * 20 + 25) / 2
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.02
              }}
            />
          ))}
        </svg>
      </div>

      {/* Laboratory Grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="lab-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#22113E" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lab-grid)" />
        </svg>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: i % 3 === 0 ? '#EA7DFF' : i % 3 === 1 ? '#08F2DB' : '#CAD8D8',
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
            delay: i * 1.5
          }}
        />
      ))}
    </div>
  );
};

export default VisualElements;