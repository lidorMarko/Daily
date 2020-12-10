import React, { Component }  from 'react';
import './../css/TableCreator.css';
import DayCube from './DayCube';
import axios from 'axios';
import { BlockLoading } from 'react-loadingg';

export default class TableCreator extends Component
{
  constructor(props) 
  {
	  super(props);
  	  this.state = { data: '' ,isLoading: true, user:'',month:'',dayNum:''};//////////
	  this.DealOutput = this.DealOutput.bind(this);
  }
  DealOutput(response)
  {
	this.setState({ isLoading: false }); /////////
	this.setState({ data: response.data }); 
	console.log("response.data: "+this.state.data);	
	/*var output=[];
	if(response.data!=null)
	{
		var t=JSON.stringify(response.data);
		this.setState({originalData:t});  	
		while(t.indexOf(',')!=-1)
		{
			output.push(t.substring(t.indexOf(':')+1,t.indexOf(',')));
			t=t.slice(t.indexOf(',')+1);
		}  
	}
	else
		console.log("wierd error");	
    this.setState({ data: response.data }); 
	console.log("original:"+this.state.originalData);*/
  } 
  componentDidMount() 
  {
console.log("kkk first created - Table");
	var month=parseFloat(this.props.num,10)+1;
	this.setState({ month: month }); 
	this.setState({ dayNum: this.props.dayNum }); 
	this.setState({ user: this.props.user }); 
	var body={num:this.state.month,user:this.state.user};

	axios.post('/api/data',body).then(response => this.DealOutput(response))
		.catch(err => {
				    if ((err.response) || (err.request))
				console.log("unable to fetch data from server");	
		})		   
  }
  componentWillReceiveProps(newProps) /*לכאן הנתונים החדשים שמגיעים לא מעודכנים*/ 
  {
console.log("kkk received new props - Table -"+newProps.num);
	var month=parseFloat(newProps.num,10)+1;
	this.setState({ month: month });
	this.setState({ dayNum: newProps.dayNum });  
	this.setState({ user: newProps.user }); 
	var body={num:month,user:newProps.user};

	axios.post('/api/data',body).then(response => this.DealOutput(response))
		.catch(err => {
				    if ((err.response) || (err.request))
				console.log("unable to fetch data from server");	
		})		
  }
  render()
  {
	  var i=this.state.dayNum;
	  var array=[];
	  var final=[];
	  var rows;
	  var height;
	  /*incase sunday is not the 1'st  */
	  var d = new Date();
	  d.setDate(1);
	  d.setMonth(this.props.num); 
	  var blankDays=d.getDay();/*friday/saturday-->another row */
	  if(blankDays==5 || blankDays==6)
	  	rows=6;
	  else
		rows=5;
	  height='15vh';

	  for(var k=0;k<rows;k++)
	  {
		  for(var j=0;j<7 && i>0 ;j++)
		  {
				var key=i+''+this.state.num;
			  	array.push(<td key={key} id={key}> <DayCube user={this.state.user} data={this.state.data} text={i} num={this.state.month} height={height} />  </td>);	
		  		i--;
		  }
	  }
	  /*incase sunday is not the 1'st  */
	  for(var t=0;t<blankDays;t++)
			  	array.push(<td key={t} id={t}> <DayCube data={0} text={0} num={this.state.num} height={height} />  </td>);			

	  var trKey=this.state.num;
	  final = [
			    <tr key={trKey+'tr1'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>
			    ,
			    <tr key={trKey+'tr2'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>
			    ,
			    <tr key={trKey+'tr3'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>
			    ,
			    <tr key={trKey+'tr4'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>
			    ,
			    <tr key={trKey+'tr5'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>,
				<tr key={trKey+'tr6'}>
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			      {array.pop()}
			    </tr>
		    ];
	  
	  return (
			  <div>	 
				{this.state.isLoading ? (
					          <div id="loader">
					            <BlockLoading size="large" />
					          </div> 
					          ) : (
								<table className="table">
						          <thead>
								    <tr id="ff">
								      <th className="days" scope="col">S</th>
								      <th className="days" scope="col">M</th>
								      <th className="days" scope="col">T</th>
								      <th className="days" scope="col">W</th>
								      <th className="days" scope="col">T</th>
								      <th className="days" scope="col">F</th>
								      <th className="days" scope="col">S</th>
								    </tr>
								  </thead>
								  
								  <tbody>
								     {final}
								  </tbody> 
							    </table>				
					          )
				 }
			</div>
	  );
  }
}

