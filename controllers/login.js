var mysql=require('mysql');
var bcrypt=require('bcryptjs')
require('dotenv').config()
var jwt =require('jsonwebtoken');

var connection=require('../dbConnection')

exports.login=async(req,res)=>{
  try {
    const {password,email}=req.body
    if(email && password){
      const sqlSearch = "select * from `test_organization` where `Email`=? "
      const search_query = mysql.format(sqlSearch,[email])
      await connection.query (search_query, async (err, result) => {
       if (err) throw (err)
       console.log("------> Search Results")
       console.log(result)
       if (result.length != 0) {
             const Password=result[0].Password;
             const mobileNo=result[0].Mobile_No;
           if(bcrypt.compareSync(password, Password)){
             
          const token=   jwt.sign({
               Email:email,
               Mobile_No:mobileNo 
             },process.env.secretKey,{expiresIn:'1d'})
          console.log(token)
             res.status(200).json({
                 Mesage:'Authorized User',
                 Name:result[0].Name,
                 Email:result[0].Email
             })
     
           }
           else{
     
             res.status(400).json({
                 Mesage:'Invalid Password, Try correct password'
             })
           }
     
       }
       else{
         res.status(400).json({
                 Message:'Try signup first'
             })
       }
     })
    }
    else{
      return  res.status(400).json({
        Message:'All fields are required'
    })
    }
  
    
  } catch (error) {
    console.log(error)
  return  res.status(400).json({
      Message:'Something went wrong'
  })
  

    
  }
 

}