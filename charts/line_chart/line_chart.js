var result = {
     "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Total"
    } , {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Total"
    }],
    "resultset": [
        ["APAC", 12878],
        ["EMEA", 49578 ],
        ["Japan", 4923 ],
        ["NA", 37952 ]
    ]
};


var series = [];
var categories = [];

for(var i = 1; i<result.metadata.length; i++){
    var serieName = result.metadata[i].colName.split('/')[0];
    var cor = result.metadata[i].colName.split('/')[1];
    
    var modelSerie =  {
        name: serieName,
        data: [],
        color: cor,
    };
    
    series.push(modelSerie);
    
};

$.each(result.resultset, function( index, value ) {
    var mes = value[0];
    categories.push(mes);
    
    for(var i=1; i<value.length; i++){
        var quantidade = value[i];
        series[i-1].data.push(quantidade);
    }
    
});
    
$(function () {

    Highcharts.chart('container', {

        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                reversedStacks: true,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                },
            },
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y ;
                    }
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            //Set drill operations in this property
                        }
                    }
                }
            }
             
        },
        chart: {
            type: 'line',
            height: 400,
            zoomType: 'xy'
        },
        title: {
            text: 'Qunatity by territory',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: categories,
            
        },
        yAxis: {
            title: {
                text: 'Quantity'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
               
                return '<b>'+ this.x +'</b>: ' +this.y  ;
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            hozizontal: 'bottom',
            borderWidth: 0
        },
        series: series,
        credits: {
             text: 'Bov BI - Business Intelligence para seu Agroneg??cio'
         }

     })

});


