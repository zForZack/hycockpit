<template>
	<div class="monthly-data-template">
		<h4 class="title">每月数据增量/来源</h4>
		<!-- 每月数据图表 -->
		<div id="monthlyDataChart"></div>
	</div>
	
</template>

<script>
	import echarts from 'echarts/lib/echarts'
	import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return{
				systems:[],
				personNumbers:[],
				monthlyDataIncrementList:[]
			}
		},
		created() {
			this.getMonthlyDataIncrementData();
		},
		methods: {
			getMonthlyDataIncrementData() {
				var params = { name: 'monthly_data_increment' };
				httpservice.get(RESULT_URL, params).then(data=>{
					let item=data.list;
					for(var i=0;i<item.length;i++){
						this.systems.push(item[i].NAME);
						this.personNumbers.push(item[i].TOTAL);
					}
					this.drawLine();
				});
			},
			drawLine() {
				let monthlyDataChart = this.$echarts.init(document.getElementById('monthlyDataChart'));
				monthlyDataChart.setOption({
					title: {},
					grid: {
						left: '17%',
						right: '3%',
						top: '3%'
					},
					tooltip: {},
					xAxis: {
						data: this.systems,
						splitLine: {
							show: false,
							lineStyle: {
								color: ['#315070'],
								width: 1,
								type: 'solid'
							}
						},
						axisLine: {
							lineStyle: 'none',
							show: false
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 11
							}
						}
					},
					yAxis: {
						splitLine: {
							show: true,
							lineStyle: {
								color: ['rgba(30,54,201,0.7)'],
								height: 1,
								type: 'solid'
							}
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							margin: 15,
							textStyle: {
								fontSize: 12
							}
						}
					},
					series: [
						{
							name: '人数',
							type: 'bar',
							data: this.personNumbers,
							barWidth: 16,
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#76FFFF' }, { offset: 1, color: '#9977FC' }])
								}
							}
						}
					],
					textStyle: {
						color: 'rgba(176,200,255,1)',
						fontSize: 20
					}
				});
			}
		}
	}
</script>

<style>
	#monthlyDataChart{
		width: 310px;
		height: 350px;
	}
</style>
