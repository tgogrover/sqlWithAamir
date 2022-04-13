//require pakages
const express=require('express');
const app=express();
const api_Signup_Route=require('./routes/signup');
const api_Login_Route=require('./routes/login');






require('dotenv').config();





//middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 

 app.use(api_Signup_Route);
 app.use(api_Login_Route);








app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on server ${process.env.PORT}`)
})