import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
 
name:{
    type:String,
    trim:true,
    required:[true,'please fill you name'],
    lowercase:true
},
email:{
  type:String,
  trim:true,
  unique:[true,"email already exists"],
  required:[true,'please fill the email'],
  match:[/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gim,'please enter a valid email']
  
},
password:{
    type:String,
    trim:true,
    required:[true,'please enter password'],
    match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,'please enter a valid password'],
    select:false
},
role:{
    type:String,
    enum:['ADMIN','USER'],
    default:'USER'
},
address:{
    type:String,
    trim:true,
},
avatar:{
    secure_url:{
        type:String,
      
    },
    public_id:{
        type:String,
       
    }

},

forgetpasswordtoken:{
    type:String
},
forgetpasswordexpiry:{
    type:String
}
    

},{
    timestamps:true
})

userSchema.methods={

generateJWDToken:async function(){

    return await JWT.sign({name:this.name,id:this.id,email:this.email,role:this.role},
        process.env.SECRET,
        {expiresIn:process.env.EXP_IN}
        
        )

},
comparePassword:async function(password){
console.log("password in comparePassword function>>",password);
    return await bcrypt.compare(password,this.password);

}



}


// userSchema.pre('save',async function(next){
//     //ismodified btata hai ki password ko modifird karne ki zarurat hai ya nhi true meana password need to be modified
//     if(this.isModified('password')){

//         this.password=await bcrypt.hash('password',10);
//         console.log("password>>",this.password);
//     }
    
//     next();
    
//     })



export default mongoose.model("user",userSchema);//databsse me users likha hoga