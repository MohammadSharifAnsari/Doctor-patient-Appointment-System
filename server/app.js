

import Express, { json } from "express";
import dotenv from "dotenv/config"
import errorMiddleware from "./Middleware/error.middleware.js";
import cors from "cors"
import userRoutes from './Routes/user.routes.js'
import productRoutes from "./Routes/product.routes.js";
import paymentRoutes from "./Routes/payment.routes.js";
import cartRoutes from "./Routes/cart.routes.js";
import orderRoutes from "./Routes/order.routes.js"
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app=Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cors({
  
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  credentials:true
}))


app.use('/api/v1/user',userRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/order',orderRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/payment',paymentRoutes);



app.all('/ping',(req,res,next)=>{
  
  res.send('ping/pong');
  
  
})

app.use(errorMiddleware);


export default app;