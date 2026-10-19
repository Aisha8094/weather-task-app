import React from 'react';
import Weather from './components/Weather';
import TaskManager from './components/TaskManager';

// @ts-ignore
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather & Task Planner</h1>
      </header>
      <main className="app-main">
        <Weather />
        <TaskManager />
      </main>
    </div>
  );
};

export default App;