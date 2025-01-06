import React from "react";
import TaskList from "./components/TaskList";
import { Task } from "./components/Tasks";
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <TaskForm
          onAddTask={(task) => saveTasks([...tasks, task])}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        />
        <TaskList
          tasks={tasks}
          onAddTask={(task) => saveTasks([...tasks, task])}
          onUpdateTask={(taskId: string, updatedTask: Partial<Task>) =>
            handleUpdateTask(taskId, updatedTask)
          }
          onDeleteTask={(taskId) =>
            saveTasks(tasks.filter((task) => task.id !== taskId))
          }
        />
      </div>
    </div>
  );
};

export default App;
