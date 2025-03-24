import React from 'react';
import { motion } from 'framer-motion';

interface HabitCardProps {
  title: string;
  streak: number;
  completed: boolean;
  onComplete: () => void;
  onRemove: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  title,
  streak,
  completed,
  onComplete,
  onRemove,
}) => {
  return (
    <motion.div
      className={`p-6 rounded-lg ${
        completed ? 'bg-aquamarine-100' : 'bg-white'
      } shadow-lg`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Remove habit"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onComplete}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed
              ? 'bg-aquamarine-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          } transition-colors`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed ? '✓' : ''}
        </button>

        <motion.div
          className="text-gray-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {streak} day{streak !== 1 ? 's' : ''} streak
        </motion.div>
      </div>
    </motion.div>
  );
}; 