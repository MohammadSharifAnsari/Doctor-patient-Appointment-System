import mongoose from "mongoose";
import appError from "../Utils/Error.utils.js";

async function connectDb(){

    try{

        const connection=await mongoose.connect(process.env.DB_URL);
        console.log(`You are now connected to database exist on `,connection.connection.host)
    }
    catch(err){

        console.log("ERROR in connected to database",err);
    process.exit(1);
        
    }

}

export default connectDb;