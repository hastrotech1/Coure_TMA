import React, { useState } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import { Task } from "./Types/Tasks";

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
