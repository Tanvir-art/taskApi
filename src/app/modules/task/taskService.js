import { Task } from "./taskModel.js";


const createTask = async (data) => {
    return await Task.create(data);
}

const getTasks = async () => {
  return await Task.find().populate("assignedUser", "name email"); 
}

const getTaskById = async (id) => {
    return await Task.findById(id);
}

const updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, { new: true });
}

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
}

export const taskService = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
