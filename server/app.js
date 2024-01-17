

import Express, { json } from "express";
import dotenv from "dotenv/config"
import errorMiddleware from "./Middleware/error.middleware.js";
import cors from "cors"

const app=Express();



app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))
  

app.all('*',(req,res,next)=>{

    res.send('ping/pong');


})

app.use(errorMiddleware);



export default app;