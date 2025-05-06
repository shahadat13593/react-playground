import { useState } from "react";
import { categoryAndColors, priorityOptions } from "../App";

// ! ---------------  Add Form ---------------
export function FormToAddTask({ onAddTask }) {
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
