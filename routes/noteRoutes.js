//import express
const express=require('express');

//create router
const router=express.Router();

//import auth middleware
const protect=require('../middlewares/authMiddleware');

// GET /api/notes protected route

router.get('/',protect,(req,res)=>{
    res.json({
        message:"You accessed the protected notes route",
        user:req.user
    });
});

//export router
module.exports=router;