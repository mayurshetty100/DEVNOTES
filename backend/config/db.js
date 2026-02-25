// import 
const mongoose = require('mongoose');

// function to connect to mongodb
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ");
    } catch(error){
        console.error("MongoDB connection failed",error.message);
        process.exit(1);
    }
};

module.exports=connectDB;

