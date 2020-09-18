<template>
	<div class="healthDataTemplate">
		<h4 class="title">数据健康状态</h4>
		<div class="accuracyRate">总准确率 <span>{{totalAccuracy}}</span>%</div>
		<div id="healthDataChart"></div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			totalAccuracy:'',
			correctness:[],
			summation:[]
		};
	},
	created() {
		this.getTotalAccuracy();
		this.getCorrectness();	
	},
	methods: {
		getTotalAccuracy() {
			var params = { name: 'data_health_total_accuracy' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.totalAccuracy = data.list[0].TOTAL;
			});
		},
		getCorrectness() {
			var params={ name: 'data_health_correct' };
			httpservice.get(RESULT_URL, params).then(data=>{
				let correctItem=data.list[0];
				var correctArray=new Array();
				correctArray.push(parseFloat(correctItem.UNIQUENESS));
				correctArray.push(parseFloat(correctItem.UNIFORMITY));
				correctArray.push(parseFloat(correctItem.INTERGRITY));
				correctArray.push(parseFloat(correctItem.ACCURACY));
				this.correctness=correctArray;
				this.getSummation();
			});
		},
		getSummation() {
			var params={ name: 'data_health_summation' };
			httpservice.get(RESULT_URL, params).then(data=>{
				let sumationItem=data.list[0];
				var sumationArray=new Array();
				sumationArray.push(parseFloat(sumationItem.UNIQUENESS));
				sumationArray.push(parseFloat(sumationItem.UNIFORMITY));
				sumationArray.push(parseFloat(sumationItem.INTERGRITY));
				sumationArray.push(parseFloat(sumationItem.ACCURACY));
				this.summation=sumationArray;
				this.drawLine();
			});
		},
		drawLine() {
			let healthDataChart = this.$echarts.init(document.getElementById('healthDataChart'));
			healthDataChart.setOption({
				title: {
					text: ''
				},
				color: ['#5cff95', '#0059ff', '#53B39F', '#DB6A8B','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				tooltip: {},
				legend: {
					data: ['正确', '总量'],
					bottom: '2%',
					textStyle: {
						color: '#fff'
					}
				},
				radar: {
					// shape: 'circle',
					name: {
						textStyle: {
							color: '#fff'
						}
					},
					center: ['50%', '50%'],
					radius: '60%',
					indicator: [{ name: '唯一性', max: 100 }, { name: '一致性', max: 100 }, { name: '完整性', max: 100 }, { name: '准确性', max: 100 }],
					textStyle: {
						color: '#fff',
						fontSize: 16
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(56,92,248,1)',
							type: 'dotted'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(56,92,248,1)',
							type: 'dotted'
						}
					},
					splitArea: {
						show: false
					}
				},
				series: [
					{
						name: '预算 vs 开销（Budget vs spending）',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [
							{
								value: this.correctness,
								name: '正确',
								areaStyle: {
									color: 'rgba(132,255,228,0.5)'
								},
								lineStyle: {
									color: 'rgba(132,255,228,1)',
									width: 1
								},
								symbol: 'circle'
							},
							{
								value: this.summation,
								name: '总量',
								areaStyle: {
									color: 'rgba(0,111,255,0.5)'
								},
								lineStyle: {
									color: 'rgba(0,111,255,1)',
									width: 1
								},
								symbol: 'circle'
							}
						]
					}
				]
			});
		}
	}
};
</script>

<style lang="less">
#healthDataChart {
	width: 300px;
	height: 290px;
	margin: 0 auto;
}
.accuracyRate{
	color: #fff;
	font-size: 18px;
	span{
		font-size: 30px;
		color: #FCFE7C;
		font-weight: bold;
	}
}
</style>
