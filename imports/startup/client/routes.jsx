import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from "../../ui/containers/App.jsx";
import Enter from "../../ui/pages/Enter.jsx";
import Search from "../../ui/pages/Search.jsx";
import Result from "../../ui/pages/Result.jsx";

export const renderRoutes = () => ( 
	<Router> 
		<App>
			<Switch>
				<Route exact path="/" component={Enter} />	
				<Route path="/search" component={Search} />
				<Route path="/result" component={Result} />
			</Switch>
		</App>
	</Router>
);
