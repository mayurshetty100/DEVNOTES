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

// import createNote controller
const {createNote}=require('../controllers/notecontroller');

// GET /api/notes protected route to create a new note
router.get("/",protect,(req,res)=>{
    res.json({
        message:"You accessed the protected notes route",
        user:req.user
    });
});

//export router
module.exports=router;