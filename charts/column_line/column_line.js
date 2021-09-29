var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Territory"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "2003"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "2004"
    }, {
        "colIndex": 3,
        "colType": "Numeric",
        "colName": "2005"
    }],
    "resultset": [
        ["APAC", 3528  , 5938 , 3411 ],
        ["EMEA", 16711 , 23630 , 9237 ],
        ["Japan", 2851 , 1692 , 380],
        ["NA", 13348 , 18157 , 6447 ]
        ]

};
    
var obj = this;
var series = [];
var categories = [];
var avgArray = [];
    
var serie = {
    name : 'Quantity',
    data : []
};

$.each(result.resultset, function( index, value ) {
    var soma=0;
    var countSoma=0;
    var ano = value[0];
    categories.push(ano);
    
    $.each(value, function( i, v ) {
        if(i>0 && v > 0){
            soma += v;
            countSoma++;
        }
    });
    
    avgArray.push(soma / countSoma);
});

drillDataLen = result.resultset[0].length;
for(var columnIdx=1; columnIdx< result.resultset[0].length; columnIdx++){
    var serieName = result.metadata[columnIdx].colName.split('/')[0];
    brightness = 0.2 - (columnIdx / drillDataLen) ;
    var serie = {
        name : serieName,
        data: [],
        color:  Highcharts.Color("#90ed7d").brighten(brightness).get()     
    };
    
    $.each(result.resultset, function( i, v ) {
        serie.data.push(v[columnIdx]);
    });
    
    series.push(serie);
};

//push avg values
var serie = {
    name : 'Median',
    type:'line',
    data: avgArray,
    color:'#000'
};
series.push(serie);


$(function () {

    Highcharts.chart('container', {

        chart: {
            type: 'column',
            height: 400,
            zoomType: 'xy'
        },
        title: {
            text: 'Comparative quantity per territory by year'
        },
        subtitle: {
            enabled: false
        },
        xAxis: {
            categories: categories,
            labels: {
                enabled: true,
                align: 'right'
            }
        },
        yAxis: {
            title: {
                enabled: true,
                text: ''
            },
            labels: {
                enabled: true,
                formatter: function () {
                    return this.value;
                }
            }
        },
        legend: {
            enabled : true
        },
        exporting: {
            chartOptions: {
                credits: {
                    enabled: true,
                    text: 'Samples'
                }
            }
        },
        credits : {
            enabled: false 
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<b>' +this.x +'</b><br/>'+
                this.series.name+ ': <b>'+this.y+'</b><br/>';
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    color : '#000',
                    formatter: function () {
                        //console.log(this);
                        return this.y;
                    },
                    style:{
                        fontSize:11,
                        fontWeight: 'bolder'
                    }
                }
            },
            column: {
                dataLabels: {
                    enabled: false, // pedido Klauss
                    color: '#000',
                    style: {
                        //fontSize:11,
                        fontWeight: 'bolder'
                    },
                    formatter: function() {return this.y;},
                    inside: true,
                    rotation: 270
                },
                pointPadding: 0.1,
                groupPadding: 0.1,
            }
        },
        series: series
    });



});