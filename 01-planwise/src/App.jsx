import { useState } from "react";
import { Header } from "./components/Header";
import { FormToAddTask } from "./components/FormToAddTask";
import { TaskTable } from "./components/TaskTable";

export const categoryAndColors = [
  { name: "Category", bg: "", text: "" },
  { name: "Work", bg: "#E0F2FE", text: "#1E40AF" },
  { name: "Study", bg: "#DDD6FE", text: "#6D28D9" },
  { name: "Exercise", bg: "#BBF7D0", text: "#065F46" },
  { name: "Personal", bg: "#FBCFE8", text: "#BE185D" },
  { name: "Shopping", bg: "#FDE68A", text: "#92400E" },
  { name: "Health", bg: "#FCA5A5", text: "#991B1B" },
  { name: "Finance", bg: "#D1FAE5", text: "#047857" },
  { name: "Travel", bg: "#A5F3FC", text: "#164E63" },
  { name: "Other", bg: "#E5E7EB", text: "#374151" },
];

export const priorityOptions = [
  { name: "Priority", bg: "", text: "" },
  { name: "Low", bg: "#ECFDF5", text: "#15803D" },
  { name: "Medium", bg: "#FEF3C7", text: "#B45309" },
  { name: "High", bg: "#FEE2E2", text: "#B91C1C" },
];
export const priorityOptions2 = priorityOptions.slice(1);
export const categoryAndColors2 = categoryAndColors.slice(1);

export const statusOptions = [
  { name: "Pending", bg: "#ECEFF1", text: "#455A64" },

  { name: "In Progress", bg: "#E1F5FE", text: "#0277BD" },

  { name: "Completed", bg: "#E8F5E9", text: "#2E7D32" },

  { name: "Cancelled", bg: "#FBE9E7", text: "#BF360C" },
];
// ! ---------------  App ---------------
export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(newTask) {
    setTasks((curTask) => [...curTask, newTask]);
  }

  function handleDelete(id) {
    setTasks((curTasks) => curTasks.filter((curTask) => curTask.id !== id));
  }

  function handleStatus(id, newStatus) {
    setTasks((curTasks) =>
      curTasks.map((curTask) =>
        curTask.id === id ? { ...curTask, status: newStatus } : curTask
      )
    );
  }

  function handleDeleteAllTask() {
    if (window.confirm("Do you want to delete all the task?")) setTasks([]);
  }
  function handlePriority(id, newPriority) {
    setTasks((curTasks) =>
      curTasks.map((curTask) =>
        curTask.id === id ? { ...curTask, priority: newPriority } : curTask
      )
    );
  }

  function handleCategory(id, newCategory) {
    setTasks((curTasks) =>
      curTasks.map((curTask) =>
        curTask.id === id ? { ...curTask, category: newCategory } : curTask
      )
    );
  }

  function handleTaskName(id, newTask) {
    setTasks((curTasks) =>
      curTasks.map((curTask) =>
        curTask.id === id ? { ...curTask, name: newTask } : curTask
      )
    );
  }

  function handleNewDate(id, newDate) {
    setTasks((curTasks) =>
      curTasks.map((curTask) =>
        curTask.id === id ? { ...curTask, date: newDate } : curTask
      )
    );
  }

  return (
    <div className="container">
      <Header />
      <main>
        <TaskTable
          tasks={tasks}
          onDeleteTask={handleDelete}
          onChangeTaskStatus={handleStatus}
          onChangeTaskPriority={handlePriority}
          onDeleteAllTask={handleDeleteAllTask}
          onChangeTaskCategory={handleCategory}
          onTaskChange={handleTaskName}
          onTaskDateChange={handleNewDate}
        />
        <FormToAddTask onAddTask={handleAddTask} />
      </main>
    </div>
  );
}
