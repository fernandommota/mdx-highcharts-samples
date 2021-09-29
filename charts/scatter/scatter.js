var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Territory"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Sales"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "Quantity"
    }, {
        "colIndex": 3,
        "colType": "Numeric",
        "colName": "Median"
    }],
    "resultset": [
        ["APAC", 878    ],
        ["EMEA", 578    ],
        ["Japan", 293    ],
        ["NA", 795  ]
        ]

};

var series = [];
var categories = [];
var media = 0 ;
var soma = 0 ;

$.each(result.resultset, function(index, value){
    soma += value[1] ;
});

media = Highcharts.numberFormat( soma / result.resultset.length );

var seriePrecoMedio = {
    name: "Sales",
    colorByPoint :  true,
    data: []
};

$.each(result.resultset, function(index, value){
    
    categories.push(value[0]);
    
    seriePrecoMedio.data.push({
        x: index,
        category: value[0],
        valor: value[1],
        valorFormatted: (value[1]),
        indice: Highcharts.numberFormat((100 * value[1]) / media) ,
        indiceFormatted: Highcharts.numberFormat( ( value[1] / media) - 1 ) ,
        y: value[1]
    })
    
})
series.push(seriePrecoMedio);

$(function () {

    Highcharts.chart('container', {

        chart: {
            type: 'scatter',
            height: 384,
            zoomType: 'xy'
        },
        title: {
            text: 'Compartive Sales'
        },
        legend: {
            	enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
    
                tooltip: {
                  headerFormat: '<b></b>',
                  pointFormat: 
                  	'<b>{point.category}</b><br/>'+
                    '{series.name}: {point.valorFormatted}<br/>'+
                    'Median: {point.indiceFormatted}<br/>'
                }
            }
        },
        yAxis: {
            labels: {
                formatter: function(){
                    return (this.value)
                } 
            },
            title: {
                text: 'Sales'
            },
            plotLines: [{
            	label: {
                    text: 'Sales Median: '+(media),
                    align: 'right',
                    x: -10,
                    y: 15,
                    zIndex: 1000000000
              },
              align: 'right', // Positioning of the label. 
              color: 'red', // Color value
              dashStyle: 'longdashdot', // Style of the plot line. Default to solid
              //( (100 * 23.45) / 23.45 )
              value: media, // Value of where the line will appear
              width: 2 // Width of the line    
            }]
        },
        xAxis: {
        		title: {
                enabled: true,
                text: 'Territory'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            categories: categories
        },
        series: series,
        credits: {
             text: 'Bov BI - Business Intelligence para seu Agronegócio'
         }

    });

})


