<template>
	<div>
		<h4 class="title">科研经费</h4>
		<div>
			<el-carousel indicator-position="outside" arrow="never">
				<el-carousel-item>
					<div><div id="patentNumber"></div></div>
				</el-carousel-item>
				<el-carousel-item>
					<div><div id="patentNumber2"></div></div>
				</el-carousel-item>
				<el-carousel-item>
					<div><div id="patentNumber3"></div></div>
				</el-carousel-item>
				<el-carousel-item>
					<div><div id="patentNumber4"></div></div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			items1: [],
			names1:[],
			totals1:[],
			items2: [],
			names2:[],
			totals2:[],
			items3: [],
			names3:[],
			totals3:[],
			items4: [],
			names4:[],
			totals4:[]
		};
	},
	created() { // 页面未加载之前执行
		this.getKeyanData();
	},
	methods: {
		getKeyanData() {
			var params1 = { name: 'keyanjingfei' };
			httpservice.get(RESULT_URL, params1).then(data=>{
				this.items1 = data.list;
				for (var i = 0; i < this.items1.length; i++) {
					this.names1.push(this.items1[i].NAME);
					this.totals1.push(this.items1[i].TOTAL);
				}
				this.drawLine1();
			});
			
			var params2 = { name: 'keyanxiangmu' };
			httpservice.get(RESULT_URL, params2).then(data=>{
				this.items2 = data.list;
				for (var i = 0; i < this.items2.length; i++) {
					this.names2.push(this.items2[i].NAME);
					this.totals2.push(this.items2[i].TOTAL);
				}
				this.drawLine2();
			});
			
			var params3 = { name: 'keyanchengguo' };
			httpservice.get(RESULT_URL, params3).then(data=>{
				this.items3 = data.list;
				for (var i = 0; i < this.items3.length; i++) {
					this.names3.push(this.items3[i].NAME);
					this.totals3.push(this.items3[i].TOTAL);
				}
				this.drawLine3();
			});
			
			var params4 = { name: 'keyanzhuanli' };
			httpservice.get(RESULT_URL, params4).then(data=>{
				this.items4 = data.list;
				for (var i = 0; i < this.items4.length; i++) {
					this.names4.push(this.items4[i].NAME);
					this.totals4.push(this.items4[i].TOTAL);
				}
				this.drawLine4();
			});
			
		},
		
		
		drawLine1() {
			// 基于准备好的dom，初始化echarts实例
			let myChart1 = this.$echarts.init(document.getElementById('patentNumber'));
			
			// 绘制图表
			myChart1.setOption({
				title:{
					text: '近五年科研经费变化情况（单位:万元）',
					textStyle: {
						color: '#fff',
						fontSize: 18,
						fontWeight: 400
					},
					left: 20
				},
				grid: {
					left: '10%',
					right: '4%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.names1,
					axisLine: {
						show: false
					},
					axisLabel: {
						margin: 15,
						textStyle: {
							fontSize: 18
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(30,54,201,0.7)'],
							height: 1,
							type: 'solid'
						}
					},
					axisLabel: {
						margin: 20,
						textStyle: {
							fontSize: 18
						}
					}
				},
				series: [
					{
						data: this.totals1,
						type: 'line',
						borderType: 'solid',
						smooth: true,
						aymbolSize: 8,
						areaStyle: {},
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: '#00F2FE'  //0%处的颜色
								},{
									offset: 1, color: '#0025B3' //100%处的颜色
								}]
							}
						},
						lineStyle: {
							color: '#00F2FE'
						}
					}
				],
				textStyle: {
					color: '#B0C8FF',
					fontSize: 18
				}
			});
		},
		drawLine2(){
			let myChart2 = this.$echarts.init(document.getElementById('patentNumber2'));
			myChart2.setOption({
				title:{
					text: '近五年科研项目变化情况（单位:个）',
					textStyle: {
						color: '#fff',
						fontSize: 18,
						fontWeight: 400
					},
					left: 20
				},
				grid: {
					left: '10%',
					right: '4%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.names2,
					axisLine: {
						show: false
					},
					axisLabel: {
						margin: 15,
						textStyle: {
							fontSize: 18
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(30,54,201,0.7)'],
							height: 1,
							type: 'solid'
						}
					},
					axisLabel: {
						margin: 20,
						textStyle: {
							fontSize: 18
						}
					}
				},
				series: [
					{
						data: this.totals2,
						type: 'line',
						borderType: 'solid',
						smooth: true,
						aymbolSize: 8,
						areaStyle: {},
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: '#00F2FE'  //0%处的颜色
								},{
									offset: 1, color: '#0025B3' //100%处的颜色
								}]
							}
						},
						lineStyle: {
							color: '#00F2FE'
						}
					}
				],
				textStyle: {
					color: '#B0C8FF',
					fontSize: 18
				}
			});
		},
		drawLine3(){
			let myChart3 = this.$echarts.init(document.getElementById('patentNumber3'));
			myChart3.setOption({
				title:{
					text: '近五年科研成果变化情况（单位:项）',
					textStyle: {
						color: '#fff',
						fontSize: 18,
						fontWeight: 400
					},
					left: 20
				},
				grid: {
					left: '10%',
					right: '4%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.names3,
					axisLine: {
						show: false
					},
					axisLabel: {
						margin: 15,
						textStyle: {
							fontSize: 18
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(30,54,201,0.7)'],
							height: 1,
							type: 'solid'
						}
					},
					axisLabel: {
						margin: 20,
						textStyle: {
							fontSize: 18
						}
					}
				},
				series: [
					{
						data: this.totals3,
						type: 'line',
						borderType: 'solid',
						smooth: true,
						aymbolSize: 8,
						areaStyle: {},
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: '#00F2FE'  //0%处的颜色
								},{
									offset: 1, color: '#0025B3' //100%处的颜色
								}]
							}
						},
						lineStyle: {
							color: '#00F2FE'
						}
					}
				],
				textStyle: {
					color: '#B0C8FF',
					fontSize: 18
				}
			});
		},
		drawLine4(){
			let myChart4 = this.$echarts.init(document.getElementById('patentNumber4'));
			myChart4.setOption({
				title:{
					text: '近五年授权专利数量变化情况（单位:项）',
					textStyle: {
						color: '#fff',
						fontSize: 18,
						fontWeight: 400
					},
					left: 20
				},
				grid: {
					left: '10%',
					right: '4%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.names4,
					axisLine: {
						show: false
					},
					axisLabel: {
						margin: 15,
						textStyle: {
							fontSize: 18
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['rgba(30,54,201,0.7)'],
							height: 1,
							type: 'solid'
						}
					},
					axisLabel: {
						margin: 20,
						textStyle: {
							fontSize: 18
						}
					}
				},
				series: [
					{
						data: this.totals4,
						type: 'line',
						borderType: 'solid',
						smooth: true,
						aymbolSize: 8,
						areaStyle: {},
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: '#00F2FE'  //0%处的颜色
								},{
									offset: 1, color: '#0025B3' //100%处的颜色
								}]
							}
						},
						lineStyle: {
							color: '#00F2FE'
						}
					}
				],
				textStyle: {
					color: '#B0C8FF',
					fontSize: 18
				}
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
	margin-bottom: 21px;
}
#patentNumber,#patentNumber2,#patentNumber3,#patentNumber4{
	width: 620px;
	height: 300px;
	margin: 0 auto;
}
@width1600-per: 0.8;
@width1366-per: 0.7;
@media screen and (max-width: 1600px) {
	.title {
		font-size: 22px*@width1600-per;
		padding-left: 30px*@width1600-per;
		margin: 23px*@width1600-per 16px*@width1600-per;
		margin-bottom: 21px*@width1600-per;
	}
	#patentNumber,#patentNumber2,#patentNumber3,#patentNumber4{
		width: 620px*@width1600-per;
		height: 300px*@width1600-per;
	}
}
@media screen and (max-width: 1366px) {
	.title {
		font-size: 22px*@width1366-per;
		padding-left: 30px*@width1366-per;
		margin: 23px*@width1366-per 16px*@width1366-per;
		margin-bottom: 21px*@width1366-per;
	}
	#patentNumber,#patentNumber2,#patentNumber3,#patentNumber4{
		width: 620px*@width1366-per;
		height: 300px*@width1366-per;
	}
}
</style>
