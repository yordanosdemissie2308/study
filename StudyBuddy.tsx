import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StudyBuddy = () => {
  const [theme, setThem] = useState('light');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setActive] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      taskName: 'Math Homework',
      dueDate: 'Tomorrow',
      completion: 80,
    },
    {
      id: 2,
      taskName: 'Science Project',
      dueDate: 'Next Week',
      completion: 40,
    },
  ]);

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
  }, [isActive]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSwitchTheme = () => {
    setThem(theme === 'dark' ? 'light' : 'dark');
  };

  const tasks: Record<string, string[]> = {
    Mon: ['Math Homework', 'English Essay'],
    Tue: [],
    Wed: ['Science Project'],
    Thu: ['History Presentation', 'Art Assignment'],
    Fri: [],
    Sat: ['Computer Lab'],
    Sun: [],
  };

  const updateCompletion = (id: number, newCompletion: number) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completion: newCompletion }
          : assignment
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-500 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">StudyBuddy</h1>
          <button
            onClick={handleSwitchTheme}
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
          >
            Toggle Theme
          </button>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Calendar</h2>
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Link
                to={`/tasks/${day}`}
                key={day}
                className="border p-4 rounded bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600"
              >
                <h3 className="text-center font-bold">{day}</h3>
                <p className="mt-2 text-sm">{`${tasks[day].length || 0} tasks`}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Assignment Tracker</h2>
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{assignment.taskName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {assignment.dueDate}
                  </p>
                </div>
                <div>
                  <span className="text-sm mr-2">{assignment.completion}% Complete</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={assignment.completion}
                    onChange={(e) =>
                      updateCompletion(assignment.id, parseInt(e.target.value))
                    }
                    className="w-32"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Productivity Insights</h2>
          <div className="flex justify-around">
            <div className="w-1/3">
              <p className="text-center font-semibold">Time Spent</p>
              <div className="bg-blue-500 text-white p-4 rounded-full text-center mt-4">
                {Math.floor(timeSpent / 3600)}h
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-center font-semibold">Tasks Completed</p>
              <div className="bg-green-500 text-white p-4 rounded-full text-center mt-4">
                {assignments.filter((a) => a.completion === 100).length}/{assignments.length}
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-center font-semibold">Break Time</p>
              <div className="bg-yellow-500 text-white p-4 rounded-full text-center mt-4">
                {Math.floor(timeSpent / 3600)}h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;
