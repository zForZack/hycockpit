<template>
	<div class="studentTemplate">
		<h4 class="title">学生</h4>
		<!-- 饼图 -->
		<div id="myChart2"></div>
	</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	name: 'student',
	data() {
		return {
			
			items: [],
			names:[],
			totals:[],
			count:0
		};
	},
	created() { // 页面未加载之前执行
		this.getXueshengData();
	},
	methods: {
		getXueshengData() {
			var params = { name: 'xuesheng' };
			httpservice.get(RESULT_URL, params).then(data=>{
				let item = data.list;
				
				for (var i = 0; i < item.length; i++) {
					var data = {name:item[i].NAME,value:item[i].TOTAL};
					this.items.push(data);
					this.names.push(item[i].NAME);
					this.totals.push(item[i].TOTAL);
					this.count += parseInt(item[i].TOTAL);
				}
				this.drawLine();
			});
			
		},
		drawLine() {
			let names=this.names;
			let totals=this.totals;
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById('myChart2'));
			// 绘制图表
			myChart.setOption({
				title: {
					text: '总人数（人）',
					subtext: this.count,
					left: 20,
					textStyle: {
						color: '#FEFEFE',
						fontSize: 18,
						fontWeight: 400
					},
					subtextStyle: {
						color: '#FCFE7C',
						fontSize: 34,
						fontWeight: 'bold'
					},
					textAlign: 'left'
				},
				color: ['#6AB5DF', '#E0BD44', '#53B39F', '#DB6A8B','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c}人 ({d}%)'
				},
				legend: {
					orient: 'vertical',
					bottom: 10,
					left: 'center',
					data: this.items,
					formatter:function(name){  
						var index = 0;
						names.forEach(function(value, i) {
							if (value == name) {
								index = i;
							}
						});
						return name + '          ' + totals[index] + '人';
					 
					} ,
					textStyle: {
						color: '#fff',
						fontSize: 18,
						fontWeight: 400
					},
					itemHight: 15,
					itemWidth: 15,
					itemGap: 27
				},
				series: [
					{
						name: '学生类型',
						type: 'pie',
						radius: '50%',
						center: ['50%', '40%'],
						data: this.items,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						lable: {
							normal: {
								textStyle: {
									fontSize: 18
								}
							}
						}
					}
				]
			});
		}
	}
};
</script>

<style scoped="scoped" lang="less">
.title {
	color: #76ffff;
	font-size: 22px;
	font-weight: bold;
	background: url(../../public/img/headicon.png) no-repeat left center;
	text-align: left;
	padding-left: 30px;
	margin: 23px 16px;
	margin-bottom: 52px;
}
#myChart2 {
	margin: 0 auto;
	width: 300px;
	height: 580px;
}

@width1600-per: 0.8;
@width1366-per: 0.7;
@media screen and (max-width: 1600px) {
	.title {
		font-size: 22px*@width1600-per;
		padding-left: 30px*@width1600-per;
		margin: 23px*@width1600-per 16px*@width1600-per;
		margin-bottom: 52px*@width1600-per;
	}
	#myChart2 {
		width: 300px*@width1600-per;
		height: 580px*@width1600-per;
	}
}
@media screen and (max-width: 1366px) {
	.title {
		font-size: 22px*@width1366-per;
		padding-left: 30px*@width1366-per;
		margin: 23px*@width1366-per 16px*@width1366-per;
		margin-bottom: 52px*@width1366-per;
	}
	#myChart2 {
		width: 300px*@width1366-per;
		height: 580px*@width1366-per;
	}
}
</style>
