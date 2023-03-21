import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from './mongdb/connect.js';
import  dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";


const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use('/dalle',dalleRoutes);
app.use('/post',postRoutes); 
dotenv.config()


connectDB(process.env.MONGODB_URL)


app.get("/",(req,res)=>{
   res.send("iam from dalle")
})


app.listen(8080,()=>{
    console.log("sever started on port http://localhost:8080/")
})
