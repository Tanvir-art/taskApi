import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    assignedUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"   
    },
    dueDate: { type: Date }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
