import express from "express";
import dotenv from "dotenv"
import conncetDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, 'public', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

 dotenv.config();

 conncetDB();

const app = express();

const PORT=process.env.PORT || 8000;
app.use(cors())
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes)


app.listen(PORT,()=>{
      console.log("server is running on 8000");
})