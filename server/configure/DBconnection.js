import mongoose from "mongoose";
import appError from "../Utils/Error.utils";

async function connectDb(){

    try{

        await mongoose.connect(`${process.env.DB_URL}`);
    }
    catch(err){

       return new appError(err.message,400);
        
    }

}

export default connectDb;