<template>
	<div class="schoolRunningConditionsTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<div class="chart-title">占地面积</div>
		<div class="All-info">
			<p>学校占地面积<span>{{xs_mj}}</span>亩</p>
			<p>学校校舍面积<span>{{ss_mj}}</span>万平方米</p>
		</div>
		<!-- 占地面积条形图 -->
		<div class="schoolRunningDiv">
			<span>占地</span>
			<div id="schoolRunningConditionsChart"></div>
			<span>校舍</span>
		</div>
		<div class="chart-title">科研经费</div>
		<div class="All-info kyjf">
			<p>今年总经费：<span>{{zjf}}万</span> 元</p>
			<p>今年总项目数量：<span>{{zxmsl}}</span> 个</p>
			<p>今年总科研人数：<span>{{zkyrs}}</span> 人</p>
			<div class="kyjfBar">
				<div class="blueBar">经费(元)</div>
				<div class="pinkBar">项目(个)</div>
				<div class="orangeBar">人数(人)</div>
			</div>
		</div>
		<!-- 科研经费柱形图 -->
		<div class="kyjfDiv">
			<div id="kyjfChart"></div>
		</div>
		<div class="chart-title">资产设备</div>
		<div class="All-info zcsb">
			<p>图书数量：<span>{{tssl}}</span> 册，<span>{{pertssl}}</span> 册/生</p>
			<p>教学仪器设备：<span>{{yqsb}}</span> 万元，<span>{{peryqsb}}</span> 元/生</p>
		</div>
		<!-- 资产设备折线图 -->
		<div class="zcsbDiv">
			<p>价值(万元)</p>
			<div id="zcsbChart"></div>
		</div>
	</div>
</template>

<script>
	import moudleheader from 'mycomponents/moudleHeader'
	import echarts from 'echarts/lib/echarts'
	import httpservice from 'common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V1 } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V2 } from 'common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return {
				systemLoginData:[],
				title:'办学条件',

				mjArr: [],
				xs_mj: 0,
				ss_mj: 0,

				zjf: '0',	// 当年科研经费
				zxmsl: '0',	// 当年科研项目数量
				zkyrs: '0',	// 当年投入科研人员数量

				tssl: 0,
				pertssl: 0,
				yqsb: 0,
				peryqsb: 0,
			}
		},
		components:{
			moudleheader
		},
		created() {
			this.getZdmj();
			this.getKyjf();
			this.getZcsb();
			this.zcsbEchart();
		},
		mounted() {
			this.drawLine2();	
			this.drawLine3();
		},
		methods:{
			// 获得占地面积
			getZdmj() {
				var params={ type: 'mj'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.xs_mj = objArr[0].MJ;
					this.ss_mj = objArr[1].MJ;

					var cXs_mj = this.xs_mj*666.7;
					var cSs_mj = this.ss_mj*10000;
					this.drawLine(cXs_mj + cSs_mj, cXs_mj, cSs_mj);
				});
			},
			// 科研经费
			getKyjf() {
				var params={ type: 'kyxm'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					var curYearData = objArr[0];
					
					this.zjf = curYearData.JF * 10;
					this.zxmsl = curYearData.XM_NUM;
					this.zkyrs = curYearData.RY_NUM;

					var xAxis = [], bar1Data = [], bar2Data = [], bar3Data = [];
					for (let index = objArr.length - 1; index >= 0; index--) {
						const element = objArr[index];
						xAxis.push(element.RQ);
						bar1Data.push(element.JF);
						bar2Data.push(element.XM_NUM);
						bar3Data.push(element.RY_NUM);
					}
					this.drawLine2(xAxis, bar1Data, bar2Data, bar3Data);
				});
			},
			// 资产设备
			getZcsb() {
				var params={ type: 'ts_zl'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.tssl = objArr[0].SL;
					this.pertssl = objArr[0].AVR;
				});
				var params={ type: 'jxzc'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.yqsb = objArr[0].JG;
					this.peryqsb = objArr[0].AVR;
				});
			},
			zcsbEchart() {
				// 往届学生数
				var params={ name: 'xxgk_tb'};
				var xssArr = httpservice.get(MONITOR_URL_V2, params)
				.then(data=>{ 
					var wlzcz = data.data.sqlRes.wlzcz;
					var wjxss = data.data.sqlRes.wjxss;

					var xAxis = [], echartData = [];
					for (let index = wjxss.length-1; index >= 0; index--) {
						const xss = wjxss[index];
						const zcs = wlzcz[index];

						xAxis.push(xss.RQ);
						echartData.push(zcs.ZCS/xss.XSS);
					}
					this.drawLine3(xAxis, echartData);
				});
				
			},
			drawLine(max_mj, xs_mj, ss_mj) {
				let schoolRunningConditionsChart = this.$echarts.init(document.getElementById('schoolRunningConditionsChart'));
				schoolRunningConditionsChart.setOption({
					title: [],
					tooltip: {},
					legend: {
						show: false
					},
					grid:{left:'0%', right: '0%',top:'0%',bottom:'0%', containLabel: true},
					xAxis:[{
						type:'value',
						gridIndex: 0,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						max: max_mj
					}],
					yAxis:[{
						type:'category',
						gridIndex: 0,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						}
					}],
					series: [{
						name: '占地',
						type: 'bar',//种类——柱形
						barWidth: 9,//柱子宽度
						stack: '总量',
						itemStyle: {
							color: 'rgba(226, 226, 56, 1)',
						},
						z:1,//类似z-index
						data: [xs_mj]
					},{
						name: '校舍',
						type: 'bar',//种类——柱形
						stack: '总量',
						barWidth: 9,//柱子宽度
						showBackground: true,
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
						},
						z:1,//类似z-index
						data: [ss_mj]
					}]
				})
			},
			drawLine2(xAxis, bar1Data, bar2Data, bar3Data) {
				let kyjfChart = this.$echarts.init(document.getElementById('kyjfChart'));
				kyjfChart.setOption({
				title: [],
				tooltip: {
					formatter: '{a} {b} {c}(十万元)'
				},
				legend: {
					show: false
				},
				grid:{left: '5%', right: '5%',bottom: '5%' ,top: '10%', containLabel: true},
				xAxis:[{
					type:'category',
					gridIndex: 0,
					axisTick:{//刻度线属性
					show: false
					},
					axisLine:{//轴线属性
					show: true
					},
					splitLine:{//y轴分隔线属性
					show: false
					},
					axisLabel:{
					show: true,
					color: 'rgba(0, 116, 238, 1)'
					},
					minorSplitLine: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
					},
					data: xAxis
				}],
				yAxis:[{
					type:'value',
					gridIndex: 0,
					axisLine:{//y轴属性
					show: false
					},
					axisTick:{//y轴刻度线属性
					show: false
					},
					splitLine:{//y轴分隔线属性
					show: true,
					lineStyle:{
						color: 'rgba(0, 115, 238, .5)'
					}
					},
					axisLabel:{
					show: true,
					color: 'rgba(0, 116, 238, 1)'
					},
					data:''
				}],
				color: ['rgba(255, 106, 180, 1)', 'rgba(86, 149, 244, 1)', 'rgba(254, 164, 10, 1)'],
				series: [{
					name: '经费',
					type: 'bar',//种类——柱形
					barGap: 0.2,
					barWidth: 10,//柱子宽度
					data: bar1Data,
					showBackground: true,
					backgroundStyle: {
					color: 'rgba(0, 115, 238, .5)',
					},
					itemStyle: {
						barBorderRadius:7
					},
				},{
					name: '项目',
					type: 'bar',//种类——柱形
					barWidth: 10,//柱子宽度
					data: bar2Data,
					showBackground: true,
					backgroundStyle: {
					color: 'rgba(0, 115, 238, .5)',
					},
					itemStyle: {
					barBorderRadius:7
					},
				},{
					name: '人数',
					type: 'bar',//种类——柱形
					barWidth: 10,//柱子宽度
					data: bar3Data,
					showBackground: true,
					backgroundStyle: {
					color: 'rgba(0, 115, 238, .5)',
					},
					itemStyle: {
					barBorderRadius:7
					},
				}]
				})
			},
			drawLine3(xAxis, echartData) {
				let zcsbChart = this.$echarts.init(document.getElementById('zcsbChart'));
				zcsbChart.setOption({
					grid:{left: '5%', right: '12%', top: '15%' ,bottom: '0%' , containLabel: true},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine:{//轴属性
							show: true,
							lineStyle:{
								color: 'rgba(0, 115, 238, .5)'
							}
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false,
							lineStyle:{
								color: 'rgba(0, 115, 238, .5)'
							}
						},
						axisLabel:{
							show: true,
							color: 'rgba(0, 116, 238, 1)'
						},
						data: xAxis
					},
					yAxis: {
						type: 'value',
						axisLine:{//轴属性
							show: true,
							lineStyle:{
								color: 'rgba(0, 115, 238, .5)'
							}
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: true,
							lineStyle:{
								color: 'rgba(0, 115, 238, .5)'
							}
						},
						axisLabel:{
							show: true,
							color: 'rgba(0, 116, 238, 1)'
						},
						data:''
					},
					series: [{
						data: echartData,
						type: 'line',
						smooth:true,
						itemStyle:{
							color: 'rgba(255, 106, 180, 1)'
						},
						lineStyle:{
							color: 'rgba(255, 106, 180, 1)'
						},
						areaStyle: {
							color:{
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: 'rgba(255, 106, 180, 1)' // 0% 处的颜色
								}, {
									offset: 1, color: 'transparent' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					}]
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.schoolRunningDiv{
		width: 92%;
		height: 65px;
		display: inline-flex;
		justify-content: space-evenly;
		color:#fff;
		line-height: 65px;
		padding: 0 15px; 
	}
	#schoolRunningConditionsChart{
		width: 70%;
		height: 100%;
	}
	.kyjfDiv{
		width: 100%;
		height: 180px;
		#kyjfChart{
			width: 100%;
			height: 100%;
		}
	}
	.zcsbDiv{
		width: 100%;
		height: 180px;
		p{
			font-size: 11px;
			color: rgba(0, 140, 255, 1);
			text-align: left;
			padding-left: 15px;
		}
		#zcsbChart{
			width: 100%;
			height: 100%;
		}
	}
	.All-info{
		display: block;
		p{
			padding-left: 20px;
			text-align: left;
			padding-top: 10px;
		}
		p:nth-of-type(1){
			span{
				color:rgba(226, 226, 56, 1);
			}
		}
		p:nth-of-type(2){
			span{
				color:rgba(0, 140, 255, 1);
			}
		}
	}
	.kyjf{
		p:nth-of-type(1){
			span{
				color:rgba(255, 106, 180, 1);
			}
		}
		p:nth-of-type(2){
			span{
				color:rgba(0, 140, 255, 1);
			}
		}
		p:nth-of-type(3){
			span{
				color:rgba(254, 164, 10, 1);
			}
		}
		.kyjfBar{
			position: absolute;
			top: 3px;
			right: 0px;
			color: #fff;
			font-size: 14px;
			padding-right: 15px;
			div{
				padding-bottom: 5px;
				font-size: 11px;
			}
			.blueBar::before,.pinkBar::before,.orangeBar::before{
				content: '';
				display: inline-block;
				position: relative;
				top: -2px;
				padding-right: 5px;
				margin-right: 5px;
				border-radius: 10px;
				width: 5px;
				height: 5px;
				background-color: rgba(255, 106, 180, 1);
			}
			.pinkBar::before{
				background-color: rgba(0, 140, 255, 1);
			}
			.orangeBar::before{
				background-color: rgba(254, 164, 10, 1);
			}
		}
	}
	.zcsb{
		margin-bottom: 10px;
		p:nth-of-type(n){
			span{
				color:rgba(255, 106, 180, 1);
			}
		}
	}
	@media screen and (max-width:1600px)  {
		.All-info p{
			padding-top: 0;
		}
		.schoolRunningDiv{
			height: 55px;
			line-height: 55px;
		}
		.zcsbDiv #zcsbChart{
			height:93%;
		}
	}
	@media screen and (max-width:1366px)  {
		.All-info.kyjf,.All-info.zcsb{
			margin-top: 0px;
		}
		.All-info p{
			padding-top: 3px;
			font-size: 12px;
			span{
				font-size: 15px;
			}
		}
		.schoolRunningDiv{
			height: 55px;
			line-height: 55px;
			span{
				font-size: 12px;
			}
		}
		.zcsbDiv #zcsbChart{
			height:93%;
		}
	}
	
	@media (max-height:667px) and (max-width:1366px)  {
		.schoolRunningConditionsTemplate{
			height: 100%;
		}
		.All-info{
			display: block;
			p{
				padding-top: 5px;
			}
		}
		.schoolRunningDiv{
			height: 40px;
			line-height: 40px;
		}
		.zcsbDiv{
			height: 140px;
		}
		.kyjfDiv{
			height: 140px;
		}
		.zcsb{
			margin: 0px;
		}
		.zcsbDiv{
			height: 23%;
			#zcsbChart{
				height:90%;
			}
		}
	}
	@media (max-height:625px) and (max-width:1366px)  {
		.zcsbDiv{
			height: 20%;
			#zcsbChart{
				height:80%;
			}
		}
	}
</style>
