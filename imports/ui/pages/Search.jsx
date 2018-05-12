import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { getAgencies, getRoutes  } from "../../data.js";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agencies: [],
			routes: []
		}	
	}

	componentDidMount() {
		this.loadAgencies();
	}

	/* Load data from server */
	loadAgencies() {
		getAgencies()
			.then((ans) => {
				this.setState({
					agencies: ans,
				})
			});
	}

	loadRoutes(agency) {
		getRoutes(agency)
			.then((ans) => {
				this.setState({
					routes: ans,
				});		
			});
	}

	search() {
		console.log(this.state);
	}

	logOut() {
		Meteor.logout(() => {});
	}

	render() {
		return(
			<div id="search-content">
				<h1>Search</h1>	
				<input type="text" ref="agen_input" placeholder="Agency"/>
				<datalist>
				</datalist>
				<input type="text" ref="route_input" placeholder="Route"/>
				<button onClick={this.search.bind(this)}>Load</button>
				<button onClick={this.logOut.bind(this)}>Log Out</button>
			</div>
		);			
	}
}

export default withTracker((props) => {
	//Meteor.subscribe("tests") ;
	return {
	};
})(Search);
