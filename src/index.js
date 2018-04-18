import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Privacy from './components/Privacy';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App}></Route>
			<Route exact path="/privacy" component={Privacy}></Route>
		</div>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
