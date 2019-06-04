var CholesterolHistogram = function () {
    var newChart = {
        draw: function (id, column, groupValue) {
            const margin = {top: 10, right: 30, bottom: 30, left: 30};

            // delete the old svg
            d3.selectAll("#" + id + " > *").remove();

            d3.csv('http://localhost:5000/data', function (d) {
                return d;
            }, function (error, data) {
                if (error) throw error;

                const prop = 'Cholesterol (mg/dL)';
                const dataGroups = [0, 0];
                var histData = [];
                data.forEach(d => {
                    if (d[prop]  && d[prop] !== '0') {
                        histData.push(d[prop]);
                    }
                });
                console.log(histData)
                const dataLabels = {
                };

                var formatCount = d3.format(",.0f");
                var svg = d3.select("#" + id)
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom;
                var maxValue = d3.max(histData, function(d) { return +d });
                var minValue = d3.min(histData, function(d) { return +d });
                var x = d3.scaleLinear()
                    .rangeRound([0, width])
                    .domain([minValue, maxValue]);

                var bins = d3.histogram()
                    .domain(x.domain())
                    .thresholds(x.ticks(50))
                    (histData);
                console.log(bins)

                var y = d3.scaleLinear().clamp(true)
                    .domain([0, maxValue])
                    .range([height, 0]);

                var bar = g.selectAll(".bar")
                    .data(bins)
                    .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });
                bar.append("rect")
                    .attr("x", 1)
                    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
                    .attr("height", function(d) { return height - y(d.length); });

                bar.append("text")
                    .attr("dy", ".75em")
                    .attr("y", 6)
                    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
                    .attr("text-anchor", "middle")
                    .text(function(d) { return formatCount(d.length); });

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

            })
        }
    };
    return newChart;
};