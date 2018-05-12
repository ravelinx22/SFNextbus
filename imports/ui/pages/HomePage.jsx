import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import SearchPage from "./SearchPage.jsx";
import EnterPage from "./EnterPage.jsx";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div id="home-content">
				{this.props.user ? <SearchPage/> : <EnterPage/>}
			</div>
		);
	}
}

export default withTracker((props) => {
	return {
		user: Meteor.userId()
	}
})(HomePage);
