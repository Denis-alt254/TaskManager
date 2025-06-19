import { useEffect } from "react";
import { useState } from "react"

const TaskManager = () =>{
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const addTask = async()=>{
        if(taskInput.trim() === "") return alert("Task can not be empty");
            try{
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title: taskInput, completed: false}),
            });
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setTaskInput("");
        alert(`Task added: ${newTask.title}`);
    }catch(error){
        console.error("Error occured while adding task:", error);
        alert("Something went wrong while adding the task. Try again!")
    }
};

    useEffect(()=>{
        fetch("http://localhost:3000/tasks")
            .then((res)=>res.json())
            .then((data)=>setTasks(data))
    }, []);

    const toggleTask = (id)=>{
        const update = tasks.map((task)=>task.id === id ? {...task, completed: !task.completed}: task);
        setTasks(update);
        };
    

    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     addTask();
    // }

    return(
        <div className="flex flex-col items-center p-6 bg-gray-900">
        <div className="flex flex-col gap-12 items-center p-6 bg-amber-300">
            <h2>Task Manager</h2>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e)=> setTaskInput(e.target.value)} 
                placeholder="Add task..."
                className="bg-white border-amber-950"
            />
            <button 
            onClick={addTask}
            className="bg-blue-600 text-amber-100 hover:bg-violet-500 hover:text-amber-50 rounded-2xl p-3"
            >Add</button>
            <div style={{ marginTop: "1rem" }}>
                {tasks.map((task) =>(
                    <div key={task.id}>
                        <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={()=>toggleTask(task.id)}
                            className="border-amber-600"
                        />
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}


export default TaskManager;