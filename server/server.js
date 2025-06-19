import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const PORT = 3000
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
});

console.log("connected to mongodb");

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);

//Get all tasks from the database
app.get('/tasks', async(req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});

//Post new task to the database
app.post('/tasks', async(req, res) =>{
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

//Update a task from the database
app.patch('/tasks/:id', async(req, res)=>{
    const update = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.status(200).json(update);
})

app.listen(PORT, (req, res) =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})