import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import SignInUp from './components/SignInUp';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";

var d = new Date();  
{/*var month=months[d.getMonth()]; */}

ReactDOM.render(
 <Router>  
	  <Switch>
		  <Route exact path="/signIn" component={SignInUp} />
		  <Route exact path="/:num" component={Main} />
		  <Route exact path="/" component={() => <Main num={d.getMonth()} />} />
	   </Switch>
</Router>,
document.getElementById('root')
);

{/*ReactDOM.render(	 
  <React.StrictMode>
    <Main month={month} />
  </React.StrictMode>,
  document.getElementById('root')
);*/}


