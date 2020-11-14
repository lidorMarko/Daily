const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
var mysql = require('mysql');

const app = express();
const port = process.env.PORT ||5000 ;

const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); /*necessary ? */

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var connection = mysql.createPool({
  host: 'remotemysql.com',
  user: process.env.REACT_APP_user,
  password: process.env.REACT_APP_password,
  database: process.env.REACT_APP_database
  
})
router.post('/auth',(request,response) => 
{
	/*bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
	    bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
    			response.send(JSON.stringify(result));
		});
	});*/
	connection.query("SELECT password FROM `users` where email='"+request.body.email+"'", function (error, results, fields) 
	{
		if(results[0])
		{
			    bcrypt.compare(request.body.pass, results[0].password).then(function(result) {
	    				response.send(JSON.stringify(result));
				});
		}
		response.send(false);
	});	
});
router.post('/signUp',(request,response) => 
{
	bcrypt.hash(request.body.pass, saltRounds).then(function(hash) {
		connection.query("insert into users(email,password) values('"+request.body.email+"','"+hash+"')", function (error, results, fields) 
		{
			if (error) 
			{
				//throw error;
				console.log("db error");
				response.send(false);	
			}
			else
			{
				console.log("db updated successfully");
				//building user table contains all of their future info
				//???????????	
			}
		});
	});	
});
router.post('/api/data',(request,response) => 
{
    var outputArray = [];
	connection.query("SELECT * FROM `Period` where id='"+request.body.num+"'", function (error, results, fields) 
	{
			if(error)
				console.log(error);
			for(var i=0;results!=null && i<results.length;i++)
			{
				outputArray.push(results[i]);				
			}
			console.log(outputArray);
			response.send(JSON.stringify(outputArray));
	});	
});
router.post('/update',(request,response) => 
{
	var month=parseFloat(request.body.month,10)+1;

	/*updating the column reperesenting the giving day at the giving row(month)*/
	connection.query("update Period set `"+request.body.day+"`='"+request.body.data+"' where id='"+month+"'", function (error, results, fields) 
	{
		if (error) 
		{
			throw error;
		}
		else
		{
			console.log("db updated successfully"+"update Period set `"+request.body.month+"`='"+request.body.data+"' where id='"+month+"'");
			response.send(true);	
		}
	});	
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});	

// add router in the Express app.
app.use("/", router);

app.listen(port);

console.log(`Password generator listening on ${port}`);
