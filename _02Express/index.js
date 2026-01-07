import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";
const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let tasks = [];
let taskId = 1;
// adding tasks:
app.post("/addTask", (req, res) => {
    if (!req.body || !req.body.name || !req.body.taskDuration) {
        return res.status(400).json({ error: 'Missing required fields: name and taskDuration' });
    }
    
    const {name, taskDuration} = req.body;
    const taskData = {
        id: taskId++,
        name,
        taskDuration
    };
    tasks.push(taskData);
    res.status(200).send(tasks);
});
// fetching all tasks:
app.get("/fetchTasks", (req, res) => {
    res.status(200).send(tasks);
})

// fetching any specific task:
app.get("/fetchTasks/:id", (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if(!task) return res.status(404).send("Task not found!!");
    else return res.status(202).send(task);
})

// updating any task:
app.put("/fetchTasks/:id", (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if(!task) return res.status(404).send("Task not found!!");
    let {name, taskDuration} = req.body;
    task.name = name;
    task.taskDuration = taskDuration;
    return res.status(200).send("Task has been updated",task);
})

// deleting a task:
app.delete("/fetchTasks/:id", (req, res) => {
    const index = tasks.findIndex(task => task.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).send("Task not Found!!");
    tasks.splice(index, 1);
    return res.status(200).send("Task deleted!");
})


app.listen(port, () =>{
    console.log(`Server is listening at port:${port}`)
})