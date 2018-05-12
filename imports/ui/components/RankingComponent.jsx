import React, { Component  } from "react";
import { Container, Row, Col, Button  } from "reactstrap";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

export default class RankingComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spots: []
		};
	}

	componentDidMount() {
		this.renderRanking();
	}

	renderRanking() {
		Meteor.call("search.ranking", (err, res) => {
			console.log(res);
			var spots = res.map((ser) => {
				return <Row key={ser._id}>{ser._id}</Row>
			})
			this.setState({
				spots: spots
			});
		});
	}

	render() {
		return (
			<Container>
				{this.state.spots}
			</Container>
		 );
	}
}
