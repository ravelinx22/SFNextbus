import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";
import { getBuses, getAgencies, getRoutes } from "../../data.js";
import { BusChart } from "../charts/BusChart.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buses: [],
			stops: [],
			agencies: [],
			routes: []
		}
	}

	componentDidMount() {
		this.loadAgencies();
	}


	/* Load data from server*/
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

	loadData() {
		getBuses(this.refs.agen_input.value, this.refs.route_input.value).then((res) => {	
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
			<div id="content">
				<h1>Buses</h1>
				<input type="text" ref="agen_input" placeholder="Agency"/>
				<datalist>
				</datalist>
				<input type="text" ref="route_input" placeholder="Route"/>
				<button onClick={this.loadData.bind(this)}>Load</button>
				<div id="chart"></div>
			</div>
		);
	}
}
