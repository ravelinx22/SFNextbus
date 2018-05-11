import * as d3 from "d3";


export function getBuses(location) {
	console.log(location);
	const url = "http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=sf-" + location +"&r=N";
	return fetch(url)
}
