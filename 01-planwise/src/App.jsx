import { useState } from "react";

const categoryAndColors = [
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

const priorityOptions = [
  { name: "Priority", bg: "", text: "" },
  { name: "Low", bg: "#ECFDF5", text: "#15803D" },
  { name: "Medium", bg: "#FEF3C7", text: "#B45309" },
  { name: "High", bg: "#FEE2E2", text: "#B91C1C" },
];
const priorityOptions2 = priorityOptions.slice(1);
const categoryAndColors2 = categoryAndColors.slice(1);

const statusOptions = [
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

function Header() {
  return (
    <header className="main-header">
      <img src="img/target.png" alt="logo" className="logo" />
      <h1>Planwise</h1>
    </header>
  );
}

// ! ---------------  Add Form ---------------
function FormToAddTask({ onAddTask }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !category || !priority || !date) return;

    const newTask = {
      id: crypto.randomUUID(),
      name,
      category,
      priority,
      date,
      status: "Pending",
    };
    onAddTask(newTask);

    setName("");
    setCategory("");
    setPriority("");
    setDate("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Create a Task</h2>
      <input
        type="text"
        placeholder="Add Task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categoryAndColors.map((cur, i) => (
          <option value={cur.name === "Category" ? "" : cur.name} key={i}>
            {cur.name}
          </option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {priorityOptions.map((cur, i) => (
          <option value={cur.name === "Priority" ? "" : cur.name} key={i}>
            {cur.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="btn">Create</button>
    </form>
  );
}
// ! --------------- Main Table ---------------
function TaskTable({
  tasks,
  onDeleteTask,
  onChangeTaskStatus,
  onChangeTaskPriority,
  onDeleteAllTask,
  onChangeTaskCategory,
  onTaskChange,
  onTaskDateChange,
}) {
  const [sorted, setSorted] = useState("input");

  const priorityRank = {
    Low: 1,
    Medium: 2,
    High: 3,
  };
  const statusRank = new Map([
    ["Pending", 1],
    ["In Progress", 2],
    ["Completed", 3],
    ["Cancelled", 0],
  ]);

  let sortedTasks;
  if (sorted === "input") {
    sortedTasks = tasks;
  } else if (sorted === "date") {
    sortedTasks = tasks
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sorted === "Priority") {
    sortedTasks = tasks
      .slice()
      .sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
  } else if (sorted === "Status") {
    sortedTasks = tasks
      .slice()
      .sort((a, b) => statusRank.get(b.status) - statusRank.get(a.status));
  }

  return (
    <div className="showed-content">
      <table>
        <thead>
          <tr>
            <th>
              <span>📝</span> Task Name
            </th>
            <th>
              <span>🧭</span> Category
            </th>
            <th>
              <span>⚡</span> Priority
            </th>
            <th>
              <span>📅</span> Date
            </th>
            <th>
              <span>✅ </span>Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((curRow, i) => (
            <TaskRow
              task={curRow}
              key={i}
              onDeleteTask={onDeleteTask}
              onChangeTaskStatus={onChangeTaskStatus}
              onChangeTaskPriority={onChangeTaskPriority}
              onChangeTaskCategory={onChangeTaskCategory}
              onTaskChange={onTaskChange}
              onTaskDateChange={onTaskDateChange}
            />
          ))}
        </tbody>
      </table>
      {tasks.length > 0 && (
        <div className="actions">
          <select value={sorted} onChange={(e) => setSorted(e.target.value)}>
            <option value="input">Sorted By Input</option>
            <option value="date">Sorted By Date</option>
            <option value="Priority">Sorted By Priority</option>
            <option value="Status">Sorted By Status</option>
          </select>

          <button className="btn" onClick={onDeleteAllTask}>
            Clear All Task
          </button>
        </div>
      )}
    </div>
  );
}
// ! ---------------  Table row ---------------

function TaskRow({
  task,
  onDeleteTask,
  onChangeTaskStatus,
  onChangeTaskPriority,
  onChangeTaskCategory,
  onTaskChange,
  onTaskDateChange,
}) {
  const categoryData =
    categoryAndColors.find((cur) => cur.name === task.category) || {};
  const priorityData =
    priorityOptions.find((cur) => cur.name === task.priority) || {};
  const statusData =
    statusOptions.find((cur) => cur.name === task.status) || {};

  const [isEditAble, setIsEditAble] = useState(false);
  const [outlineStyle, setOutlineStyle] = useState("none");
  function handleMouseEnter() {
    setIsEditAble(true);
    setOutlineStyle("auto");
  }
  function handleMouseLeave() {
    setIsEditAble(false);
    setOutlineStyle("none");
  }
  return (
    <tr>
      <td>
        <input
          type="text"
          value={task.name}
          onChange={(e) => onTaskChange(task.id, e.target.value)}
          readOnly={!isEditAble}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ outline: outlineStyle }}
        />
      </td>

      <td>
        <SelectAsRow
          value={task.category}
          id={task.id}
          onChangeTaskInfo={onChangeTaskCategory}
          stylesObj={{
            backgroundColor: categoryData.bg,
            color: categoryData.text,
          }}
          options={categoryAndColors2}
        />
      </td>
      <td>
        <SelectAsRow
          value={task.priority}
          id={task.id}
          onChangeTaskInfo={onChangeTaskPriority}
          stylesObj={{
            backgroundColor: priorityData.bg,
            color: priorityData.text,
          }}
          options={priorityOptions2}
        />
      </td>
      <td>
        <input
          type="date"
          value={task.date}
          onChange={(e) => onTaskDateChange(task.id, e.target.value)}
        />
      </td>
      <td>
        <SelectAsRow
          value={task.status}
          id={task.id}
          onChangeTaskInfo={onChangeTaskStatus}
          stylesObj={{ backgroundColor: statusData.bg, color: statusData.text }}
          options={statusOptions}
        />
        <button className="delete" onClick={() => onDeleteTask(task.id)}>
          ❌
        </button>
      </td>
    </tr>
  );
}

// ! ---------------  Select As Row ---------------

function SelectAsRow({ value, id, onChangeTaskInfo, stylesObj, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChangeTaskInfo(id, e.target.value)}
      className="basic-style"
      style={stylesObj}
    >
      {options.map((cur, i) => (
        <option value={cur.name} key={i}>
          {cur.name}
        </option>
      ))}
    </select>
  );
}
