📝 React Task Manager App — Documentation


🧠 Overview

The React Task Manager is a lightweight full-stack to-do application that allows users to add, view, and complete tasks. It features a dynamic user interface built with React and a Node.js + Express backend connected to MongoDB for persistent storage.

⚙️ Features

- Add new tasks via an input form
- Store tasks in MongoDB using a REST API
- Mark individual tasks as completed
- Live UI updates when tasks are added or modified
- Error handling for empty inputs and failed requests

🏗️ Technology Stack

Frontend: React (Vite), JavaScript
Backend: Node.js, Express
Database: MongoDB (via Mongoose)
Data Format: JSON
HTTP Library: fetch

🧩 Component Breakdown

1. TaskManager.jsx

Handles all UI interactions:
- Stores task input and task list with useState
- Fetches tasks from the backend using useEffect
- Submits new tasks with addTask()
- Toggles completion via toggleTask()

2. App.jsx

Loads the TaskManager component:
import TaskManager from "./TaskManager";

function App() {
  return <TaskManager />;
}

export default App;



🌐 API Endpoints

| Method | Endpoint | Description | 
| GET | /tasks | Retrieve all tasks | 
| POST | /tasks | Create a new task | 
| PATCH | /tasks/:id | Toggle task completion | 



🔒 MongoDB Task Schema

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});



🧠 Logic Breakdown

addTask()
- Validate task input
- Send POST request to backend
- Append new task to local state
- Clear input and show alert
toggleTask(id)
- Send PATCH request (optional)
- Flip completed value for matching task
- Update local tasks state

🧪 Sample Code: Task Creation

const addTask = async () => {
  if (taskInput.trim() === "") return alert("Task cannot be empty");

  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskInput, completed: false }),
  });

  const newTask = await response.json();
  setTasks((prev) => [...prev, newTask]);
  setTaskInput("");
};



🚀 Future Enhancements

- Task deletion and editing
- Filter tasks by status
- User authentication
- UI with toast notifications instead of alerts
- Deployment to Vercel + MongoDB Atlas
