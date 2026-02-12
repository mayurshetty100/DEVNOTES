const express=require('express');

const app=express();

//require the dotenv to access the values from the .env file
require('dotenv').config();
const PORT=process.env.PORT || 3000;
// middleware to enable json parsing 
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("devnotes api running...");
});

app.post('/test',(req,res)=>{
   res.json({recievedData:req.body});
});

app.listen(PORT,()=>{
    console.log('server runnning on port 3000');
});
