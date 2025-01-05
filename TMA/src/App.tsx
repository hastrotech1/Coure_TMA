import React from "react";
import TaskList from "./components/TaskList";
import { Task } from "./types/Tasks";
import TaskForm from "./components/TaskForm";
import "./index.css";
import { useState } from "react";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <TaskForm onAddTask={(task) => saveTasks([...tasks, task])} />
        <TaskList tasks={tasks} onUpdateTask={saveTasks} />
      </div>
    </div>
  );
};

export default App;
