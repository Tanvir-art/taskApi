import { Router } from "express"; 
import { userRoutes } from "../modules/user/route.js"; 
import { taskRoutes } from "../modules/task/taskRoute.js";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes
    },
    {
        path: '/task',
        route: taskRoutes
    }
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))
export default router