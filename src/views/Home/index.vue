<template>
    <div>
        <h2>首页</h2>
        <div>
            <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
            <div id="main" style="width: 600px;height:400px;background: whitesmoke"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        mounted() {
            this.bar()
        },
        methods:{
            bar(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量']
                    },
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            data: [5, 20, 36, 10, 10, 20]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            line(){}
        }
    }
</script>

<style scoped>

</style>