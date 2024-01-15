

import Express, { json } from "express";
import dotenv from "dotenv/config"
import errorMiddleware from "./Middleware/error.middleware.js";


const app=Express();

app.use('*',(req,res,next)=>{

    res.write('ping/pong');

})
app.use(errorMiddleware);



export default app;