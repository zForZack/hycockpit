<template>
	<div class="personnelTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<!-- <moudlefooter class="moudlefooter"></moudlefooter> -->
		<!-- 条形图 -->
		<div id="personnelChart"></div>
	</div>
</template>

<script>
	import moudleheader from './components/moudleHeader'
	import moudlefooter from './components/moudleFooter'
	import echarts from 'echarts/lib/echarts'
	import httpservice from 'common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from 'common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return {
				personnelData:[],
				wh_name:'good',
				title:'人才培养'
			}
		},
		components:{
			moudleheader,
			moudlefooter
		},
		created() {
			this.getPersonnelData();
		},
		methods: {
			getPersonnelData() {
				var params = { name: 'data_personnel_ratio' };
				httpservice.get(RESULT_URL, params).then(data=>{
					let item=data.list;
					for(var i=0;i<item.length;i++){
						var eleData={name:item[i].NAME,value:item[i].TOTAL};
						this.personnelData.push(eleData);
					}
					this.drawLine();
				});
			},
			drawLine() {
				let personnelChart = this.$echarts.init(document.getElementById('personnelChart'));
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
						name: '招生情况',
						type: 'pie',
						radius: '50%',
						center: ['50%', '40%'],
						data: this.personnelData,
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
	#personnelChart{
		width: 284px;
		height: 300px;
	}
	.moudlefooter{
		position: absolute;
		bottom: -20px;
	}
</style>
