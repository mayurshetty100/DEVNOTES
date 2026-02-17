// import the note model
const Note= require('../models/Note');

//create new note
const createNote=async(req,res)=>{
    try{
        const {title,content}=req.body;

        //create note for logged in user
        const note=await Note.create({
            user:req.user.id,
            title,
            content
        });

        res.status(201).json({
            message:"Note created successfully",
            note
        })
    } catch(err){
        res.status(500).json({
            message:"Failed to create note",
            error:err.message
        });
    }
};

//export the controller
module.exports={
    createNote
};