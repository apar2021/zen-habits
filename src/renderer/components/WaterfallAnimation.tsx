import React from 'react';
import { motion } from 'framer-motion';

interface WaterfallAnimationProps {
  count?: number;
}

export const WaterfallAnimation = ({ count = 5 }: WaterfallAnimationProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-24 bg-emerald-500/20"
          initial={{ y: -100, x: `${(index * 100) / count}%` }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default WaterfallAnimation; 