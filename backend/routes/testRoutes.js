// import express
const express=require('express');

// coreate router object 
const router = express.Router();

/* define the test route */
router.post('/test',(req,res)=>{
    res.json({recievedData:req.body});
});

module.exports=router;