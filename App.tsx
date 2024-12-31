import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudyBuddy from './StudyBuddy';
import AddTask from './AddTask';
import { TimerProvider } from './TimerContext';

const App = () => {
  return (
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StudyBuddy />} />
          <Route path="/tasks/:day" element={<AddTask />} />
        </Routes>
      </Router>
    </TimerProvider>
  );
};

export default App;
