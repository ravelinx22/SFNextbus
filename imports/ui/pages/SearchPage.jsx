import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { getAgencies, getRoutes  } from "../../data.js";
import { Search } from "../../api/search/Search.js";

import SearchComponent from "../components/SearchComponent.jsx";
import RankingComponent from "../components/RankingComponent.jsx";

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agencies: [],
			routes: [],
			fastAccess: {}
		}	
	}

	componentDidMount() {
		this.loadAgencies();
	}

	/* Load data from server */
	loadAgencies() {
		getAgencies()
			.then((ans) => {
				var fastAccess = {};
				for(var i = 0; i < ans.length; i++) {
					let ag = ans[i];
					fastAccess[ag.title] = ag.tag;
				}

				this.setState({
					agencies: ans,
					fastAccess: fastAccess,
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
		const agency = this.state.fastAccess[this.refs.agen_input.value];
		const route = this.refs.route_input.value;
		this.props.history.push("/result?a=" + agency + "&r=" + route);
		Meteor.call("search.insert", {
			agency: agency,
			route: route
		});
	}

	renderSearches() {
		return this.props.searches.map((search) => {
			return <SearchComponent search={search} key={search._id}/>
		});
	}

	renderAgencies() {
		return this.state.agencies.map((ag) => {
			return <option value={ag.title} key={ag.tag}/>
		})
	}

	renderRoutes() {
		console.log(this.state);
		return this.state.routes.map((rou) => {
			return <option value={rou.tag} key={rou.tag}/>
		})
	}

	onInput(e) {
		if(this.state.fastAccess[e.target.value]) {
			console.log("Se encontro agencia");
			this.loadRoutes(this.state.fastAccess[e.target.value]);
		}
	}

	/* User related */
	logOut() {
		Meteor.logout(() => {});
	}

	render() {
		return(
			<Container id="search-content">
				<Row>
					<button className="ml-auto" onClick={this.logOut.bind(this)}>Log Out</button>
				</Row>
				<div className="mainTitle">SFNextbus</div>
				<h1 className="search-title">Search</h1>	
				<Row className="justify-content-center">
					<input list="agencies" type="text" ref="agen_input" placeholder="Agency" onInput={this.onInput.bind(this)}/>
					<datalist id="agencies">
						{this.renderAgencies()}
					</datalist>
					<input list="routes" type="text" ref="route_input" placeholder="Route"/>
					<datalist id="routes">
						{this.renderRoutes()}
					</datalist>
					<button onClick={this.search.bind(this)}>Load</button>
				</Row>
				<Container className="history-content">
					<Row>
						<Col md="6">
							<h4>Previous searches</h4>
							{this.renderSearches()}
						</Col>
						<Col md="6">
							<h4>Top searched agencies</h4>
							<RankingComponent/>
						</Col>
					</Row>
				</Container>
			</Container>
		);			
	}
}

export default withRouter(
	withTracker((props) => {
		Meteor.subscribe("search");

		return {
			searches: Search.find({}, {sort: {createdAt: -1}, limit: 10}).fetch(),
		};
	})(SearchPage)
);
