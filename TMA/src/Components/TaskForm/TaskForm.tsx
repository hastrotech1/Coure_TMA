import React, { useState } from "react";
import { Task } from "../../types/Tasks";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
  onEditTask: (updatedTask: Task) => void;
  editingTask: Task | null;
};

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [formState, setFormState] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.title || !formState.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

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

      <label htmlFor="title" className="block text-sm font-medium mb-2">
        Title
      </label>
      <input
        id="title"
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Title"
        className="block w-full p-2 border mb-4 rounded-lg"
      />

      <label htmlFor="description" className="block text-sm font-medium mb-2">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full p-2 border mb-4 rounded-lg"
      />

      <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
        Due Date
      </label>
      <input
        id="dueDate"
        name="dueDate"
        value={formState.dueDate}
        onChange={handleChange}
        type="date"
        className="block w-full p-2 border mb-4 rounded-lg"
      />

      <label htmlFor="priority" className="block text-sm font-medium mb-2">
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        value={formState.priority}
        onChange={handleChange}
        className="block w-full p-2 border mb-4 rounded-lg"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="status" className="block text-sm font-medium mb-2">
        Status
      </label>
      <select
        id="status"
        name="status"
        value={formState.status}
        onChange={handleChange}
        className="block w-full p-2 border mb-4 rounded-lg"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
        disabled={!formState.title || !formState.dueDate}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
