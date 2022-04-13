var mysql=require('mysql')
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
});

module.exports=connection;