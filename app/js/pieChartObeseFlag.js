var PieChartObeseFlagViz = function () {
    var newPieChart = {
        drawPieChart: function (id) {
            const canvas = document.querySelector('#' + id);
            const width = canvas.offsetWidth,
                height = canvas.offsetHeight,
                radius = Math.min(width, height) / 2 - 5;

            var color = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6"]);

            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var labelArc = d3.arc()
                .outerRadius(radius - 100)
                .innerRadius(radius - 50);

            var pie = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d;
                });

            var svg = d3.select("#" + id).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            d3.csv('http://localhost:5000/data', function (d) {
                return d;
            }, function (error, data) {
                if (error) throw error;

                const prop = 'Obese';
                const dataGroups = [0, 0];
                var dataCount = 0;
                var obeseCount = 0;
                var notObeseCount = 0;
                data.forEach(d => {
                    if (d[prop]) {
                        dataCount++;
                        if (d[prop] === 'TRUE') {
                            dataGroups[1]++;
                            obeseCount++;
                        } else {
                            dataGroups[0]++;
                            notObeseCount++;
                        }
                    }
                });
                const dataLabels = {
                    0: 'Not Obese: ' + Math.round(notObeseCount / dataCount * 100) + '%',
                    1: 'Obese: ' + Math.round(obeseCount / dataCount * 100) + '%'
                };

                var g = svg.selectAll(".arc")
                    .data(pie(dataGroups))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) {
                        return color(d.data);
                    });

                g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + labelArc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return dataLabels[d.index];
                    });
            })
        }
    };
    return newPieChart;
};