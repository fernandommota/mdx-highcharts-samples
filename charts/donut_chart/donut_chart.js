var result = {
     "metadata": [{
        "colIndex": 0,
        "colType": "String",
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

$.each(result.resultset, function( index, value ) {
    serieName = value[0];
    valor = value[1];
    
        var data =  {
        name: serieName,
        y: valor
    };
    
    series.push(data);

});


$(function () {
    Highcharts.chart('container', {

        tooltip: {
                pointFormat: '{series.name} <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    showInLegend: true,
                    size: "100%",
                    dataLabels: {
                        distance: 10,
                        enabled: true,
                                format: ' {point.percentage:.1f} % ',
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
            type: 'pie'
        },
        title: {
            text: 'Resume quantity by territory',
            x: -20 //center
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            hozizontal: 'bottom',
            borderWidth: 0
        },
         series: [{
                name:  ' ',
                innerSize: '50%', //
                colorByPoint: true,
                data: series
         }],
         credits: {
             text: 'Bov BI - Business Intelligence para seu Agronegócio'
         }

    });

 });