var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Territory"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Quantity"
    }, {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "Sales"
    }],
    "resultset": [
        ["APAC", 12878 , 22456 ],
        ["EMEA", 49578 , 29952 ],
        ["Japan", 4923 , 6365],
        ["NA", 37952 , 23458]
        ]

};


var categories = [];
var series = [];
var data = [];
var percent = 0 ;
var COLORS = ["#4682B4" , "#CD5C5C"]

$.each(result.metadata, function( index, value ) {

    if(value.colType === 'Integer' || value.colType === 'Numeric'){
        series.push({
            data:[],
            name:value.colName,
            color:value.colName
        }); 
    }
    
});

$.each(result.resultset, function( index, value ) {
        
    categories.push(value[0]);
    
    value.splice(0,1); 
    
        
    $.each(value , function( i, v ) {
        series[i].color = COLORS[i];
        series[i].data.push(v); 
        percent += v ;
    });  
    
});


$(function () {

    Highcharts.chart('container', {

        chart: {
            type: 'bar',
            height: 350
        },
        title: {
            text: 'Quantity and Sales by Territory'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Quantity Sales'
            },
            min: 0,
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'grey'
                }
            }
        },
        legend: {
            enabled: false  
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            bar: {
                stacking: 'normal',
                /*dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
                    formatter:function() {
                        var pcnt = (this.y / percent) * 100;
                        return Highcharts.numberFormat(pcnt) + '%';
                    },
                } */ //Enable this function to show datalabels in percentage
            }
        },
        series: series,
        credits: {
             text: 'Bov BI - Business Intelligence para seu Agronegócio'
        }

    })

});

    


