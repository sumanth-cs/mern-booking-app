import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth";
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => console.log("MongoDB connected to db: "))
.catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(7000, ()=>{
    console.log("Server is running on local host : 7000");
});