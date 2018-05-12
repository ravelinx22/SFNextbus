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
		const agency = this.refs.agen_input.value;
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

	/* User related */
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
				<Container>
					<Row>
						<Col md="6">
							<h4>Previou searches</h4>
							{this.renderSearches()}
						</Col>
						<Col md="6">
							<h4>Top searched agencies</h4>
							<RankingComponent/>
						</Col>
					</Row>
				</Container>
			</div>
		);			
	}
}

export default withRouter(
	withTracker((props) => {
		Meteor.subscribe("search");

		return {
			searches: Search.find({}).fetch(),
		};
	})(SearchPage)
);
