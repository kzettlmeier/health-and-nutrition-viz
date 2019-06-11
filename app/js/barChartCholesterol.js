function createCholesterolBarChart(id, column, groupValue) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 380 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // delete the old svg
    d3.selectAll("#" + id + " > *").remove();

    var svg = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("http://localhost:5000/data", function(error, data) {

        var levels = [
            {
                count: 0,
                level: [0, 160],
                label: '<160',
                rgb : 'rgb(250, 180, 0)'
            },
            {
                count: 0,
                level: [161, 190],
                label: '161-190',
                rgb : 'rgb(240, 170, 0)'
            },
            {
                count: 0,
                level: [191, 220],
                label: '191-220',
                rgb : 'rgb(230, 160, 0)'
            },
            {
                count: 0,
                level: [221, 250],
                label: '221-250',
                rgb : 'rgb(220, 150, 0 )'
            },
            {
                count: 0,
                level: [251, 1000],
                label: '>250',
                rgb : 'rgb(210, 140, 0)'
            }
        ];

        const prop = 'Cholesterol (mg/dL)';
        data.forEach(d => {
            if (d[prop] && d[column] === groupValue && d[prop] !== '0') {
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
        
        x.domain(levels.map(function(d) { return d.label; }));
        y.domain([0, d3.max(levels, function(d) { return d.count; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(levels)
            .enter().append("rect")
            .attr("x", function(d) { return x(d.label); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })
            .style("fill", function (d) {
                return 'rgb(240, 170, 0)';
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        d3.select("#" + id + "_label")
            .style("display", "block");
    });
}