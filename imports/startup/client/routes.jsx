import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from "../../ui/containers/App.jsx";
import HomePage from "../../ui/pages/HomePage.jsx";
import EnterPage from "../../ui/pages/EnterPage.jsx";
import SearchPage from "../../ui/pages/SearchPage.jsx";
import ResultPage from "../../ui/pages/ResultPage.jsx";

export const renderRoutes = () => ( 
	<Router> 
		<App>
			<Switch>
				<Route exact path="/" component={HomePage} />	
				<Route path="/result" component={ResultPage} />
			</Switch>
		</App>
	</Router>
);
