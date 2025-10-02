import express from "express";
import { userController } from "./userController.js";
import protect from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema } from "./userLoginValidator.js";
import { signupSchema } from "./userSignUpValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management APIs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User signed up successfully
 *               data:
 *                 id: "652f3c1234"
 *                 name: "Tanvir"
 *                 email: "tanvir@example.com"
 *                 role: "user"
 *       400:
 *         description: Validation error
 */
router.post("/signup", validate(signupSchema), userController.signUp);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User logged in successfully
 *               data:
 *                 user:
 *                   id: "652f3c1234"
 *                   name: "Tanvir"
 *                   email: "tanvir@example.com"
 *                   role: "admin"
 *                 accessToken: "jwt-access-token"
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validate(loginSchema), userController.login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Users fetched successfully
 *               data:
 *                 - id: "652f3c1234"
 *                   name: "Tanvir"
 *                   email: "tanvir@example.com"
 *                   role: "user"
 *                 - id: "652f3c5678"
 *                   name: "Shifat"
 *                   email: "shifat@example.com"
 *                   role: "admin"
 *       403:
 *         description: Forbidden
 */
router.get("/users",  userController.getAllusers);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User logged out successfully
 */
router.post("/logout", userController.logout);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Access token refreshed successfully
 *               data:
 *                 accessToken: "new-jwt-access-token"
 *       403:
 *         description: Invalid refresh token
 */
router.post("/refresh", userController.refresh);

export const userRoutes = router;
