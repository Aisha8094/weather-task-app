import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Plus, Trash2, ListTodo } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputTask, setInputTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputTask,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInputTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <ListTodo size={28} />
        <h2>Task Planner</h2>
      </div>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button type="submit">
          <Plus size={18} /> Add
        </button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p style={{ opacity: 0.7, textAlign: 'center' }}>No tasks added yet. Start planning!</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-left" onClick={() => toggleTask(task.id)}>
                {task.completed ? (
                  <CheckCircle size={20} color="#4cd137" />
                ) : (
                  <Circle size={20} opacity={0.7} />
                )}
                <span>{task.text}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                <Trash2 size={18} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}