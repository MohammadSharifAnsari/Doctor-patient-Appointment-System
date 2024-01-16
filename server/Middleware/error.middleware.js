import { json } from "express";

function errorMiddleware(err,req,res,next){

    const statusCode=err.errorStatus||500;
const message=err.errorMessage||"Something went wrong";

return res.staus(statusCode).json({
    success:false,
    message:message,
    Stack:err.stack
})
}
export default errorMiddleware;
