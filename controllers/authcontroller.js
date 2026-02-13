const User = require('../models/User');

//import bcrypt for password hashing
const bcrypt=require('bcryptjs');

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
        //hash the password before saving to the database
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(passoword,salt);
        //create new user
        const user=await User.create({
            name,email,password:hashedPassword
        });
        
        res.status(201).json({message:"User registered successfully",userId:user._id});

    } catch(err){
        res.status(500).json({message:"Registration failed",error:err.message});
    }
};

module.exports={registerUser};