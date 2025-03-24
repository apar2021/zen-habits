import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HabitCard } from './HabitCard';
import { HabitForm } from './HabitForm';
import { WaterfallAnimation } from './WaterfallAnimation';

interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
}

interface DashboardProps {
  habits: Habit[];
  onAddHabit: (title: string) => void;
  onCompleteHabit: (id: string) => void;
  onRemoveHabit: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  habits,
  onAddHabit,
  onCompleteHabit,
  onRemoveHabit,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddHabit = (title: string) => {
    onAddHabit(title);
    setShowForm(false);
  };

  return (
    <motion.div
      className="flex-1 p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-aquamarine-500 text-white rounded-lg hover:bg-aquamarine-600 transition-colors"
        >
          Add Habit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <HabitCard
              title={habit.title}
              streak={habit.streak}
              completed={habit.completed}
              onComplete={() => onCompleteHabit(habit.id)}
              onRemove={() => onRemoveHabit(habit.id)}
            />
          </motion.div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
          >
            <HabitForm onSubmit={handleAddHabit} onCancel={() => setShowForm(false)} />
          </motion.div>
        </div>
      )}

      <WaterfallAnimation />
    </motion.div>
  );
}; 