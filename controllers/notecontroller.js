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

//to read all the notes created by a logged in user (his notes)
const getMyNotes=async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id});
        res.json(notes);
}catch(err){
    res.status(500).json({
        message:"failed to fetch notes",
        error:err.message
    });
}
};

// update note

const updateNote=async(req,res)=>{
    try{
        const {title,content}=req.body;

        //find the note to be updated
        const note=await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({
                message:"Note not found"
            })
        }

        //check ownership
        if(note.user.toString()!==req.user.id){
            return res.status(403).json({
                message:"unauthorized"
            });
        }

        //update fields
        note.title=title || note.title;
        note.content=content || note.content;

        //save the updated note to database
        await note.save();

        //return response to user
        res.json({
            message:"Note updated successfully",
            note
        });
    }catch(err){
        res.status(500).json({
            message:"Failed to update the note",
            error:error.message
        });
    }
};

//export the controller
module.exports={
    createNote,
    getMyNotes
};