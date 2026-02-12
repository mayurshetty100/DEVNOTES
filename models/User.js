const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }
    },
    {
    timestamps:true  //  automatically adds createdAt and updatedAt 
    }
);

// creating the user model
const User=mongoose.model('User',userSchema);

//export the model
module.exports=User;