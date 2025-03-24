import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Progress } from './components/Progress';
import { Calendar } from './components/Calendar';
import { Login } from './components/Login';
import { Register } from './components/Register';

interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
}

interface User {
  id: number;
  username: string;
  email: string;
}

type Page = 'dashboard' | 'progress' | 'calendar';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadHabits();
    }
  }, [currentUser]);

  const loadHabits = async () => {
    if (currentUser) {
      const userHabits = await window.electron.ipcRenderer.invoke('get-habits', currentUser.id);
      setHabits(userHabits);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await window.electron.ipcRenderer.invoke('login', { username, password });
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const result = await window.electron.ipcRenderer.invoke('create-user', { username, email, password });
      if (result.success) {
        setCurrentUser({ id: result.userId, username, email });
        setIsLoggedIn(true);
        setShowRegister(false);
        setError('');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setHabits([]);
  };

  const handleAddHabit = async (title: string) => {
    if (currentUser) {
      try {
        const result = await window.electron.ipcRenderer.invoke('add-habit', {
          userId: currentUser.id,
          title,
        });
        if (result.success) {
          await loadHabits();
        }
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  const handleCompleteHabit = async (id: string) => {
    try {
      const habit = habits.find(h => h.id === id);
      if (habit) {
        await window.electron.ipcRenderer.invoke('update-habit', {
          habitId: id,
          completed: !habit.completed,
          streak: !habit.completed ? habit.streak + 1 : habit.streak - 1,
        });
        await loadHabits();
      }
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  const handleRemoveHabit = async (id: string) => {
    try {
      await window.electron.ipcRenderer.invoke('delete-habit', id);
      await loadHabits();
    } catch (error) {
      console.error('Error removing habit:', error);
    }
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
      case 'calendar':
        return <Calendar habits={habits} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aquamarine-400 to-aquamarine-600">
      {isLoggedIn && (
        <Sidebar
          onLogout={handleLogout}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
      )}
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
}; 