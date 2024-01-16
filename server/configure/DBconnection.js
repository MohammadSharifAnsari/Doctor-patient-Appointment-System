import mongoose from "mongoose";
import appError from "../Utils/Error.utils";

async function connectDb(){

    try{

        await mongoose.connect(`${process.env.DB_URL}`);
        console.log(`You are now connected to database exist on  ${process.env.DB_URL} `)
    }
    catch(err){

        console.log("ERROR in connected to database",err);
    process.exit(1);
        
    }

}

export default connectDb;