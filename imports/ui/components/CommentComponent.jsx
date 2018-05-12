import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

export default class CommentComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Row id="comment-row">
				<div>{this.props.comment.profile_name}</div>
				<div>{this.props.comment.message}</div>
			</Row>
		 );
	}
}
