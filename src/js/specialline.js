/**
 * Created by Administrator on 2016/12/16.
 */
(function($, owner) {
    var chart = echarts.init(document.getElementById('map'));
    var geoCoordMap = {
        '法兰克福':[14.32,52.2],
        '巴黎':[2.20,47],
        '成都': [103.9526,30.7617],
        '深圳':[114.13,22.39],
        '阿姆斯特丹':[4.52,52.21],
        '柏林':[13.3,52.3],
        '罗马':[12.3,41.5],
        '伦敦':[0.1,51.3],
    };

    var FrankfurtData = [
        [{name:'深圳',value:100},{name:'法兰克福',value:15}]
    ];

    var ParisData = [
        [{name:'深圳',value:100},{name:'巴黎',value:30}]
    ];
    var AmsterdamData = [
        [{name:'深圳',value:100},{name:'阿姆斯特丹',value:100}]
    ];
    var LondonData = [
        [{name:'深圳',value:100},{name:'伦敦',value:50}]
    ];
    var BerlinData = [
        [{name:'深圳'},{name:'柏林',value:15}]
    ];
    var RomeData = [
        [{name:'深圳'},{name:'罗马',value:15}]
    ];

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };
    var color = ['yellow', 'yellow', 'yellow','yellow'];
    var series = [];
    [
        ['深圳-法兰克福', FrankfurtData], ['深圳-阿姆斯特丹',AmsterdamData],
        ['深圳-伦敦',LondonData],['深圳-巴黎',ParisData]

    ].forEach(function (item, i) {
        series.push({
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period:1,
                    trailLength: 0.6,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: -0.1
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'lines',
                zlevel: 3,
                effect: {
                    show: true,
                    period: 1,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 18
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: -0.1
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label:{},
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
    });
    option = {
        backgroundColor: '#1870b8',
        tooltip : {
            trigger: 'item'
        },
        geo: {
            map: 'world',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#269fd6',
                    borderColor: '#0f6dab'
                },
                emphasis: {
                    areaColor: '#0f6dab'
                }
            }
        },
        series: series
    };
    //JSON
    $.getJSON('../static/lib/world.json', function (data) {
        echarts.registerMap('world', data);
        chart.setOption(option);
    });
})($);