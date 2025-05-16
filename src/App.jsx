import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { text } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks((prevTask) => [...prevTask, { text: task, completed: false }]);
      setTask("");
    }
  };

  // استرجاع البيانات عند بداية التشغيل
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // حفظ البيانات كل ما تتغيّر tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  return (
    <div className="App">
      <div className="div">
        <input
          placeholder="Add a new task"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <div
              style={{
                backgroundColor: t.completed ? "#009688" : "transparent",
                border: t.completed ? "none" : "2px solid #cccc",
              }}
              className="checkIcon"
              onClick={() => toggleComplete(i)}
            >
              {t.completed ? <i class="fa-solid fa-check"></i> : null}
            </div>

            <span className="text">{t.text}</span>

            <div className="deleteBtn" onClick={() => deleteTask(i)}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// create main div a the rest of element
// add task
// delete task
// togglo task
