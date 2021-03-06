var result = {
     "metadata": [{
        "colIndex": 0,
        "colType": "String",
        "colName": "Estado"
    },{
        "colIndex": 1,
        "colType": "String",
        "colName": "Quantidade"
    }],
    "resultset": [
        ["Alagoas", 32],
        ["Bahia", 21 ],
        ["Espírito Santo", 18 ],
        ["Goiás",  23],
        ["Maranhão", 42 ],
        ["Mato Grosso do Sul", 41 ],
        ["Pará",  39],
        ["Paraná",  17],
        ["Rio Grande do Sul", 35 ],
        ["Rondônia",  44],
        ["Santa Catarina", 26 ],
        ["Tocantins", 13 ]
    ]
};

var data = [];
var model = {};
var min =  Number.POSITIVE_INFINITY;
var max =  Number.NEGATIVE_INFINITY;;
var interval = 0;
    
var soma = 0;
$.each(result.resultset, function( index, value ) {
    soma += value[1];
    
});


 
$.each(result.resultset, function( index, value ) {
    
    var percent = (100*value[1]) / soma;
    var quantidade = value[1];
    
    if(percent > max){
        max = percent;
    }
    
    if(percent < min){
        min = percent;
    }

    
    if(result.resultset[index][0] === "Acre"){
        model = {
            "hc-key": "br-ac",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Alagoas"){
        model = {
            "hc-key": "br-al",
            "value": percent,
            quantidade : quantidade
        };

       
        
    } else if(result.resultset[index][0] === "Amapá"){
        model = {
            "hc-key": "br-ap",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Amazonas"){
        model = {
            "hc-key": "br-am",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Bahia"){
        model = {
            "hc-key": "br-ba",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Ceará"){
        model = {
            "hc-key": "br-ce",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Espírito Santo"){
        model = {
            "hc-key": "br-es",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Goiás"){
        model = {
            "hc-key": "br-go",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Maranhão"){
        model = {
            "hc-key": "br-ma",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Mato Grosso"){
        model = {
            "hc-key": "br-mt",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Mato Grosso do Sul"){
        model = {
            "hc-key": "br-ms",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Minas Gerais"){
        model = {
            "hc-key": "br-mg",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Pará"){
        model = {
            "hc-key": "br-pa",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Paraíba"){
        model = {
            "hc-key": "br-pb",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Paraná"){
        model = {
            "hc-key": "br-pr",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Pernambuco"){
        model = {
            "hc-key": "br-pe",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Piauí"){
        model = {
            "hc-key": "br-pi",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Rio de Janeiro"){
        model = {
            "hc-key": "br-rj",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Rio Grande do Norte"){
        model = {
            "hc-key": "br-rn",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Rio Grande do Sul"){
        model = {
            "hc-key": "br-rs",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Rondônia"){
        model = {
            "hc-key": "br-ro",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Roraima"){
        model = {
            "hc-key": "br-rr",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Santa Catarina"){
        model = {
            "hc-key": "br-sc",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "São Paulo"){
        model = {
            "hc-key": "br-sp",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Sergipe"){
        model = {
            "hc-key": "br-se",
            "value": percent,
            quantidade : quantidade
        };
        
    } else if(result.resultset[index][0] === "Tocantins"){
        model = {
            "hc-key": "br-to",
            "value": percent,
            quantidade : quantidade
        }; 

    } else if(result.resultset[index][0] === "Distrito Federal"){
        model = {
            "hc-key": "br-df",
            "value": percent,
            quantidade : quantidade
        }; 

    }

    data.push(model);
    
});

interval = Math.round((max-min) / 3);

$(function () {
    Highcharts.mapChart('container', {

         chart: {
            height: 350
        },
        title : {
            text : 'Percentual de cotações realizadas por fabricante e estado'
        },
        subtitle : {
            text : 'Quantidade de abate por estado em milhares'
        },
        tooltip: {
                formatter: function () {
                    return '<b>Estado: </b>' +(this.key)+ ' <br>' +
                            '<b>Qtde. citações:</b> ' + (this.point.quantidade)+ ' <br>' +
                            '<b>Percentual de citações:</b> ' + Highcharts.numberFormat(this.point.value)
                },
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: min,
            max: max,
            type: 'linear',
            minColor: '#9ecae1',
            maxColor: '#08306b',
            tickInterval: interval
        },
        series : [{
            data : data,
            mapData: Highcharts.maps['countries/br/br-all'],
            joinBy: 'hc-key',
            name: 'Preço:',
            states: {
                hover: {
                    color: '#9ca7ba'
                }
            },
            
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
        }]

     });

    

}) ;
        
      

    
