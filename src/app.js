import express from 'express';
import cors from 'cors';
import router from './app/routes/index.js';
import cookieParser from 'cookie-parser';
import { swaggerServe, swaggerSetup } from './swagger.js';
const app = express()
// const port = 3000
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  // origin: 'http://localhost:3000', 
  origin: 'https://task-api-frontend.vercel.app',
  credentials: true  
}));

app.use('/api', router );
app.use("/api-docs", swaggerServe, swaggerSetup); 

export default app;