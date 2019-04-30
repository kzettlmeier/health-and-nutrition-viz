function getDataFile() {
    d3.csv('https://www.kendallzettlmeier.com/docs/nhanes_dataset.csv').then(function (data) {
        var columns = ['RIAGENDR', 'RIDAGEYR', 'RIDRETH1', 'DMDEDUC2', 'DMDMARTL', 'INDHHIN2', 'INDFMPIR', 'BPQ020', 'CBD070', 
            'CBD090', 'CBD120', 'CBD130', 'DIQ010', 'DBD895', 'DBD900', 'DBD905', 'DBD910', 'MCQ080', 'MCQ365A', 'MCQ365B', 'PAD680', 
            'SMQ020', 'WHD010', 'WHD020', 'SEQN', 'Weight_kg', 'Height_m', 'BMI_Perc', 'ObeseFlag', 'GenderStr', 'RaceStr'];
            var table = d3.select('#container').append('table');
            var thead = table.append('thead');
            var tbody = table.append('tbody');
          
            thead.append('tr')
                .selectAll('th')
                .data(columns)
                .enter()
                .append('th')
                    .text(function (column) { return column; });
        
            var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');
          
            var cells = rows.selectAll('td')
                .data(function(row) {
                    return columns.map(function (column) {
                        return { column: column, value: row[column] }
                });
            })
            .enter()
            .append('td')
                .text(function (d) { return d.value });
    });
}
