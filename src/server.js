import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import usersRoutes from './routes/users.routes.js'
import urlsRoutes from './routes/urls.routes.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoutes);
app.use(urlsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running in port: ${port}`));