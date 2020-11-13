import React, { Component }  from 'react';
import './../css/SignInUp.css';
import axios from 'axios';
import {
	  Link
	} from "react-router-dom";

export default class SignInUp extends Component
{
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
					        <input type="text" placeholder="Name" />
					        <input type="email" placeholder="Email" />
					        <input type="password" placeholder="Password" />
					        <button>Sign Up</button>
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
					        <input type="email" placeholder="Email" />
					        <input type="password" placeholder="Password" />
					        <a href="#">Forgot your password?</a>
					        <button>Sign In</button>
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

