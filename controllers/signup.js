var mysql=require('mysql');
var bcrypt=require('bcryptjs')
require('dotenv').config()

var connection = mysql.createConnection({
	host:process.env.host,
	user:"root",
	password:process.env.password,
	database : process.env.database
})

// Connecting to database
connection.connect(function(err) {
	if(err){
	console.log("Error in the connection")
	console.log(err)
	}
	else{
	console.log(`Database Connected`)
	connection.query(`SHOW DATABASES`,
	function (err, result) {
		if(err)
		console.log(`Error executing the query - ${err}`)
		else
		console.log("Result: ",result)
	})
	}
})


exports.signup=async(req,res)=>{
    const {name,password,email,orgID,type,mobileNo}=req.body
    const sqlSearch = "select * from `test_organization` where `Email`=? OR `OrgID`=? "
 const search_query = mysql.format(sqlSearch,[email,orgID])
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
		var insertQuery='insert into `test_organization` (`Name`,`OrgID`,`Email`,`Mobile NO.`,`Password`,`Type`) VALUES (?,?,?,?,?,?)'
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