// require express
const express=require('express');

//require router
const router=express.Router();

//import controller
const {registerUser}=require('../controllers/authcontroller');

// POST /api/auth/register
router.post('/register',registerUser);

//export the router
module.exports=router;