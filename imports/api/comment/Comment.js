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

		const user_data = Meteor.user().services.twitter;
		Comment.insert({
			createdAt: new Date(),
			agency: object.agency,
			route: object.route,
			message: object.message,
			profile_pic: user_data.screenName,
			profile_name: user_data.profile_image_url
		})			
	}
});
