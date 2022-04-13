var mysql=require('mysql');
var bcrypt=require('bcryptjs')
require('dotenv').config()

var connection=require('../dbConnection')

exports.login=async(req,res)=>{
    const {password,email}=req.body
    const sqlSearch = "select * from `test_organization` where `Email`=? "
 const search_query = mysql.format(sqlSearch,[email])
 await connection.query (search_query, async (err, result) => {
	if (err) throw (err)
	console.log("------> Search Results")
	console.log(result)
	if (result.length != 0) {
        const Password=result[0].Password
      if(bcrypt.compareSync(password, Password)){

        res.status(200).json({
            Mesage:'Authorized User'
        })

      }
      else{

        res.status(400).json({
            Mesage:'Invalid Password',
            Name:result[0].Name,
            Email:result[0].Email

        })
      }
//	 connection.release()
    
	// res.sendStatus(409) 
	}
	else{
		res.status(400).json({
            Message:'Try signup first'
        })
	}
})

}