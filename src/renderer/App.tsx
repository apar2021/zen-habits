import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Progress } from './components/Progress';
import { Settings } from './components/Settings';
import { Calendar } from './components/Calendar';
import { Register } from './components/Register';
import { ParticleBackground } from './components/ParticleBackground';

interface User {
  username: string;
  password: string;
  email?: string;
}

interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
}

const DEMO_USER: User = {
  username: 'demo',
  password: 'password123'
};

type Page = 'dashboard' | 'progress' | 'settings' | 'calendar';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([DEMO_USER]);
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleLogin = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = (username: string, password: string, email: string) => {
    if (users.some(u => u.username === username)) {
      setError('Username already exists');
      return;
    }
    setUsers([...users, { username, password, email }]);
    setIsLoggedIn(true);
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHabits([]);
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAddHabit = (title: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      streak: 0,
      completed: false,
    };
    setHabits([...habits, newHabit]);
  };

  const handleCompleteHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return {
          ...habit,
          completed: !habit.completed,
          streak: !habit.completed ? habit.streak + 1 : habit.streak - 1,
        };
      }
      return habit;
    }));
  };

  const handleRemoveHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      if (showRegister) {
        return (
          <Register
            onRegister={handleRegister}
            onBackToLogin={() => setShowRegister(false)}
            error={error}
          />
        );
      }
      return (
        <Login
          onLogin={handleLogin}
          onRegister={() => setShowRegister(true)}
          error={error}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            habits={habits}
            onAddHabit={handleAddHabit}
            onCompleteHabit={handleCompleteHabit}
            onRemoveHabit={handleRemoveHabit}
          />
        );
      case 'progress':
        return <Progress habits={habits} />;
      case 'settings':
        return <Settings />;
      case 'calendar':
        return <Calendar habits={habits} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aquamarine-400 to-aquamarine-600 flex">
      <ParticleBackground />
      {isLoggedIn && (
        <Sidebar
          onLogout={handleLogout}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App; 