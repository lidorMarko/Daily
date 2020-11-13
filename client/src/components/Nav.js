import React, { Component }  from 'react';
import './../css/Nav.css';
import ReactTypingEffect from 'react-typing-effect';

import {
	  Link
	} from "react-router-dom";


export default class DayCube extends Component
{
  constructor(props) 
    {
	  super(props);
  	  this.state = { num:'',next:'',prev:''};
	}
  componentDidMount() 
	{		
		this.setState({num:this.props.num}); 
		var next=parseInt(this.props.num)+1;
		if(next>11)
			  next=0;
		this.setState({next:next}); 
		var prev=parseInt(this.props.num)-1;
		if(prev<0)
			  prev=11;
		this.setState({prev:prev});  	
	}
  componentWillReceiveProps(newProps)
	{
		this.setState({num:newProps.num}); 
		var next=parseInt(newProps.num)+1;
		if(next>11)
			  next=0;
		this.setState({next:next}); 
		var prev=parseInt(newProps.num)-1;
		if(prev<0)
			  prev=11;
		this.setState({prev:prev});   		
	}
	
  render()
  {
	  {/*calculating the current month in order send it to Nav component*/}
	  var months = new Array();
	  months[0] = "January";
	  months[1] = "February";
	  months[2] = "March";
	  months[3] = "April";
	  months[4] = "May";
	  months[5] = "June";
	  months[6] = "July";
	  months[7] = "August";
	  months[8] = "September";
	  months[9] = "October";
	  months[10] = "November";
	  months[11] = "December";
	  var month=months[this.state.num];
	  					console.log("next="+this.state.next);    
					console.log("prev="+this.state.prev);    

	  return (
			  <div id="top">
				  <nav className="navbar">
					  <Link exact to='/signIn' >
						  <button className="lr" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						    <ReactTypingEffect text={"login / register"}/>
						  </button>
					  </Link>
					  <div id="controler" dir="rtl">
						  <Link exact to={{pathname:'/'+this.state.next  }} >
							  <i className="fas fa-hand-point-right fa-lg"></i> 
						  </Link>
							  
					      <p id="month">{month}</p>
							  
					      <Link exact to={{pathname:'/'+this.state.prev }} >
							  <i className="fas fa-hand-point-left fa-lg"></i> 
						  </Link>
					  </div>					  					  
				  </nav>
			  </div>	 
	  );
  }
}

