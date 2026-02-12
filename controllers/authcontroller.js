const User = require('../models/user');
const user=require('../models/user');

// registering new user

const registerUser= async (req,res)=>{
    try{
        //destructure the data from the response body
        const {name,email,password}=req.body;

        // check if user already exists 
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User with this email already exists"});
        }

        //create new user
        const user=await User.create({
            name,email,password
        });
        
        res.status(201).json({message:"User registered successfully",userId:user._id});

    } catch(err){
        res.status(500).json({message:"Registration failed",error:err.message});
    }
};

module.exports={registerUser};