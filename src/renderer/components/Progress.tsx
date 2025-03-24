import React from 'react';
import { motion } from 'framer-motion';

interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
}

interface ProgressProps {
  habits: Habit[];
}

export const Progress: React.FC<ProgressProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter(habit => habit.completed).length;
  const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
  const totalStreaks = habits.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <motion.div
      className="flex-1 p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Completion Rate</h2>
          <div className="text-4xl font-bold text-aquamarine-500">{completionRate.toFixed(1)}%</div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Streaks</h2>
          <div className="text-4xl font-bold text-aquamarine-500">{totalStreaks}</div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Habits</h2>
          <div className="text-4xl font-bold text-aquamarine-500">{totalHabits}</div>
        </motion.div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Habit Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{habit.title}</h3>
              <div className="text-2xl font-bold text-aquamarine-500">{habit.streak}</div>
              <div className="text-sm text-gray-600 mt-2">
                Status: {habit.completed ? 'Completed' : 'In Progress'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 