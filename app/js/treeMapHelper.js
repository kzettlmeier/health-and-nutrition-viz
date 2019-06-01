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
        this.createAgeTree(treemap, color, svg, dispatch);
    } else if (dataset === "height") {
        this.createHeightTree(treemap, color, svg, dispatch);
    } else if (dataset === "weight") {
        this.createWeightTree(treemap, color, svg, dispatch);
    } else {
        console.log("Unknown dataset");
    }
}

function createAgeTree(treemap, color, svg, dispatch) {
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
            .attr("width", function(d) { return d.x1 - d.x0 + 10; }) // Adding 10 so that text fits
            .attr("height", function(d) { return d.y1 - d.y0 + 10; }) // Adding 10 so that text fits
            .attr("fill", function(d) { var a = d.ancestors(); return color(a[a.length - 2].id); })
            .on("click", function(d) { dispatch.call("selected", this, d.data["Age By Group"], 'Age By Group'); });

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

function createHeightTree(treemap, color, svg, dispatch) {
    d3.csv('http://localhost:5000/heightByGroupData', function(d) {
        return d;
      }, function(error, data) {
        if (error) throw error;

        var root = d3.stratify()
        .id(function(d) { return d["Height By Group"]; })
        .parentId(function(d) {
            if (d["Height By Group"] === "0-205") {
                return "";
            } else {
                return "0-205";
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
            .on("click", function(d) { dispatch.call("selected", {}, d.data["Height By Group"], "Height By Group"); });

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

function createWeightTree(treemap, color, svg, dispatch) {
    d3.csv('http://localhost:5000/weightByGroupData', function(d) {
        return d;
      }, function(error, data) {
        if (error) throw error;

        var root = d3.stratify()
        .id(function(d) { return d["Weight By Group"]; })
        .parentId(function(d) {
            if (d["Weight By Group"] === "0-225") {
                return "";
            } else {
                return "0-225";
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
            .on("click", function(d) { dispatch.call("selected", {}, d.data["Weight By Group"], "Weight By Group"); });

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
