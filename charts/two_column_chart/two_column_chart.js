var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Estado"
    }, {
        "colIndex": 1,
        "colType": "String",
        "colName": "Produto"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "Revenda X/X"
    }, {
        "colIndex": 3,
        "colType": "Numeric",
        "colName": "Revenda Y/Y"
    }, {
        "colIndex": 4,
        "colType": "Numeric",
        "colName": "Revenda Z/Z"
    }],
    "resultset": [
        ["Alagoas", "Todos", 36, 46],
        ["Alagoas", "Produto W", 10, 0],
        ["Alagoas", "Produto X", 26, 0],
        ["Alagoas", "Produto Y", 38, 50],
        ["Alagoas", "Produto Z", 25, 20],
        ["Mato Grosso", "Todos", 63, 70, 26],
        ["Mato Grosso", "Produto A", 23, 50, 30],
        ["Mato Grosso", "Produto B", 35, 40, 40],
        ["Mato Grosso", "Produto C", 60, 10, 10],
        ["Mato Grosso", "Produto D", 71, 20, 13],
        ["Mato Grosso do Sul", "Todos", 34, 13],
        ["Mato Grosso do Sul", "Produto A", 34, 13],
        ["Mato Grosso do Sul", "Produto B", 20, 31],
        ["Mato Grosso do Sul", "Produto C", 34, 43],
        ["Rio Grande do Sul", "Todos", 37, 78],
        ["Rio Grande do Sul", "Produto A", 45, 90],
        ["Rio Grande do Sul", "Produto B", 65, 70],
        ["Santa Catarina", "Todos", 26, 7, 13],
        ["Santa Catarina", "Produto X", 23, 13],
        ["Santa Catarina", "Produto Y", 7, 10],
        ["São Paulo", "Todos", 66, 36],
        ["São Paulo", "Produto A", 78, 30],
        ["São Paulo", "Produto B", 84, 13],
        ["São Paulo", "Produto C", 96, 30],
        ["São Paulo", "Produto D", 14, 55]
    ]
};



var series = [];
var drilldownSeries = [];

//Get the serieName 
$.each(result.metadata, function(index, value) {

    if (value.colType === 'Integer' || value.colType === 'Numeric') {
        series.push({
            data: [],
            name: value.colName.split('/')[0]
        });
    }
});

var drilldownSerieIdxArray = [];
$.each(result.resultset, function(rowIndex, rowValue) {

    var serieName = rowValue[0];
    var level = rowValue[1];
    var values = rowValue.splice(2, 3);

    $.each(values, function(colIndex, value) {
        if (level === 'Todos') {
            //Create the serieModel
            var serieModel = {
                    name: serieName,
                    y: value,
                    drilldown: 'drilldown-' + rowIndex + '-' + colIndex //Create the index for drilldow
                }
                //Push the serieModel for each series
            series[colIndex].data.push(serieModel);
            //Push the drilldowSeries
            drilldownSeries.push({
                id: 'drilldown-' + rowIndex + '-' + colIndex,
                name: serieName,
                allowPointDrilldown: true,
                data: []
            });
            //Get the index for each drildownSeries elements
            indexOfNewElement = drilldownSeries.length - 1;
            drilldownSerieIdxArray[colIndex] = indexOfNewElement;
        } else {
            index = drilldownSerieIdxArray[colIndex];

            //Compare to push only with value exists
            if (value)
                drilldownSeries[index].data.push(
                    [level, value]
                );

        };
    });
});


$(function() {

    Highcharts.chart('container', {

        chart: {
            type: 'column',
            height: 350
        },
        title: {
            text: 'Preço médio convertido por tipo de revenda e estado'
        },
        subtitle: {
            //text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Preço médio convertido em R$'
            }

        },
        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: 'R$ {point.y:.2f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>R$ {point.y:.2f}</b> <br/>'
        },

        series: series,
        drilldown: {
            series: drilldownSeries
        }

    })

});