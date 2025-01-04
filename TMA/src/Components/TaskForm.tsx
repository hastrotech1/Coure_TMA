import React, { useState } from "react";
import { Task } from "../Types/Tasks";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ ...formState, id: Date.now().toString() });
    setFormState({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "Pending",
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <input
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Title"
        className="block w-full p-2 border mb-4 rounded-lg"
      />
      <textarea
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full p-2 border mb-4 rounded-lg"
      />
      <input
        name="dueDate"
        value={formState.dueDate}
        onChange={handleChange}
        type="date"
        className="block w-full p-2 border mb-4 rounded-lg"
      />
      <select
        name="priority"
        value={formState.priority}
        onChange={handleChange}
        className="block w-full p-2 border mb-4 rounded-lg"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        name="status"
        value={formState.status}
        onChange={handleChange}
        className="block w-full p-2 border mb-4 rounded-lg"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
