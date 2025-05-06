import { useState } from "react";
import {
  categoryAndColors,
  priorityOptions,
  statusOptions,
  categoryAndColors2,
  priorityOptions2,
} from "../App";

// ! --------------- Main Table ---------------
export function TaskTable({
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
