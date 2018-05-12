import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import Search from "./Search.jsx";
import Enter from "./Enter.jsx";

class Home extends Component {
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
				{this.props.user ? <Search/> : <Enter/>}
			</div>
		);
	}
}

export default withTracker((props) => {
	return {
		user: Meteor.userId()
	}
})(Home);
