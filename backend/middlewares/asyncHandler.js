/* wrapper for async errors
eliminates the need for try-catch blocks in async functions (controllers)
*/
const asyncHandler=(fn)=> (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
};

module.exports=asyncHandler;