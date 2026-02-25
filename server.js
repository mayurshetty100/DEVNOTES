const express=require('express');

const app=express();

//import cors to enable cross-origin resource sharing
const cors=require('cors');


//require the dotenv to access the values from the .env file
require('dotenv').config();
const PORT=process.env.PORT || 3000;
// middleware to enable json parsing 

// import DB connection
const connectDB = require("./config/db");
//connect db 
connectDB();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("devnotes api running...");
});

//import the test routes
const testRoutes=require('./routes/testRoutes.js');// we can add or remove the .js extension as node will automatically resolve it.
//but for other files like .json we need to add the extension as node will not resolve it automatically.    

// use all the test routes with the prefix /api
app.use('/api',testRoutes);// we can even leave the /api as empty string if we want to use the test route directly without any prefix. but using a prefix is a good practice to organize the routes and avoid conflicts with other routes.

//routes for auth
const authRoutes=require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

//access the notes routes
const noteRoutes=require('./routes/noteRoutes.js');
app.use('/api/notes',noteRoutes);

//access the errorHandling middleware
const errorHandler=require('./middlewares/errorMiddleware');
app.use(errorHandler);

// listen to the backend server
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
