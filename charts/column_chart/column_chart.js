var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Territory"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Quantity"
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
                text: 'Quantity of Sales by Territory'
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'Quantity of Sales'
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
                }
            },
            
            tooltip: {
                headerFormat: '<span style="font-size:11px">Territory:</span> {point.x}<br>',
                pointFormat: '<span>Quantity of Sales :</span> <b>{point.y:.0f}</b>'
            },
        
            series: [{
                name: 'Territory',
                data: data
            }],
            credits: {
                text: 'Bov BI - Business Intelligence para seu Agronegócio'
            }
        

     })

});

    


