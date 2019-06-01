function createTreemap(dataset, dispatch) {
    var svg = d3.select("#treeMap"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    // Delete old svg
    d3.selectAll("#treeMap > *").remove();

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var treemap = d3.treemap()
        .size([width, height])
        .round(true)
        .padding(1);

    if (dataset === "age") {
        this.createTree(treemap, color, svg, dispatch, "ageByGroupData", "Age By Group", "1-100");
    } else if (dataset === "height") {
        this.createTree(treemap, color, svg, dispatch, "heightByGroupData", "Height By Group", "0-205");
    } else if (dataset === "weight") {
        this.createTree(treemap, color, svg, dispatch, "weightByGroupData", "Weight By Group", "0-225");
    } else {
        console.log("Unknown dataset");
    }
}

function createTree(treemap, color, svg, dispatch, csvApi, columnName, parentValue) {
    d3.csv('http://localhost:5000/' + csvApi, function(d) {
        return d;
      }, function(error, data) {
        if (error) throw error;

        var root = d3.stratify()
        .id(function(d) { return d[columnName]; })
        .parentId(function(d) {
            if (d[columnName] === parentValue) {
                return "";
            } else {
                return parentValue;
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
            .attr("width", function(d) { return d.x1 - d.x0 + 10; }) // Adding 10 so that text fits
            .attr("height", function(d) { return d.y1 - d.y0 + 10; }) // Adding 10 so that text fits
            .attr("fill", function(d) { var a = d.ancestors(); return color(a[a.length - 2].id); })
            .on("click", function(d) { dispatch.call("selected", this, d.data[columnName], columnName); });

        var label = cell.append("text")
            .attr('font-weight', "bold")
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
