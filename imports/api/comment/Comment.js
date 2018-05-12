import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Comment = new Mongo.Collection("comment");

if (Meteor.isServer) {
	Meteor.publish("comment", () => {
		return Comment.find({});
	});
}

Meteor.methods({
	"comment.insert"(object) {
		check(object, {
			agency: String,
			route: String,
			message: String
		});

		Comment.insert({
			createdAt: new Date(),
			agency: object.agency,
			route: object.route,
			message: object.message
		})			
	}
});
