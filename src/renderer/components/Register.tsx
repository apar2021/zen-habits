import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WaterfallAnimation } from './WaterfallAnimation';

interface RegisterProps {
  onRegister: (username: string, password: string, email: string) => void;
  onBackToLogin: () => void;
  error?: string;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onBackToLogin, error: parentError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword || !email) {
      setLocalError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError('');
    onRegister(username, password, email);
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
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
        
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
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aquamarine-500 text-gray-900 bg-white"
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aquamarine-500 text-gray-900 bg-white"
              placeholder="Confirm your password"
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
            Register
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full py-2 text-aquamarine-600 hover:text-aquamarine-700 transition-colors font-medium"
          >
            Already have an account? Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}; 