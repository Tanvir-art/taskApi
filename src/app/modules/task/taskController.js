import { taskService } from "./taskService.js";


const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        // console.log("update task", req.body, req.params.id);
        const task = await taskService.updateTask(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        // console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const taskController = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
