////测试externals
import _ from 'lodash';
import $ from 'jquery';
import echarts from 'echarts';

//测试css抽取和图片路径
import './assets/style/index.css'; // css-loader style-loader
import './assets/style/demo.less'; // css-loader style-loader

//测试tree-shaking 不生效TODO
import './assets/js/show';
import './assets/js/log';

//测试SplitChunksPlugin
import "./assets/js/three_demo"


// window.onload = function () {
//   init('three')
// };

////测试webpack.IgnorePlugin
// import moment from 'moment'
// //手动引入所需要的语言包 
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
// let time = moment().endOf('day').fromNow();
// console.log(time);

// console.log($)

let message = _.join(['Node', 'js', 'tiger']);
$('#message').html(message);

var myChart = echarts.init(document.getElementById('demoChart'));
// 指定图表的配置项和数据
var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

