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
			<div id="enter-content">
				<h1>Enter</h1>
				<button onClick={this.enterWithTwitter.bind(this)}>Enter with Twitter</button>
			</div>
		);
	}
}
