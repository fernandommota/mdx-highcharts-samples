var result = {
    "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Order Status"
    }, {
        "colIndex": 1,
        "colType": "Country",
        "colName": "Centro"
    }, {
        "colIndex": 2,
        "colType": "Numeric",
        "colName": "Quantity"
    }, {
        "colIndex": 3,
        "colType": "Numeric",
        "colName": "Sales"
    }],
    "resultset": [
        ["Cancelled", "New Zeland", 596, 67840],
        ["Cancelled", "Spain", 605, 50011],
        ["Cancelled", "Sweden", 550, 48711],
        ["Cancelled", "UK", 429, 50408],
        ["Cancelled", "USA", 454, 45358],
        ["Resolved", "Austria", 288, 28551],
        ["Resolved", "Denmark", 253, 24079],
        ["Resolved", "Spain", 650, 53816],
        ["Resolved", "USA", 469, 44273]
    ]
};

var categorias = [] ;
var categoriesReceita = [];
var categoriesDespesa = [];
var dataReceita = [];
var dataDespesa = [];

var despesa = {
        inner: '',
        grandTotal: 0,
        percent: 0
} ;

var receita = {
        inner: '',
        grandTotal: 0,
        percent: 0
} ;

$.each(result.resultset, function(index, value){
    if(value[0] === 'Cancelled'){
        
        despesa.inner = value[0] ;
        categoriesDespesa.push(value[1]);
        dataDespesa.push(value[2]);
            
        despesa.grandTotal  = despesa.grandTotal + value[2];
        
        
    } else if(value[0] === 'Resolved'){
    
        receita.inner = value[0];
        categoriesReceita.push(value[1]);
        dataReceita.push(value[2]);
        
        receita.grandTotal = receita.grandTotal + value[2] ;
        
    }
}); 

categorias.push(receita.inner);
categorias.push(despesa.inner);  

var colors = Highcharts.getOptions().colors,
    categories = categorias,
    data = [{
        y: receita.grandTotal,
        color: colors[2],
        drilldown: {
            categories: categoriesReceita,
            data: dataReceita,
            color: colors[2],
        }
    }, {
        y: despesa.grandTotal,
        color: colors[8],
        drilldown: {
            categories: categoriesDespesa,
            data:  dataDespesa,
            color: colors[8]
        }
    
    }],
    
    browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;

// Build the data arrays
for (i = 0; i < dataLen; i += 1) {
    
            // add browser data
        browserData.push({
        name: categories[i],
        y: Math.abs(data[i].y),
        value: data[i].y,
        color: data[i].color
        });
    

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) ;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: Math.abs(data[i].drilldown.data[j]),
            value: data[i].drilldown.data[j],
            color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
    }
}


$(function () {
    Highcharts.chart('container', {

        chart: {
            type: 'pie'
        },
        title: {
            text: 'Analisys'
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                dataLabels: {
                    distance: 20
                },
            },
            
        },
        legend: {
            layout: 'horizontol',
            align: 'center',
            borderWidth: 0
        },
        series: [{
            
            name: '',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -40
            }
        }, {
            name: '' ,
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ?  this.point.name + ' <br> '  : null;
                }
            }
        }]

    });

 });