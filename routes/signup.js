const express=require('express');
const router=express.Router();
const {signup}=require('../controllers/signup')

router.post('/api/signup',signup)


module.exports=router