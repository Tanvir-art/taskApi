import express from 'express';
import protect from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validate.js';
import {createTaskSchema, updateTaskSchema} from './taskValidation.js';
import { taskController } from './taskController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create', validate(createTaskSchema), protect('admin','user'), taskController.createTask);

/**
 * @swagger
 * /api/task/getAllTask:
 *   get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/getAllTask',  taskController.getTasks);

/**
 * @swagger
 * /api/task/getById/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get('/getById/:id', protect('admin','user'), taskController.getTaskById);

/**
 * @swagger
 * /api/task/updateById/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put('/updateById/:id', protect('admin','user'), validate(updateTaskSchema), taskController.updateTask);

/**
 * @swagger
 * /api/task/deleteById/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/deleteById/:id', protect('admin','user'), taskController.deleteTask);

export const taskRoutes = router;