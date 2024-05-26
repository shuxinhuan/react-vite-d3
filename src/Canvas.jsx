import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { exampleData } from './data/exampleData'

function Canvas() {
  const ref = useRef()

  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 150;
  const margin = { top: 10, right: 10, bottom: 20, left: 20 }
  
  const drawChart = async (data) => {
    const svg = d3.select(ref.current)
    // Declare the x (horizontal position) scale.
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, width - margin.right]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleBand()
      .domain(data.map(d => d.key))
      .range([height - margin.bottom, margin.top])

    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(data.map(d => d.key));

    const g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${margin.left}, ${y(d.key)})`);

    g.append('rect')
      .attr('width', d => x(d.value) - x(0))
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.key))
      .style('stroke', 'white');

    g.append('text')
      .attr('x', d => x(d.value) - x(0))
      .attr('dx', -20)
      .attr('dy', '1em')
      .attr('fill', 'white')
      .style('font-size', 'small')
      .text(d => d.value);

    // Add the x-axis.
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add the y-axis.
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Append the SVG element.
    container.append(svg.node())
  }

  useEffect(() => {
    drawChart(exampleData)
  })

  return (
    <div id="container">
      <svg ref={ref} width={width} height={height}></svg>
    </div>
  )
}

export default Canvas
