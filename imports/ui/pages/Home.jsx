import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as d3 from "d3";
import { getBuses } from "../../data.js";
import { BusChart } from "../charts/BusChart.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buses: [],
			stops: []
		}
	}

	componentDidMount() {
	}

	getData(location) {
		getBuses(location).then((res) => {
			return res.json();
		}).then((json) => {
			return json.route[0];
		}).then((rou) => {
			let buses = []
			for (let bus of rou.tr) { 
				let route = bus.stop.filter((d) => d.content!=="--");
				route.forEach((d) => d.date = new Date(+d.epochTime));    
				buses.push(route);
			}

			this.setState({
				buses: buses,
				stops: rou.header.stop,
			});
			this.draw();
		});
	}

	draw() {
		BusChart(this.state.buses, this.state.stops);
	}

	load() {
		this.getData(this.refs.input.value);
		console.log(this.refs.input.value);
	}

	render() {
		return(
			<div id="content">
				<h1>Buses</h1>
				<input type="text" ref="input"/>
				<button onClick={this.load.bind(this)}>Load</button>
				<div id="chart"></div>
			</div>
		);
	}
}
