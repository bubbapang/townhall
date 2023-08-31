import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CartesianTree = ({ data }) => {
	const ref = useRef();

	useEffect(() => {
		const width = 928;
		const root = d3.hierarchy(data);
		const dx = 6;
		const dy = width / (root.height + 1);
		const tree = d3.tree().nodeSize([dx, dy]);
		root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
		tree(root);

		let x0 = Infinity;
		let x1 = -x0;
		root.each((d) => {
			if (d.x > x1) x1 = d.x;
			if (d.x < x0) x0 = d.x;
		});

		const height = x1 - x0 + dx * 2;

		const svg = d3
			.select(ref.current)
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [-dy / 3, x0 - dx, width, height]);

			svg.append("g")		  
			.attr("fill", "none")
			.attr("stroke", "#555")
			.attr("stroke-opacity", 0.4)
			.attr("stroke-width", 1.5)
			.selectAll("path")
			.data(root.links())
			.join("path")
			.attr(
				"d",
				d3
					.linkHorizontal()
					.x((d) => d.y)
					.y((d) => d.x)
			);

		const node = svg
			.append("g")
			.attr("stroke-linejoin", "round")
			.attr("stroke-width", 3)
			.selectAll("g")
			.data(root.descendants())
			.join("g")
			.attr("transform", (d) => `translate(${d.y},${d.x})`);

		node.append("circle")
			.attr("fill", (d) => (d.children ? "#555" : "#999"))
			.attr("r", 2.5);

		node.append("text")
			.attr("dy", "0.31em")
			.attr("x", (d) => (d.children ? -6 : 6))
			.attr("text-anchor", (d) => (d.children ? "end" : "start"))
			.text((d) => d.data.name)
			.clone(true)
			.lower()
			.attr("stroke", "white");
	}, [data]);

	return <svg ref={ref}></svg>;
};

export default CartesianTree;
