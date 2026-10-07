import React from 'react';
import Weather from './components/Weather';
import TaskManager from './components/TaskManager';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>🌦️ Weather & Task Planner</h1>
      <Weather />
      <TaskManager />
    </div>
  );
}