const express=require('express');

const app=express();

//import cors to enable cross-origin resource sharing
const cors=require('cors');

//require helmet to set security headers
const helmet=require('helmet');

//require the dotenv to access the values from the .env file
require('dotenv').config();
const PORT=process.env.PORT || 3000;
// middleware to enable json parsing 

// import DB connection
const connectDB = require("./config/db");
//connect db 
connectDB();
app.use(express.json());
app.use(cors()); // here order matters because express executes the middlewares from top to bottom so order matters but for cors it is flexible
// the above is industry standard with body parsing first followed by cors but it can be in any order as long as they are before the routes that need them. for example if we have a route that needs to parse json and we put the cors middleware after that route then it will not work because the request will not be able to reach the cors middleware to enable cross-origin resource sharing. so it is important to place the middlewares in the correct order to ensure that they work as expected.
app.use(helmet());// here order matters because helmet sets security headers and it should be placed before the routes to ensure that the headers are set for all the routes. if we place it after the routes then the headers will not be set for those routes and it will not provide the intended security benefits. so it is important to place helmet before the routes to ensure that it works as expected.

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
