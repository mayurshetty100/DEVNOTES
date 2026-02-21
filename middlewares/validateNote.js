// validate the note
const validateNote=(req,res,next)=>{
    const {title,content}=req.body;

    if(!title || !content){
        return res.status(400).json({
            message:"data is missing (title or content or both"
        });
    }
    next();
};

module.exports=validateNote;