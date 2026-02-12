const express=require('express');

const app=express();

// middleware to enable json parsing 
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("devnotes api running...");
});

app.post('/test',(req,res)=>{
   res.json({recievedData:req.body});
});

app.listen(3000,()=>{
    console.log('server runnning on port 3000');
});
