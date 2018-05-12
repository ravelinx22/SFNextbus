import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Search = new Mongo.Collection("search");

if (Meteor.isServer) {
	Meteor.publish("search", () => {
		return Search.find({});
	});
}

Meteor.methods({
	"search.insert"(object) {
		check(object, {
			agency: String,
			route: String
		});

		Search.insert({
			createdAt: new Date(),
			agency: object.agency,
			route: object.route
		})			
	}
});
