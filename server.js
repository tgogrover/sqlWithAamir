//require pakages
const express=require('express');
const app=express();
const api_Signup_Route=require('./routes/signup');
// const api_Url_Route=require('./routes/reco1');
var mysql = require('mysql')





require('dotenv').config();



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



//middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 

 app.use(api_Signup_Route);
// app.use(api_Url_Route);








app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on server ${process.env.PORT}`)
})