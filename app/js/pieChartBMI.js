var PieChartBMI = function () {
    var newChart = {
        draw: function (id, column, groupValue) {
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
                .outerRadius(radius - 50)
                .innerRadius(radius - 50);
            var labelArc2 = d3.arc()
                .outerRadius(radius - 125)
                .innerRadius(radius - 125);

            var pie = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d;
                });

            // delete the old svg
            d3.selectAll("#" + id + " > *").remove();

            var svg = d3.select("#" + id).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            d3.csv('http://localhost:5000/data', function (d) {
                return d;
            }, function (error, data) {
                if (error) throw error;

                var levels = [
                    {
                        count: 0,
                        level: [0, 17],
                        label: '12-17',
                        rgb : 'rgb(0, 153, 224)'
                    },
                    {
                        count: 0,
                        level: [17, 23],
                        label: '18-23',
                        rgb : 'rgb(0, 224, 105)'
                    },
                    {
                        count: 0,
                        level: [23, 29],
                        label: '24-29',
                        rgb : 'rgb(222, 230, 0)'
                    },
                    {
                        count: 0,
                        level: [29, 35],
                        label: '30-35',
                        rgb : 'rgb(230, 180, 0)'
                    },
                    {
                        count: 0,
                        level: [35, 100],
                        label: '36-42',
                        rgb : 'rgb(255, 0, 0)'
                    }
                ];

                const prop = 'Body Mass Index (kg/m**2)';
                var dataCount = 0;
                data.forEach(d => {
                    if (d[prop] && d[column] === groupValue && d[prop] !== '0') {
                        dataCount++;
                        var val = parseFloat(d[prop]);
                        for (var i = 0; i < levels.length; i++) {
                            var range = levels[i].level;
                            if (val >= range[0] && val <= range[1]) {
                                levels[i].count++;
                                break;
                            }
                        }
                    }
                });
                var dataGroups = [];
                var dataLabels = [];
                var colors = [];
                levels.forEach(l => {
                    dataGroups.push(l.count);
                    dataLabels.push(l.label);
                    colors.push(l.rgb);
                    l.percentage = Math.round(l.count/dataCount * 100) + '%';
                });

                var g = svg.selectAll(".arc")
                    .data(pie(dataGroups))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) {
                        return colors[d.index];
                    });

                g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + labelArc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return dataLabels[d.index];
                    });


                g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + labelArc2.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return levels[d.index].percentage;
                    });

                d3.select("#" + id + "_label")
                    .style("display", "block");
            })
        }
    };
    return newChart;
};