// Global error handling middleware
const errorHandler = (err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:err.message || "server error"
    });
};

//export this error handler 
module.exports=errorHandler;
