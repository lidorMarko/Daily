import React, { Component }  from 'react';
import './../css/SignInUp.css';
import axios from 'axios';
import {
	  Link
	} from "react-router-dom";

export default class SignInUp extends Component
{
	constructor(props) 
	  {
	    super(props);
	    this.authentication = this.authentication.bind(this);
	    this.signUp = this.signUp.bind(this);
	  }
	componentDidMount() 
  	{
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');
		
		if(signUpButton)
		{
			signUpButton.addEventListener('click', () => {
			    container.classList.add('right-panel-active');
			});	
			signInButton.addEventListener('click', () => {
			    container.classList.remove('right-panel-active');
			});
		}
	}
	authentication()
	{
		var email=document.getElementById('LoginInputEmail').value;
		var pass=document.getElementById('LoginInputPass').value;
		alert("email= "+email+" pass= "+pass);
		var body={email:email,pass:pass};
		axios.post('/auth',body).then(response => {
			if(response.data)
				alert('currect');
			else
				alert('incurrect values!');			
		})
		.catch(err => {
				    if ((err.response) || (err.request))
				console.log("unable to fetch data from server");	
		})	
	}
	signUp()
	{
		var email=document.getElementById('signUpInputEmail').value;
		var pass=document.getElementById('signUpInputPass').value;
		alert("email= "+email+" pass= "+pass);
		var body={email:email,pass:pass};
		axios.post('/signUp',body).then(response => {
			if(response.data)
				alert('succesfully added');
			else
				alert('something happend');			
		})
		.catch(err => {
				    if ((err.response) || (err.request))
				console.log("unable to fetch data from server");	
		})	
	}
	
  render()
  {
	  return(
			<div class="container" id="container">
			    <div class="form-container sign-up-container">
					    <form action="#">
					        <h1>Create Account</h1>
					        <div class="social-container">
					            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
					            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
					            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
					        </div>
					        <span>or use your email for registration</span>
					        <input id="signUpInputEmail" type="email" placeholder="email" />
					        <input id="signUpInputPass" type="password" placeholder="Password" />
					        <button onClick={(e) => {this.signUp();}}>Sign Up</button>
							<Link exact to='/' >
								<i className="x fas fa-times fa-2x"></i>
							</Link>
					    </form>
			     </div>
			     <div class="form-container sign-in-container">
					    <form action="#">
					        <h1>Sign in</h1>
					        <div class="social-container">
					            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
					            <a href="/auth/google" class="social"><i class="fab fa-google-plus-g"></i></a>
					            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
					        </div>
					        <span>or use your account</span>
					        <input id="LoginInputEmail" type="Email" placeholder="Email" />
					        <input id="LoginInputPass" type="password" placeholder="Password" />
					        <a href="#">Forgot your password?</a>
					        <button onClick={(e) => {this.authentication();}}>Sign In</button>
							<Link exact to='/' >
								<i className="x fas fa-times fa-2x"></i>
							</Link>
					    </form>
			     </div>
			     <div class="overlay-container">
					    <div class="overlay">
					        <div class="overlay-panel overlay-left">
					            <h1>you look familier</h1>
					            <p>
					                already have an account? - Sign in
					            </p>
					            <button class="ghost" id="signIn">Sign In</button>
					        </div>
					        <div class="overlay-panel overlay-right">
					            <h1>Are you new here ?</h1>
					            <p>Sign up and start saving your monthly data easily</p>
					            <button class="ghost" id="signUp">Sign Up</button>
					        </div>
						</div>
			    </div>
			</div>
	  );
  }
}

