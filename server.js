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

//import the test routes
const testRoutes=require('./routes/testRoutes');

// use all the test routes with the prefix /api
app.use('/api',testRoutes);

app.listen(PORT,()=>{
    console.log('server runnning on port 3000');
});
