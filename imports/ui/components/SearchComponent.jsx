import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

export default class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Row id="search-component">
				<Container>
					<div><span>Agency:</span> {this.props.search.agency}</div>
					<div><span>Route:</span> {this.props.search.route}</div>
					<div><span>By:</span> {this.props.search.profile_name}</div>
				</Container>
			</Row>
		 );
	}
}
