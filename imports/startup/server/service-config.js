import { Meteor  } from "meteor/meteor";
import { Accounts  } from 'meteor/accounts-base'

if(Meteor.isServer) {
	ServiceConfiguration.configurations.upsert(
		{ service: 'twitter'  },
		{
			$set: {
				loginStyle: "popup",
				consumerKey: Meteor.settings.CONSUMER_KEY,
				secret: Meteor.settings.CONSUMER_SECRET
			}
		}
	);
}
