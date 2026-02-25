const express=require('express');

const app=express();

//import cors to enable cross-origin resource sharing
const cors=require('cors');

//require helmet to set security headers
const helmet=require('helmet');

// require rate limiter to avoid spam login, brute force attacks and DDoS attacks (overload of server)
const rateLimit=require('express-rate-limit');//goal is to limit how many requests a single IP can make to the server in a given time frame. this helps to prevent abuse and protect the server from being overwhelmed by too many requests. for example, we can set a rate limit of 100 requests per hour for each IP address. if an IP exceeds this limit, it will receive a 429 Too Many Requests response until the time frame resets. this is especially useful for login routes to prevent brute force attacks where an attacker tries to guess passwords by making multiple login attempts. by implementing rate limiting, we can mitigate the risk of such attacks and improve the security of our application.

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
//helmet is a collection of 14 smaller middleware functions that set security headers to protect the app from common vulnerabilities. it includes middleware for setting content security policy, cross-origin resource policy, cross-origin embedder policy, cross-origin opener policy, cross-origin resource sharing, dns prefetch control, expect-ct, frameguard, hide powered by, hsts, ie no open, no sniffer, referrer policy and x-powered-by. by using helmet we can easily set these security headers without having to write custom code for each header. it is a best practice to use helmet in express applications to enhance the security of the app.

//add rate limiter configuration
const limiter=rateLimit({
    windowMs:15*60*1000, // 15 minutes in terms of milliseconds
    max:100, // limit each IP to 100 requests per windowMs
    message:"Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);// here order matters because we want to apply the rate limiter to all the routes to prevent abuse and protect the server from being overwhelmed by too many requests. if we place it after the routes then it will not work because the requests will not be able to reach the rate limiter middleware to enforce the limits. so it is important to place the rate limiter before the routes to ensure that it works as expected.

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
    if(process.env.NODE_ENV==="development"){
    console.log(`server running on port ${PORT}`);
    }
});
