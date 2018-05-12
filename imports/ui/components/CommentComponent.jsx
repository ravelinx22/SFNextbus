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
				<img src={this.props.comment.profile_pic} alt="profile" className="img-circle"/>
				<span>{this.props.comment.profile_name}:</span> {this.props.comment.message}
			</Row>
		);
	}
}
