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
		if(results&&results[0])
		{
			    bcrypt.compare(request.body.pass, results[0].password).then(function(result) {
	    				response.send(JSON.stringify(result));
				});
		}
	});	
});
router.post('/signUp',(request,response) => 
{
	bcrypt.hash(request.body.pass, saltRounds).then(function(hash) {
		connection.query("insert into users(email,password) values('"+request.body.email+"','"+hash+"')", function (error, results, fields) 
		{
			if (error) 
			{
				console.log("db error");
				response.send(false);	
			}
			else
			{	
				connection.query("INSERT INTO `data` (`id`, `january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `dezember`) VALUES('"+request.body.email+"','111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111', '111111111111111111111111111111111')", function (error, results, fields) 
				{
					if (error) 

						console.log("db error");
					else
					{
						console.log("added successfully");					
						response.send(true);
					}
				});		
			}
		});
	});	
});
function convertToStringMonth(num)
{
	  var months = new Array();
	  months[0] = "january";
	  months[1] = "february";
	  months[2] = "march";
	  months[3] = "april";
	  months[4] = "may";
	  months[5] = "june";
	  months[6] = "july";
	  months[7] = "august";
	  months[8] = "september";
	  months[9] = "october";
	  months[10] = "november";
	  months[11] = "dezember";
	  return months[num-1];
}
router.post('/api/data',(request,response) => 
{
    var outputArray = [];
	connection.query("SELECT * FROM `data` where id='"+request.body.user+"'", function (error, results, fields) 
	{
			if(error)
				console.log(error);
			console.log("num="+request.body.num);
			var month=convertToStringMonth(request.body.num);
			if(results[0])
			{
				var string=JSON.stringify(results[0]);
				//cutting the string 
				var flag;
				var index=0;
				for(var i=0;i<string.length;i++)
				{
					if(string[i]==month[0])
					{
						var j=i;
						flag=true;
						for(var k=0;k<month.length;k++)
						{
							if(string[j]!=month[k])
							   flag=false;
							j++;
						}
						if(flag)
						{
							index=i;
							break;
						}
					}					
				}
				string=string.substring( (i+month.length+3),(string.length-2) );
				string=string.substring(0,(string.indexOf(',')-1) );
				outputArray.push(string);
				console.log(outputArray);
				//console.log("i="+i+" "+string.substring( (i+month.length+3),(string.length-2) ));
			}
			response.send(JSON.stringify(outputArray));
	});	
});
function FindNewDayVal(value2,color)
{
	var output;
	
	if(color=='#FFA07A')
		console.log("heart");
	if(color=='rgb(23,162,184)')
		console.log("pill");
	if(color=='#52BE80')
		console.log("period");
		
	    if(value2==0)
		{
			if(color=='#FFA07A')
				output=4;
			if(color=='rgb(23,162,184)')
				output=2;
			if(color=='#52BE80')
				output=1;
		}
		if(value2==1) 
		{
			if(color=='#FFA07A')
				output=5;
			if(color=='rgb(23,162,184)')
				output=3;
			if(color=='#52BE80')
				output=0;
		}		   		  
	    if(value2==2)
		{
			if(color=='#FFA07A')
				output=6;
			if(color=='rgb(23,162,184)')
				output=0;
			if(color=='#52BE80')
				output=3;
		}  
		if(value2==3) 
		{
			if(color=='#FFA07A')
				output=7;
			if(color=='rgb(23,162,184)')
				output=1;
			if(color=='#52BE80')
				output=2;
		}
		if(value2==4) 
		{
			if(color=='#FFA07A')
				output=0;
			if(color=='rgb(23,162,184)')
				output=6;
			if(color=='#52BE80')
				output=5;
		}
		if(value2==5) 
		{
			if(color=='#FFA07A')
				output=1;
			if(color=='rgb(23,162,184)')
				output=7;
			if(color=='#52BE80')
				output=4;
		}
		if(value2==6) 
		{
			if(color=='#FFA07A')
				output=2;
			if(color=='rgb(23,162,184)')
				output=4;
			if(color=='#52BE80')
				output=7;
		}
		if(value2==7) 
		{
			if(color=='#FFA07A')
				output=3;
			if(color=='rgb(23,162,184)')
				output=5;
			if(color=='#52BE80')
				output=6;
		}	
console.log("old="+value2+" new="+output);
		return output;
}
router.post('/update',(request,response) => 
{
console.log("request.body"+request.body.month);
	var month=convertToStringMonth(request.body.month);
	var oldDayVal=JSON.stringify(request.body.data)[request.body.day+1]; /*=number between 0 to 7 */
	var color=request.body.color;
	var newDayVal=FindNewDayVal(oldDayVal,color);
	var newData=JSON.stringify(request.body.data).substring(2,request.body.day+1);
	newData+=newDayVal;
	newData+=JSON.stringify(request.body.data).substring(request.body.day+2);
	newData=newData.substring(0,31);
console.log("prev data="+request.body.data);
console.log("new Data="+newData);

	/*updating the column reperesenting the giving day at the giving row(month)*/
	connection.query("update data set `"+month+"`='"+newData+"' where id='"+request.body.user+"'", function (error, results, fields) 
	{
		if (error) 
		{
			throw error;
		}
		else
		{
			console.log("db updated successfully");
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
