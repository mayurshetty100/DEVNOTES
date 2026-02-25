const mongoose=require('mongoose');

//create the note schema
const noteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to the User model
        required:true
    },
    //note title
    title:{
        type:String,
        required:true
    },
    // note content
    content:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

//create the model
const Note=mongoose.model('Note',noteSchema);

//export the model
module.exports=Note;