import React, { Component }  from 'react';
import './../css/DayCube.css';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

export default class DayCube extends Component
{
  constructor(props) 
  {
    super(props);
    this.changeColor = this.changeColor.bind(this);
    this.getDataByColor = this.getDataByColor.bind(this);
  }
  getDataByColor(e) 
  {
		var output='';
	
		var id=e.target.id;
		var dayId=id.substring(id.indexOf(':')+1);
		var heartEleName="heart:"+dayId;
	    var heartEle=document.getElementById(heartEleName);
		var pillEleName="pill:"+dayId;
	    var pillEle=document.getElementById(pillEleName);
		var periodEleName="period:"+dayId;
	    var periodEle=document.getElementById(periodEleName);

		if(heartEle.style.color=='white')
			output+=2;
		else
			output+=1;		
		if(pillEle.style.color=='white')
			output+=2;
		else
			output+=1;	
		if(periodEle.style.color=='white')
			output+=2;
		else
			output+=1;
	console.log("output="+output);					
		return(output);
  }
  changeColor(e,color)
  {
	  var ele=document.getElementById(e.target.id);
	  if(ele!==null)
	  {
	     if(ele.style.color=='white')
			{					
		        ele.style.setProperty ("color", color, "important");
			}
		  else
			{
			    ele.style.setProperty ("color", 'white', "important");  					
			}
		/*update db*/
		var body={month:this.props.num , day:this.props.text ,data:this.getDataByColor(e)};
		axios.post('/update',body)
	      .then(response => console.log(response.data));
	  }		
  }   
  
  render()
  {
	  if(this.props.data)
		{
		  var heart=this.props.data.charAt(0)=='1'?'#FFA07A':'white';
		  var pill=this.props.data.charAt(1)=='1'?'rgb(23,162,184)':'white';
		  var period=this.props.data.charAt(2)=='1'?'#52BE80':'white';
		}
	
	  var output=[];
	  var idheart="heart"+":"+this.props.text;
	  var idpill="pill"+":"+this.props.text;
	  var idperiod="period"+":"+this.props.text;
	  if(this.props.text!=0)
		{
	  		output.push(<p className="date"> {this.props.text} </p>); 
			output.push(<a href="#" onClick={(e) => {this.changeColor(e,'#FFA07A');}} > <i id={idheart} style={{color:heart}} className='fas fa-heart fa-2x' data-tip="Intimate"> </i> </a>);
	  		output.push(<a href="#" onClick={(e) => {this.changeColor(e,'rgb(23,162,184)');}} > <i id={idpill} style={{color:pill}} className='fas fa-pills fa-2x' data-tip="Pill"> </i> </a>);
	  		output.push(<a href="#" onClick={(e) => {this.changeColor(e,'#52BE80');}} > <i id={idperiod} style={{color:period}} className='fas fa-female fa-2x' data-tip="Period"> </i> </a>);	  
		}
	  
	  /*yellow border to the current date cube*/
	  var d = new Date();
	  var n = d.getDate();
  	  var n2 = d.getMonth();
	  var classC='';
	  if(n==this.props.text && n2==this.props.num)
			classC='current';
			
	  return (
			  <div id={classC} className="cube" style={{height:this.props.height}} dir="ltr">		
			  		{output}
			  		<ReactTooltip />
			  </div>
	  );
  }
}

