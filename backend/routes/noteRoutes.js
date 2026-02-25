//import express
const express=require('express');

//create router
const router=express.Router();

//import auth middleware
const protect=require('../middlewares/authMiddleware');

//import or require the notecontroller middleware
const validateNote=require("../middlewares/validateNote");


// import createNote controller
const {createNote,getMyNotes,updateNote,deleteNote}=require('../controllers/notecontroller');

//POST api/notes protected route to create a new note
router.post("/",protect,validateNote,createNote);
// GET /api/notes protected route to create a new note
router.get("/",protect,(req,res)=>{
    res.json({
        message:"You accessed the protected notes route",
        user:req.user
    });
});

// GET /api/notes/my
router.get("/my",protect,getMyNotes);

//PUT /api/notes/:id
router.put("/:id",protect,updateNote);

//DELETE /api/notes/:id
router.delete("/:id",protect,deleteNote);

//export router
module.exports=router;