import JWT from "jsonwebtoken";
import appError from "../Utils/Error.utils.js";

export const isLoggedIn=async(req,res,next)=>{

const token=req.cookie.token;//here cookieparser use kara hai app.js me isiliye cookie humara parse ho gya hai

if(!token){
return next(new appError("Unauthenticated please login",401));
}

    const userDeatils=await JWT.verify(token,process.env.SECRET);
    req.body.user=userDeatils;

next();

}

