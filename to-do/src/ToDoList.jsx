import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    
  ]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObject = {
        id: crypto.randomUUID(),
        task: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveUp = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
    }
  };

  const moveDown = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
    }
  };

  return (
    <div className="to-do-list">
        
      <h1 className="to-do-label">To-Do List</h1>

      <form onSubmit={addTask}>
        <input
          value={newTask}
          onChange={handleInputChange}
          className="taskInput"
          type="text"
          placeholder="Enter a task..."
        />
        <button type="submit" className="enterBtn">
          Enter
        </button>
      </form>
        {tasks.length === 0 && <h2>No tasks yet..</h2>}
      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>

            <span
              className="taskText"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.task}
            </span>

            <button
              className="removeBtn"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>

            <button
              disabled={index === 0}
              className="moveBtn"
              onClick={() => moveUp(task.id)}
            >
              Up
            </button>

            <button
              disabled={index === tasks.length - 1}  
              className="moveBtn"
              onClick={() => moveDown(task.id)}
            >
              Down
            </button>

            <div className="checkboxBlock">
              <span className="isComplete">Completed</span>
              <input
              type="checkbox"
              className="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;