//import jwt 
const jwt=require('jsonwebtoken');

//middleware to verify JWT token
const protect=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:'No token provided'});
        }
        const token=authHeader.split(' ')[1];

        //verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        // attach decoded user to request
        req.user=decoded;

        //continue to next middleware or route
        next();

    }catch(error){
        return res.status(401).json({message:'Invalid token'});
    }
};

//export the middleware
module.exports=protect;