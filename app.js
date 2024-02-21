import express from "express";
import cors from "cors";
import { config } from "dotenv";
import routerAuth from "./routes/authRouter.js";
import routerUser from "./routes/userRouter.js";
import cookieParser from 'cookie-parser';


const app= express();
config();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5174' }));
app.use(cookieParser());

const port=process.env.PORT_SERVER;

app.listen(port,()=>{
    console.log("listening on port "+port);
});


app.use("/api",routerAuth)
app.use("/api",routerUser)