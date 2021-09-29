var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Mês"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "2003"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "2004"
    }, {
        "colIndex": 4,
        "colType": "Numeric",
        "colName": "2005"
    }],
    "resultset": [
        ["APAC", 3529 , 5938 , 3411 ],
        ["EMEA", 16711 , 23630 , 9237],
        ["Japan", 2851 , 1692 , 380],
        ["NA", 13348 , 18157 , 6447]
        ]

};


var series = [];
var categories = []
    
for(var i = 1; i<result.metadata.length; i++){
    var serieName = result.metadata[i].colName;
    
    var modelSerie =  {
        name: serieName,
        data: []
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
                reversedStacks: false,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                },
             dataLabels: {
                enabled: true,
                style: {
                    fontSize: '10' 
                },
             },
            },
            series: {
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
            type: 'area'
        },
        title: {
            text: 'Sales per country by year',
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
            formatter: function(){
                return  this.x+ '<br>' +
                        '<b>'+this.series.name+ '</b> : ' +this.y+ '<br>' +
                        ''
            } 
        },
        /*tooltip: {
            valueSuffix: ''
        },*/
        legend: {
            layout: 'horizontal',
            align: 'center',
            hozizontal: 'bottom',
            borderWidth: 0
        },
        series: series,
        credits: {
            text: 'Bov BI - Business Intelligence para seu Agronegócio'
        }

    })



})