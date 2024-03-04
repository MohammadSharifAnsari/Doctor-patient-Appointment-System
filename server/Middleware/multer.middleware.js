import multer from "multer";
import path from "path";
const upload=multer({

    dest:"uploads/",
    limits:{fileSize:50*1024*1024},
    storage: multer.diskStorage({//storage bta rha ki yeh kahan store hone wala hai
      destination: "uploads/",//uploads me store hone wala hai
      filename: (_req, file, cb) => {
        cb(null, file.originalname);//jis filename se uploads kiya hai usi file se upload hoga
      },
    }),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (
          ext !== ".jpg" &&//file filter lga diye hain ki kaun kaun si file hum access lar sakte hain .jpg and webp etc access kar sakte hai
          ext !== ".jpeg" &&
          ext !== ".webp" &&
          ext !== ".png" &&
          ext !== ".mp4"
        ) {
          cb(new Error(`Unsupported file type! ${ext}`), false);
          return;
        }
    
        cb(null, true);
      },

})
console.log("finish")

export default upload;