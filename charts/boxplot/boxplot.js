var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Regiao"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Preco Minimo"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "FirstQ"
    }, {
        "colIndex": 3,
        "colType": "Numeric",
        "colName": "ThirdQ"
    }, {
        "colIndex": 4,
        "colType": "Numeric",
        "colName": "Preco Maximo"
    }, {
        "colIndex": 5,
        "colType": "Numeric",
        "colName": "Avg"
    }],
    "resultset": [
        ["APAC", 28106  , 98496  , 133535 , 158345 , 192811 ],
        ["EMEA", 50024 , 70488 , 93171 , 118008 , 131294 ],
        ["Japan", 53658 , 67605 , 94016 , 120563 , 150792 ],
        ["NA", 38506 , 67507 , 82980 , 104562 , 111370 ]
        ]

};

var categories = [];
var soma = 0;
var media = 0;

data = [];

$.each(result.resultset, function( index, value ) {

    soma += value[6];
    categories.push(value[0]);
    data.push(value.splice(1,6));

});

media = soma / result.resultset.length ;


$(function () {


    Highcharts.chart('container', {

        chart: {
            type: 'boxplot',       
            height: 350
        },
         plotOptions: {
            boxplot: {
                lineColor: '#0862a3'
            }
        },
        title: {
            text: 'Comparative Sales by Territory'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: categories,
            title: {
                text: 'Teeritory'
            }
        },
         tooltip: {
                    formatter: function() {
                        
                         return 'Territory: <b>' +this.point.category+ '</b> <br>' + 
                                'Minimum: <b>' +(this.point.high)+ '</b> <br>' +
                                'Q1: <b>' +(this.point.q3)+ '</b> <br>'+
                                'Median: <b>' +(this.point.median)+ '</b> <br>' +
                                'Q2: <b>' +(this.point.q1)+ '</b> <br>'+
                                'Maximum: <b>' +(this.point.low)+ '</b> <br>';
                    }
        },
        yAxis: {
            title: {
                text: 'Sales in U$'
            },
            labels: {
                // format: '{value:.2f}%',
                formatter: function(){
                    
                    return (this.value)
                } 
            },
            plotLines: [{
                value: media,
                color: 'rgba(249,0,0,0.4)',
                zIndex: 5,
                width: 1,
                label: {
                    text: 'Média Geral ' +(media),
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }]
        },
        series: [{
            name: 'Sales',
            data: data,
                tooltip: {
                    headerFormat: '<em>Regiões</em><br/>'
            }
        }],
        credits: {
             text: 'Bov BI - Business Intelligence para seu Agronegócio'
         }

    });



});