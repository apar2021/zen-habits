import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WaterfallAnimation } from './WaterfallAnimation';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onRegister: () => void;
  error?: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegister, error: parentError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLocalError('Please fill in all fields');
      return;
    }
    setLocalError('');
    onLogin(username, password);
  };

  const error = parentError || localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-aquamarine-500 to-aquamarine-700 relative overflow-hidden">
      <WaterfallAnimation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aquamarine-500 text-gray-900 bg-white"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aquamarine-500 text-gray-900 bg-white"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-aquamarine-500 text-white rounded-lg hover:bg-aquamarine-600 transition-colors font-medium text-lg shadow-md"
          >
            Login
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="w-full py-2 text-aquamarine-600 hover:text-aquamarine-700 transition-colors font-medium"
          >
            Don't have an account? Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}; 