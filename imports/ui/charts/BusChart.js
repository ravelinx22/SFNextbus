import * as d3 from "d3";

export function BusChart(buses, stops) {
	console.log(buses);
	const height = 600;
	var chart = d3.select("#chart");
	const margin = ({top: 20, right: 30, bottom: 30, left: 150});
	var width = chart.node().getBoundingClientRect().width;

	var svg = chart.append("svg")
			.attr("width", width)
			.attr("height", height);

	const minDate = d3.min(buses[0], d => d.date);
	const maxDate = new Date(minDate.getTime() + 24*60*60*1000); // minDate + 24 hours
	const x = d3.scaleTime()
		.domain([ minDate, maxDate  ])
		.range([margin.left, width - margin.right]);
	const y = d3.scaleBand()
		.domain(d3.range(buses[1].length))
		.rangeRound([height - margin.bottom, margin.top]);

	const xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x))
	// .call(g => g.select(".domain").remove());
	const yAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y)
			.tickFormat((d) => stops[d].content));  

	const line = d3.line()
		.x(d => x(d.date))
		.y((d,i) => y(i) + y.bandwidth()/2);

	svg.append("g")
		.call(xAxis);

	svg.append("g")
		.call(yAxis);

	svg.selectAll(".routes")
		.data(buses)
		.enter()
		.append("path")
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 2)
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("d", line);
	return svg.node();  
}
