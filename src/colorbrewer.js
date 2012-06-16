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

(function () {
    'use strict';

    d3.csv("colorbrewer-patterns.csv", function (data) {
        var svg, dataPatterns, pattern,
            width = 800,
            height = 60 * data.length;
        data = data.map(function (d) {
            d.colorCount = +d.colorCount;
            return d;
        });
        dataPatterns = d3.nest()
            .key(function (d) { return d.pattern; })
            .entries(data);

        svg = d3.select("#chart")
            .append("svg")
            .attr("title", "colorbrewer")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("width", width)
            .attr("height", height);

        pattern = svg.selectAll("g.pattern")
            .data(data)
            .enter()
            .append("g")
            .attr("class", function (d) { return "pattern " + d.pattern; })
            .attr("transform", function (d, i) {
                return "translate(20," + (10 + i * 60) + ")";
            });

        pattern.selectAll("rect")
            .data(function (d) {
                return d3.range(d.colorCount).map(function () {
                    return d.colorCount;
                });
            })
            .enter()
            .append("rect")
            .attr("class", function (d, i) {
                return "q" + (i % d) + "-" + d;
            })
            .attr("transform", function (d, i) {
                return "translate(" + i * 50 + ",0)";
            })
            .attr("width", 50)
            .attr("height", 50)
            .style("border", "solid 1px #000")
            .style("stroke", "#000")
            .style("stroke-width", "1px");
    });


}());
