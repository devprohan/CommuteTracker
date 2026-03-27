import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// 1. Config hamesha top par taaki DB aur JWT ko variables mil sakein
dotenv.config(); 

import connectDB from "./db.js";
import { postLogin, postSignUp } from "./controllers/auth.js";
import { getHealth } from "./controllers/health.js";
import { checkJWT } from "./middlewares/jwt.js";

const app = express();

// 2. Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8020;

// 3. Routes
app.get('/', getHealth);
app.post('/signup', postSignUp); 
app.post('/login', postLogin);


// 4. Server Start & DB Connection
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    connectDB();
});