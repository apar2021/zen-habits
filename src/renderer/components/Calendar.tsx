import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Habit {
  id: string;
  title: string;
  streak: number;
  completed: boolean;
}

interface CalendarProps {
  habits: Habit[];
}

interface Note {
  date: string;
  text: string;
}

export const Calendar: React.FC<CalendarProps> = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const existingNote = notes.find(note => note.date === date);
    setNoteText(existingNote ? existingNote.text : '');
  };

  const handleSaveNote = () => {
    if (selectedDate) {
      const newNotes = notes.filter(note => note.date !== selectedDate);
      if (noteText.trim()) {
        newNotes.push({ date: selectedDate, text: noteText.trim() });
      }
      setNotes(newNotes);
      setSelectedDate(null);
      setNoteText('');
    }
  };

  const getNoteForDate = (date: string) => {
    return notes.find(note => note.date === date)?.text || '';
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <motion.div
      className="flex-1 p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
        <div className="flex gap-4">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-aquamarine-500 text-white rounded-lg hover:bg-aquamarine-600 transition-colors"
          >
            Previous Month
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-aquamarine-500 text-white rounded-lg hover:bg-aquamarine-600 transition-colors"
          >
            Next Month
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-800">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {days.map(day => {
            const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const note = getNoteForDate(date);
            return (
              <motion.div
                key={day}
                className={`aspect-square p-2 rounded-lg cursor-pointer ${
                  selectedDate === date ? 'bg-aquamarine-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleDateClick(date)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-gray-800 font-medium">{day}</div>
                {note && (
                  <div className="text-sm text-gray-600 mt-1 truncate">{note}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Notes for {selectedDate}
            </h2>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg mb-4 text-gray-800"
              placeholder="Add your notes here..."
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setNoteText('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-aquamarine-500 text-white rounded-lg hover:bg-aquamarine-600 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}; 