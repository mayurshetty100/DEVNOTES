const User = require('../models/User');

//import bcrypt for password hashing
const bcrypt=require('bcryptjs');

//import jsonwebtoken for token generation
const jwt=require('jsonwebtoken');

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
        const hashedPassword=await bcrypt.hash(password,salt);
        //create new user
        const user=await User.create({
            name,email,password:hashedPassword
        });
        
        res.status(201).json({message:"User registered successfully",userId:user._id});

    } catch(err){
        res.status(500).json({message:"Registration failed",error:err.message});
    }
};

// login function
const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;

        //find user email
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email or passowrd"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        // generate JWT token

        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.json({
            message:"Login successful",
            token
        });
    } catch(error){
        res.status(500).json({
            message:"Login failed",
            error:error.message
        });
        
    }
};

module.exports={registerUser,loginUser};