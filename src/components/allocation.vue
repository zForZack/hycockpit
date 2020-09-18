<template>
	<div class="allocationTemplate">
		<h4 class="title">数据核查配置比率</h4>
		<!-- 饼图 -->
		<div id="allocationChart"></div>
	</div>
</template>

<script>
	import echarts from 'echarts/lib/echarts'
	import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return {
				allocationData:[],
				wh_name:'good'
			}
		},
		created() {
			this.getAllocationData();
		},
		methods: {
			getAllocationData() {
				var params = { name: 'data_allocation_ratio' };
				httpservice.get(RESULT_URL, params).then(data=>{
					let item=data.list;
					for(var i=0;i<item.length;i++){
						var eleData={name:item[i].NAME,value:item[i].TOTAL};
						this.allocationData.push(eleData);
					}
					this.drawLine();
				});
			},
			drawLine() {
				let allocationChart = this.$echarts.init(document.getElementById('allocationChart'));
				allocationChart.setOption({
					title: {},
					color: ['#2180ff','#9a7cfe','#6AB5DF', '#E0BD44', '#53B39F', '#DB6A8B','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
					tooltip: {
						trigger: 'item',
						formatter: "{b} : {c} ({d}%)"
					},
					legend: {
						bottom: '5%',
						textStyle: {
							color: '#fff',
							fontSize: 18
						},
						orient: 'vertical'
					},
					series: [{
						name: '数据核查配置比率',
						type: 'pie',
						radius: '50%',
						center: ['50%', '40%'],
						data: this.allocationData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				})
			}
		}
		
	}
</script>

<style lang="less">
	#allocationChart{
		width: 300px;
		height: 300px;
	}
</style>
