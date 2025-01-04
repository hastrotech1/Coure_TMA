import React, { useState } from "react";
import { Task } from "../Types/Tasks";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask }) => {
  const [filters, setFilters] = useState({ priority: "", status: "" });

  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.status || task.status === filters.status)
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) =>
            setFilters((f) => ({ ...f, priority: e.target.value }))
          }
          className="p-2 border rounded-lg"
        >
          <option value="\">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
          className="p-2 border rounded-lg"
        >
          <option value="\">All Statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
