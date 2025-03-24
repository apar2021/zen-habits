import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  weeklyReport: boolean;
  reminderTime: string;
}

export const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    darkMode: true,
    weeklyReport: true,
    reminderTime: '09:00'
  });

  const handleToggle = (key: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      reminderTime: e.target.value
    }));
  };

  return (
    <motion.div 
      className="flex-1 p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-white">Settings</h1>
      
      <div className="max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Enable Notifications</label>
                <p className="text-sm text-white/60">Receive reminders for your habits</p>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-aquamarine-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Weekly Progress Report</label>
                <p className="text-sm text-white/60">Get a summary of your weekly achievements</p>
              </div>
              <button
                onClick={() => handleToggle('weeklyReport')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.weeklyReport ? 'bg-aquamarine-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Daily Reminder Time</label>
                <p className="text-sm text-white/60">Set when you want to receive daily reminders</p>
              </div>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={handleTimeChange}
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Dark Mode</label>
              <p className="text-sm text-white/60">Toggle dark/light theme</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-aquamarine-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 