import React, { Component }  from 'react';
import './../css/Main.css';
import Nav from './Nav';
import TableCreator from './TableCreator';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

var d = new Date();  
var k=d.getMonth();

export default class Main extends Component
{
    constructor(props) 
    {
	  super(props);
  	  this.state = { num:k,isLoading: true,user:null};	
	}
	componentDidMount()
	{
console.log("kkk first created - Main");
	  {/*we have reached here from the '/' path*/}
	  if(this.props.num)  
		this.setState({num:this.props.num});  	
	  else
		{
			if(this.props.match)
			{
				this.setState({num:this.props.match.params.num});  	
		        this.setState({user:this.props.match.params.user});
			}
			else
			{
      			var d = new Date();  
				this.setState({num:d.getMonth()});  					
			}
		}
	}
    componentWillReceiveProps(newProps)
	{
console.log("kkk received new props - Main- "+newProps.num+" or"+this.props.match.params.num);
	  {/*in case it is the current month and we have reached here from the '/' path*/}
	  if(newProps.num)  
		this.setState({num:newProps.num});  	
	  else
		{
			if(newProps.match)
			{
		        this.setState({num:newProps.match.params.num});  	
		        this.setState({user:newProps.match.params.user}); 
			} 
			else
			{
      			var d = new Date();  
				this.setState({num:d.getMonth()});  					
			}					
		}
	}
    render()
    {
	  var num=this.state.num;
	  {/*calculate the days number in the month in order to send it to TableCreator component*/}
	  var days;
	  if(num==0 || num==2 || num==4 || num==6 | num==9 || num==11 || num==7)
		  days=31;
	  if(num==1)
		  days=29;
	  if(num==3 || num==5 || num==8 || num==10)
		  days=30;
console.log(" user="+this.state.user+" num="+num); 

	  return (
			  <div> 
				 <Nav num={num} user={this.state.user} />							
				 <TableCreator dayNum={days} num={num} user={this.state.user}/> 
			</div>
	  );
    } 
}

