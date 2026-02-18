//import express
const express=require('express');

//create router
const router=express.Router();

//import auth middleware
const protect=require('../middlewares/authMiddleware');

// import createNote controller
const {createNote,getMyNotes}=require('../controllers/notecontroller');

//POST api/notes protected route to create a new note
router.post("/",protect,createNote);
// GET /api/notes protected route to create a new note
router.get("/",protect,(req,res)=>{
    res.json({
        message:"You accessed the protected notes route",
        user:req.user
    });
});

// GET /api/notes/my
router.get("/my",protect,getMyNotes);

//export router
module.exports=router;