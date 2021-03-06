var mysql=require('mysql');
var bcrypt=require('bcryptjs')
require('dotenv').config()
var connection=require('../dbConnection')




exports.signup=async(req,res)=>{
	try {
		const {name,password,email,orgID,type,mobileNo}=req.body
		if(name && password && email && orgID && type && mobileNo ){
			const sqlSearch = "select * from `test_organization` where `Email`=? OR `OrgID`=? OR `Mobile_No`=? "
			const search_query = mysql.format(sqlSearch,[email,orgID,mobileNo])
			await connection.query (search_query, async (err, result) => {
			   if (err) throw (err)
			   console.log("------> Search Results")
			   console.log(result)
			   if (result.length != 0) {
		   //	 connection.release()
				console.log("------> User already exists")
				res.status(400).json({
					Mesage:'Try Different OrgId or mobile number or Email'
				})
			   // res.sendStatus(409) 
			   }
			   else{
				   var hashPassword=  bcrypt.hashSync(password,10);
				   var insertQuery='insert into `test_organization` (`Name`,`OrgID`,`Email`,`Mobile_No`,`Password`,`Type`) VALUES (?,?,?,?,?,?)'
				   var query=mysql.format(insertQuery,[name,orgID,email,mobileNo,
				   hashPassword,type]);
				   await connection.query (query, (err, result)=> {
					   //connection.release()
					   if (err) throw (err)
					   console.log ("--------> Created new User")
					   console.log(result.insertId)
					   console.log(result)
					   res.status(201).json({
						   Message:'Data Saved Successfully'
		   
					   })
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