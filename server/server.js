import app from "./app.js";
import connectDb from "./configure/DBconnection.js";
import cloudinary from "cloudinary"
const PORT=process.env.PORT||5500;

cloudinary.config({
    cloud_name:process.env.CLODINARY_NAME,
    api_key:process.env.CLODINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})


app.listen(PORT,async()=>{
    await connectDb();
    console.log(`Your app is now listening on http://localhost:${PORT}  `)
})

