function getDataFile() {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var treemap = d3.treemap()
        .size([width, height])
        .round(true)
        .padding(1);

    d3.csv('http://localhost:5000/ageByGroupData', function(d) {
        return d;
      }, function(error, data) {
        if (error) throw error;

        var root = d3.stratify()
        .id(function(d) { return d["Age By Group"]; })
        .parentId(function(d) {
            if (d["Age By Group"] === "1-100") {
                return "";
            } else {
                return "1-100";
            }
         })
      (data)
        .sum(function(d) { return d.Count; })
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

        treemap(root);

        var cell = svg.selectAll("a")
        .data(root.leaves())
        .enter().append("a")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

        cell.append("rect")
            .attr("id", function(d) { return d.id; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { var a = d.ancestors(); return color(a[a.length - 2].id); });

        var label = cell.append("text")
            .attr("clip-path", function(d) { return d.id; });

        label.append("tspan")
            .attr("x", 4)
            .attr("y", 13)
            .text(function(d) { return d.id });

        label.append("tspan")
            .attr("x", 4)
            .attr("y", 25)
            .text(function(d) { return d.value; });
    });
}