import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { getBuses } from "../../data.js";
import { BusChart  } from "../charts/BusChart.js";
import { Comment } from "../../api/comment/Comment.js";
const queryString = require('query-string');

import CommentComponent from "../components/CommentComponent.jsx";

class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buses: [],
			stops: []
		}	
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		getBuses(this.props.agency, this.props.route).then((res) => {	
			this.setState(res);
			this.draw();
		});
	}

	comment() {
		Meteor.call("comment.insert", {
			agency: this.props.agency,
			route: this.props.route,
			message: this.refs.comment.value
		})	
	}

	renderComments() {
		return this.props.comments.map((comment) => {
			return <CommentComponent key={comment._id} comment={comment}/>
		});
	}

	/* D3 */
	draw() {
		BusChart(this.state.buses, this.state.stops);
	}

	render() {
		return(
			<div id="result-content">
				<button onClick={() => {this.props.history.push("/")}}>Back</button>
				<h1>Result</h1>					
				<div id="chart"></div>
				<Container>
					<h1 className="subsec_title">Leave a comment</h1>
					<Row className="justify-content-center">
						<input type="text" placeholder="Comment" ref="comment"/>
						<button onClick={this.comment.bind(this)}>Submit</button>
					</Row>
				</Container>
				<Container>
					<h1 className="subsec_title">Comments</h1>
					{this.renderComments()}
				</Container>
			</div>
		);			
	}
}

export default withTracker((props) => {
	Meteor.subscribe("comment") ;
	const queryParams = queryString.parse(props.location.search);
	return {
		agency: queryParams.a,
		route: queryParams.r,
		comments: Comment.find({agency: queryParams.a, route: queryParams.r}).fetch(),
	};
})(ResultPage);
