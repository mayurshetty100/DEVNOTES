// require express
const express=require('express');

//require router
const router=express.Router();

//import controller
const {registerUser,loginUser}=require('../controllers/authcontroller');

// POST /api/auth/register
router.post('/register',registerUser);

// POST /api/auth/login
router.post('/login',loginUser);
//export the router
module.exports=router;