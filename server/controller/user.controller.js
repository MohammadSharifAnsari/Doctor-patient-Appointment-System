import asynchandler from "express-async-handler";
import appError from "../Utils/Error.utils.js";
import userModel from "../Model/user.model.js";
import cloudinary from 'cloudinary';
import upload from "../Middleware/multer.middleware.js";
import fs from "fs";
import bcrypt from "bcrypt";

const CookieOptions={
    maxAge: 7 * 24 * 60 * 60 * 100,//7 days ke liye cookie set hogi
    httpOnly: true,
    secure: true
}



export const register = asynchandler(async (req, res, next) => {

    let { name, email, password } = req.body;


    if (!name || !email || !password) {
        next(new appError("please fill all the fields", 400));

    }

    let user=await userModel.findOne({email});
    console.log("user findone>>",user);
if(user){
return next(new appError("email already exists",400));
}
password=await bcrypt.hash(password,10);

     user = await userModel.create({
        name,
        email,
        password,
       avatar:{
        public_id:"123ed",
        secure_url:"https://tse1.mm.bing.net/th?id=OIP.YpATRgHq8-Bg0UlSotvIGQHaHa&pid=Api&P=0&h=220",
       }
    });
    console.log("user create>>",user);

    if (req.file) {

        try {
            // c:\Users\Lenovo\OneDrive\Desktop\FSWD project\ecommerce-website
            console.log("req.file>", req.file);
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'ecommerce-website',
                width: 250,//by default heigt and width is in pexel unit
                height: 250,
                gravity: 'faces',//focus image ke fase pe rakhna hai
                crop: 'fill'
                
            });

            user.avatar.public_id=result.public_id;
            user.avatar.secure_url=result.secure_url;

            console.log("respone after upload>>",result);
        } catch (error) {
            
            return next( new appError(`Error in uploading on clodinary=>\n ${error}`,400));

        }

        user.password=undefined;
        fs.rm(req.file.path,()=>{
            console.log("remove successfully");
        });
       
    }
const token=await user.generateJWDToken();

await user.save();

res.cookie("token",token,CookieOptions);
    

    return res.status(201).json({
        success: true,
        message: "user successfully created",
        user
    })


})

export const login=asynchandler(async(req,res,next)=>{

    const {email,password}=req.body;
    if(!email||!password){
        return next(new appError("All fields are mandatory to fill",400));
    }
    const user= await userModel.findOne({email}).select('+password');
    if(!user){
        return next(new appError("User not register,please register first",400));
    }
    console.log("user in login>>",user);

    const flag= await user.comparePassword(password);
    console.log("flag>>",flag);
    if(!flag){
return next(new appError("Incorrect password",400));
    }

    const token= await user.generateJWDToken();
    res.cookie("token",token,CookieOptions);


    return res.status(200).json({
        success:true,
        message:"You are successfully login",
        user
    })
     

})

export const logout=asynchandler(async function(req,res,next){

    res.cookie("token",null,{
        maxAge:0,
        httpOnly:true,
        secure:true
    });
    const x=res.cookie;

    return res.status(200).json({
        success:true,
        message:"logout successfully",
        x
    })

})
