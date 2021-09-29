var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Estado"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Quantidade Abates"
    }],
    "resultset": [
        ["APAC", 12878 ],
        ["EMEA", 49578 ],
        ["Japan", 4923],
        ["NA", 37952]
        ]

};

var categories = [];
var series = [];
var data = [];
var percent = 0;

$.each(result.resultset, function( index, value ) {
    categories.push(value[0]);
    data.push({y:value[1]}); 
    percent+=value[1];
}); 

$(function () {
    Highcharts.chart('container', {
            chart: {
                type: 'column',
                height: 350,
                events: {
                    click: function (result) {
                        //Set drill operations in this property
                    }
                }
            },
            title: {
                text: 'Quantity by territory'
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'Quantity'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                 
                    events: {
                    click: function (result) {
                        }
                    }
                },
                column: {
                    dataLabels: {
                        enabled: false, 
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
                    point: {
                        events: {
                            click: function () {
                                console.log('Drilldown');
                               
                                $("#modal-div-id").modal('show');
                                $('#modal-div-id').on('shown.bs.modal', function() {
                                    Dashboards.fireChange('PARAMETER_DRILL_DOWN', '[DIMENSION].[MEMBER]');   
                                });
                               
                            }
                        }
                    }
                }
            },
            
            tooltip: {
                headerFormat: '<span style="font-size:11px">Territory:</span> {point.x}<br>',
                pointFormat: '<span>Quantity:</span> <b>{point.y}</b>'
            },
        
            series: [{
                name: 'Marca',
                data: data
            }],
            credits: {
                text: 'Bov BI - Business Intelligence para seu Agronegócio'
            }
        

     })

});

    


