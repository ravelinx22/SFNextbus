import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter  } from "react-router-dom";
import { withTracker  } from "meteor/react-meteor-data";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div>
				{this.props.children}
				<Alert stack={{limit: 3}} />
			</div>
		);
	}
}
