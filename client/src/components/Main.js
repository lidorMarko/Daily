import React, { Component }  from 'react';
import './../css/Main.css';
import Nav from './Nav';
import TableCreator from './TableCreator';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BlockLoading } from 'react-loadingg';

export default class Main extends Component
{
    constructor(props) 
    {
	  super(props);
  	  this.state = { num:'',isLoading: true};	
	}
	componentDidMount()
	{
	  {/*in case it is the current month and we have reached here from the '/' path*/}
	  if(this.props.num)  
		this.setState({num:this.props.num});  	
	  else
		  this.setState({num:this.props.match.params.num});  
	}
    componentWillReceiveProps(newProps)
	{
		{/*in case it is the current month and we have reached here from the '/' path*/}
	  if(newProps.num)  
		this.setState({num:newProps.num});  	
	  else
		  this.setState({num:newProps.match.params.num});  	
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
	  
	  return (
			  <div>
		          <Nav num={num} /> 
				  <TableCreator dayNum={days} num={num} /> 
			</div>
	  );
    } 
}

