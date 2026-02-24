/* wrapper for async errors
eliminates the need for try-catch blocks in async functions (controllers)
*/
const asyncHandler=(fn)=> (req,res,next)=>{
    Promise.resolve(fn(req,res,nextZ)).catch(next);
};

module.exports=asyncHandler;