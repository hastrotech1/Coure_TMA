// import React, { useState } from "react";
// import { Task } from "../types/Tasks";

// type TaskListProps = {
//   tasks: Task[];
//   onDeleteTask: (taskId: string) => void;
//   onAddTask: (newTask: Task) => void;
//   onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
// };

// const TaskList: React.FC<TaskListProps> = ({
//   tasks,
//   onDeleteTask,
//   onAddTask,
//   onUpdateTask,
// }) => {
//   const [filters, setFilters] = useState({ priority: "", status: "" });
//   const [editedTask, setEditedTask] = useState<Task | null>(null);
//   const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
//   const [newTask, setNewTask] = useState<Partial<Task>>({
//     title: "",
//     description: "",
//     dueDate: "",
//     priority: undefined,
//     status: undefined,
//   });

//   const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     setNewTask((prevTask) => ({
//       ...prevTask,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newTask.title && newTask.description) {
//       onAddTask({
//         ...newTask,
//         id: Date.now().toString(), // Generate a unique ID
//       } as Task);
//       setNewTask({
//         title: "",
//         description: "",
//         dueDate: "",
//         priority: undefined,
//         status: undefined,
//       });
//     }
//   };

//   const filteredTasks = tasks.filter(
//     (task) =>
//       (!filters.priority || task.priority === filters.priority) &&
//       (!filters.status || task.status === filters.status)
//   );

//   const handleEdit = (taskId: string) => {
//     const taskToEdit = tasks.find((task) => task.id === taskId);
//     if (taskToEdit) {
//       setEditingTaskId(taskId);
//       setEditedTask(taskToEdit);
//     }
//   };

//   const handleEditSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editedTask) {
//       onUpdateTask(editedTask.id, editedTask);
//       setEditingTaskId(null);
//       setEditedTask(null);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingTaskId(null);
//     setEditedTask(null);
//   };

//   const handleEditChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     if (editedTask) {
//       setEditedTask({
//         ...editedTask,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const confirmDelete = (taskId: string) => {
//     setSelectedTaskId(taskId);
//   };

//   const handleDelete = () => {
//     if (selectedTaskId) {
//       onDeleteTask(selectedTaskId);
//       setSelectedTaskId(null);
//     }
//   };

//   const cancelDelete = () => {
//     setSelectedTaskId(null);
//   };

//   return (
//     <div className="task-list max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Task List</h2>
//       {tasks.map((task) => (
//         <div key={task.id}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <button onClick={() => onDeleteTask(task.id)}>Delete Task</button>
//           <button
//             onClick={() =>
//               onUpdateTask(task.id, {
//                 status: task.status === "Pending" ? "Completed" : "Pending",
//               })
//             }
//           >
//             Toggle Status
//           </button>
//         </div>
//       ))}

//       {/* Add Task Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded-lg shadow-md mb-6"
//       >
//         <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="title" className="block font-medium">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               title="Enter task title"
//               placeholder="Enter task title"
//               value={newTask.title || ""}
//               onChange={(e) =>
//                 setNewTask((prev) => ({ ...prev, title: e.target.value }))
//               }
//               // id="title"
//               // name="title"
//               // value={newTask.title}
//               // onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="dueDate" className="block font-medium">
//               Due Date
//             </label>
//             <input
//               type="date"
//               title="Select due date"
//               placeholder="Select due date"
//               value={newTask.dueDate || ""}
//               onChange={(e) =>
//                 setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
//               }
//               // id="dueDate"
//               // name="dueDate"
//               // value={newTask.dueDate}
//               // onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="priority" className="block font-medium">
//               Priority
//             </label>
//             <select
//               value={newTask.priority || ""}
//               onChange={(e) =>
//                 setNewTask((prev) => ({
//                   ...prev,
//                   priority: e.target.value as "High" | "Medium" | "Low",
//                 }))
//               }
//               aria-label="Select task priority"
//               // id="priority"
//               // name="priority"
//               // value={newTask.priority}
//               // onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Priority</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="status" className="block font-medium">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={newTask.status}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option>Pending</option>
//               <option>In Progress</option>
//               <option>Completed</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-4">
//           <label htmlFor="description" className="block font-medium">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={newTask.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             placeholder="Task Description"
//             rows={3}
//             required
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Add Task
//         </button>
//       </form>

//       {/* Task Filters */}
//       <div className="flex justify-between items-center mb-4">
//         <select
//           aria-label="Filter tasks by priority"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, priority: e.target.value }))
//           }
//           className="p-2 border rounded-lg"
//         >
//           <option value="">Filter by Priority</option>
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//         </select>
//         <select
//           aria-label="Filter tasks by status"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, status: e.target.value }))
//           }
//           className="p-2 border rounded-lg"
//         >
//           <option value="">Filter by Status</option>
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//         </select>
//       </div>

//       {/* Task List */}
//       {filteredTasks.length > 0 ? (
//         <div className="grid gap-4">
//           {filteredTasks.map((task) => (
//             <div key={task.id} className="p-4 bg-white rounded-lg shadow-md">
//               {editingTaskId === task.id ? (
//                 <form onSubmit={handleEditSubmit} className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="edit-title"
//                       className="block font-medium mb-1"
//                     >
//                       Title
//                     </label>
//                     <input
//                       id="edit-title"
//                       type="text"
//                       name="title"
//                       value={editedTask?.title || ""}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded-lg"
//                       placeholder="Enter task title"
//                       title="Edit task title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="edit-description"
//                       className="block font-medium mb-1"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       id="edit-description"
//                       name="description"
//                       value={editedTask?.description || ""}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded-lg"
//                       placeholder="Enter task description"
//                       title="Edit task description"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="edit-dueDate"
//                       className="block font-medium mb-1"
//                     >
//                       Due Date
//                     </label>
//                     <input
//                       id="edit-dueDate"
//                       type="date"
//                       name="dueDate"
//                       value={editedTask?.dueDate || ""}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded-lg"
//                       title="Edit task due date"
//                       placeholder="Select due date"
//                       required
//                     />
//                   </div>
//                   <select
//                     name="priority"
//                     value={editedTask?.priority || "Low"}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded-lg"
//                     aria-label="Edit task priority"
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                   <select
//                     name="status"
//                     value={editedTask?.status || "Pending"}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded-lg"
//                     aria-label="Edit task status"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                   <div className="flex gap-2">
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={cancelEdit}
//                       className="bg-gray-300 px-4 py-2 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <>
//                   <h3 className="text-lg font-bold">{task.title}</h3>
//                   <p className="text-gray-600">{task.description}</p>
//                   <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
//                   <p>Priority: {task.priority}</p>
//                   <p>Status: {task.status}</p>
//                   <div className="flex gap-4 mt-4">
//                     <button
//                       onClick={() => handleEdit(task.id)}
//                       className="text-blue-500 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => confirmDelete(task.id)}
//                       className="text-red-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       )}

//       {/* Delete Confirmation */}
//       {selectedTaskId && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-semibold">Confirm Deletion</h3>
//             <p>Are you sure you want to delete this task?</p>
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={cancelDelete}
//                 className="py-2 px-4 bg-gray-300 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="py-2 px-4 bg-red-500 text-white rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;

// import React, { useState } from "react";
// import { Task } from "../types/Tasks";

// interface TaskListProps {
//   tasks: Task[];
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
//   const [filters, setFilters] = useState({ priority: "", status: "" });

//   const filteredTasks = tasks.filter(
//     (task) =>
//       (!filters.priority || task.priority === filters.priority) &&
//       (!filters.status || task.status === filters.status)
//   );

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Task List</h2>
//       <div className="flex gap-4 mb-4">
//         <select
//           aria-label="Filter tasks by priority"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, priority: e.target.value }))
//           }
//           className="p-2 border rounded-lg"
//         >
//           <option value="">All Priorities</option>
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//         </select>
//         <select
//           aria-label="Filter tasks by status"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, status: e.target.value }))
//           }
//           className="p-2 border rounded-lg"
//         >
//           <option value="">All Statuses</option>
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//         </select>
//       </div>
//       <ul className="space-y-4">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className="bg-white p-4 shadow rounded-lg">
//             <h3 className="text-lg font-bold">{task.title}</h3>
//             <p>{task.description}</p>
//             <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
//             <p>Priority: {task.priority}</p>
//             <p>Status: {task.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState } from "react";
import { Task } from "../types/Tasks";

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
