import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Accounts   } from 'meteor/accounts-base'

export default class EnterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	enterWithTwitter() {
		Meteor.loginWithTwitter({
			requestPermissions: ['email']
		}, (error) => {
			if(error) throw error;
		});
	}

	checkLoggedIn() {

	}

	render() {
		return (
			<div className="enter-content">
				<Container>
				<div className="mainTitle">SFNextbus</div>
				<h1>Find your route</h1>
				<Row className="justify-content-center">
					<button id="btnTwitter" onClick={this.enterWithTwitter.bind(this)}><i className="fa fa-twitter"/>Enter with Twitter</button>
				</Row>
			</Container>
		</div>
		);
	}
}
