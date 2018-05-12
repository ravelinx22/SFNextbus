import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { getBuses } from "../../data.js";
import { BusChart  } from "../charts/BusChart.js";
const queryString = require('query-string');

class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buses: [],
			stops: []
		}	
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		getBuses(this.props.agency, this.props.route).then((res) => {	
			this.setState(res);
			this.draw();
		});
	}

	/* D3 */
	draw() {
		BusChart(this.state.buses, this.state.stops);
	}

	render() {
		return(
			<div id="result-content">
				<h1>Result</h1>					
				<div id="chart"></div>
			</div>
		);			
	}
}

export default withTracker((props) => {
	//Meteor.subscribe("tests") ;
	const queryParams = queryString.parse(props.location.search);
	return {
		agency: queryParams.a,
		route: queryParams.r,
	};
})(ResultPage);
