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
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
  };

  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        />
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onUpdateTask={(taskId: string, updatedTask: Partial<Task>) =>
            handleUpdateTask(taskId, updatedTask)
          }
          onDeleteTask={(taskId) => handleDeleteTask(taskId)}
        />
      </div>
    </div>
  );
};

export default App;
