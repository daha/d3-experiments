// Copyright (c) 2012, David Haglund
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//     * Redistributions of source code must retain the above
//       copyright notice, this list of conditions and the following
//       disclaimer.
//
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials
//       provided with the distribution.
//
//     * Neither the name of the copyright holder nor the names of its
//       contributors may be used to endorse or promote products
//       derived from this software without specific prior written
//       permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
// OF THE POSSIBILITY OF SUCH DAMAGE.

/*globals d3 */

// The code has been based on from http://mbostock.github.com/d3/ex/voronoi.html
(function () {
    'use strict';
    var svg, vertices, voronoi,
        width = 500,
        height = 500,
        phi = 1.61803399,
        colors = d3.scale.category20();

    vertices = d3.range(500).map(function (d) {
        var amplitude = Math.pow(d, 1 / phi) * 5,
            x = width / 2 + amplitude * Math.cos(2 * Math.PI / phi * d),
            y = height / 2 + amplitude * Math.sin(2 * Math.PI / phi * d);
        return [x, y];
    });
    voronoi = d3.geom.voronoi(vertices);
    voronoi.splice(400, voronoi.length);

    svg = d3.select("#golden-ratio")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "solid 0px #666")
            .attr("class", "PiYG");

    svg.selectAll("path")
        .data(voronoi)
        .enter()
        .append("path")
        .attr("fill", function (d, i) {return colors(i % 34); })
        .attr("d", function (d) { return "M" + d.join("L") + "Z"; });
}());
