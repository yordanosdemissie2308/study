import React, { useEffect, useState } from 'react';
import { store } from './store/Stor';
import { useTimer } from './TimerContext';

interface Task {
  task: string;
  taskType: 'Assignment' | 'Study';
  status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed';
  day: string;
  dueDate: string;
  timeSpent: number;
}

const AddTask: React.FC = () => {
  const { timeSpent, startTimer, pauseTimer, resetTimer, isActive, getTotalTimeForWeek } = useTimer();
  const [task, setTask] = useState('');
  const [duedate, setDuedate] = useState('');
  const [taskType, setTaskType] = useState<'Assignment' | 'Study'>('Assignment');
  const [tasks, setTasks] = useState<Task[]>(store.getState() || []);

  useEffect(() => {
    setTasks(store.getState());
  }, [task]);

  const handleAddTask = () => {
    if (task.trim() && duedate.trim()) {
      const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      store.dispatch({
        type: 'Add',
        payload: {
          task,
          taskType,
          status: 'Not Started',
          day: dayOfWeek,
          dueDate: duedate,
          timeSpent: 0,
        },
      });
      setTask('');
      setDuedate('');
    } else {
      alert('Task and Due Date cannot be empty!');
    }
  };

  const updateTaskStatus = (index: number, status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed') => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], status };
    if (status === 'In Progress') {
      startTimer();
    } else if (status === 'Paused') {
      pauseTimer();
    } else if (status === 'Completed') {
      pauseTimer();
      updatedTasks[index].timeSpent += timeSpent;
      resetTimer();
    }
    setTasks(updatedTasks);
  };

  const tasksGroupedByDay = tasks.reduce((groups, task) => {
    if (!groups[task.day]) {
      groups[task.day] = [];
    }
    groups[task.day].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="flex w-full max-w-6xl gap-6">
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Tasks by Day</h2>
          {Object.keys(tasksGroupedByDay).map((day) => (
            <div key={day} className="mb-6">
              <ul>
                {tasksGroupedByDay[day].map((t, index) => (
                  <li
                    key={index}
                    className={`flex flex-col p-3 rounded-md shadow-md mb-2 ${t.status === 'Completed'
                      ? 'bg-green-100'
                      : t.status === 'In Progress'
                        ? 'bg-yellow-100'
                        : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                  >
                    <span className="text-gray-800 dark:text-gray-100">
                      <strong>{t.taskType}:</strong> {t.task}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Due Date: {t.dueDate}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Status: {t.status}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Time Spent: {t.timeSpent + (isActive ? timeSpent : 0)}s
                    </span>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-400"
                        onClick={() => updateTaskStatus(index, 'In Progress')}
                      >
                        Start
                      </button>
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400"
                        onClick={() => updateTaskStatus(index, 'Paused')}
                      >
                        Pause
                      </button>
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
                        onClick={() => updateTaskStatus(index, 'Completed')}
                      >
                        Finish
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-96 bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded shadow">
            <h4 className="text-lg font-semibold">Total Time This Week</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{getTotalTimeForWeek()} seconds</p>
          </div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
            placeholder="Enter Due Date"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value as 'Assignment' | 'Study')}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          >
            <option value="Assignment">Assignment</option>
            <option value="Study">Study</option>
          </select>
          <button onClick={handleAddTask} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-400">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
