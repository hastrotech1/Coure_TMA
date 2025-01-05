import React, { useState } from "react";
import TaskList from "./TaskList";
import { Task } from "../types/Tasks";

const ParentComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <TaskList
      tasks={tasks}
      onDeleteTask={handleDeleteTask}
      onAddTask={handleAddTask}
      onUpdateTask={handleUpdateTask}
    />
  );
};

export default ParentComponent;
