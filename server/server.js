import app from "./app.js";
import connectDb from "./configure/DBconnection.js";
const PORT=process.env.PORT||5500;


app.listen(PORT,async()=>{
    await connectDb();
    console.log(`Your app is now listening on http://localhost:${PORT}  `)
})

