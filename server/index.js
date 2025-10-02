import express from "express";
import dotenv from 'dotenv';
import connectDb from "./database/dbConnect.js";
import UserRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config({})

connectDb();

const app = express();
const PORT = process.env.PORT||3000;


//default middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:8080",
    credentials:true,
}))


app.use("/api/v1/user",UserRouter)

app.get("/home",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'hi from backend'
    })
})
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})