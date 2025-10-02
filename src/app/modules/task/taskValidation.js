import { z } from "zod";

// Create Task Validation
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string"
    }),
    description: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    assignedUser: z.string().optional(), // ObjectId as string
    dueDate: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
      z.date().optional()
    ),
  })
});

// Update Task Validation
export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    assignedUser: z.string().optional(),
    dueDate: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
      z.date().optional()
    ),
  })
});
