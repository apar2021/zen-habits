import React from 'react';
import { motion } from 'framer-motion';

type Page = 'dashboard' | 'progress' | 'settings' | 'calendar';

interface SidebarProps {
  onLogout: () => void;
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, onPageChange, currentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <motion.div
      className="w-64 bg-white shadow-lg p-6 flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Zen Habits</h1>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onPageChange(item.id as Page)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center space-x-3 ${
              currentPage === item.id
                ? 'bg-aquamarine-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <motion.button
        onClick={onLogout}
        className="px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center space-x-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>🚪</span>
        <span>Logout</span>
      </motion.button>
    </motion.div>
  );
}; 