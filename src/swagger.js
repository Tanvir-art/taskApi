import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "User and Task Management API",
        },
        servers: [{ url: "https://taskapi-h7dd.onrender.com" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                SignUp: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "Tanvir" },
                        email: {
                            type: "string",
                            format: "email",
                            example: "tanvir@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "123456",
                        },
                        role: { type: "string", example: "user" },
                    },
                },
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "tanvir@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "123456",
                        },
                    },
                },
                Task: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        title: { type: "string", example: "Complete project" },
                        description: { type: "string", example: "Finish backend & frontend" },
                        status: { type: "string", enum: ["Pending", "In Progress", "Completed"], example: "Pending" },
                        assignedUser: { type: "string", example: "64f1b2e4c1234567890abcd1" },
                        dueDate: { type: "string", format: "date", example: "2025-10-05" },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path.resolve("src/app/modules/**/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
