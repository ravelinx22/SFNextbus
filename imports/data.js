import * as d3 from "d3";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

const basePath = "http://webservices.nextbus.com/service/publicJSONFeed?command=";

export function getBuses(location, route) {
	const url = basePath + "schedule&a=" + location +"&r=" + route;
	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			try {
				return json.route[0];
			} catch(e) {
				Alert.error("Opps there was an error please go back", {
					position: 'top-right',
					effect: 'jelly',
					timeout: 2000,
				});
			}
		})
		.then((rou) => {
			try {
				let buses = []
				for (let bus of rou.tr) { 
					let route = bus.stop.filter((d) => d.content!=="--");
					route.forEach((d) => d.date = new Date(+d.epochTime));    
					buses.push(route);
				}
				return {
					buses: buses,
					stops: rou.header.stop,
				};
			} catch(e) {
				Alert.error("Opps there was an error please go back", {
					position: 'top-right',
					effect: 'jelly',
					timeout: 2000,
				});
			}
		});
}

export function getRoutes(agency) {
	const url = basePath + "routeList&a=" + agency;
	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			return json.route;
		})
}

export function getAgencies() {
	const url = basePath + "agencyList";
	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			return json.agency;
		});
}
