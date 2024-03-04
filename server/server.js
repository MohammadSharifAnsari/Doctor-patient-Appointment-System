import app from "./app.js";
import connectDb from "./configure/DBconnection.js";
import {v2 as cloudinary} from 'cloudinary';
const PORT=process.env.PORT||5500;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
 
})

app.listen(PORT,async()=>{
    await connectDb();
    console.log(`Your app is now listening on http://localhost:${PORT} `);
})

