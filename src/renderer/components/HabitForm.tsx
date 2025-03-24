import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HabitFormProps {
  onSubmit: (title: string) => void;
  onCancel: () => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-lg w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Habit Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter habit name"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600"
            >
              Add Habit
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}; 