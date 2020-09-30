<template>
	<div class="systemLoginTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<div class="loginNum">
			<div class="item">
				<div class="item-icon"></div>
				<div class="item-info">
					<p class="item-num">{{d_rs}}</p>
					<p class="item-name">今日登陆人数</p>
				</div>
			</div>
			<div class="item">
				<div class="item-icon2"></div>
				<div class="item-info">
					<p class="item-num">{{d_cs}}</p>
					<p class="item-name">今日访问次数</p>
				</div>
			</div>
			<div class="item">
				<div class="item-icon3"></div>
				<div class="item-info">
					<p class="item-num">{{d_mh_cs}}</p>
					<div class="smallScreen">
						<marquee  direction="left" scrollamount="2px" behavior="alternate">
							<p class="item-name">门户访问次数</p>
						</marquee>
					</div>
					<p class="item-name largeScreen">门户访问次数</p>
				</div>
			</div>
		</div>
		<div class="chart-title">本月平均在线人数占比</div>

		<!-- 系统登录情况 饼图 -->
		<div class="charts">
			<div>
				<p>{{p_rs}}</p>
				<div id="systemLoginChart"></div>
			</div>
			<div>
				<p>{{p_cs}}</p>
				<div id="systemLoginChart2"></div>
			</div>
			<div>
				<p>{{p_mh_rs}}</p>
				<div id="systemLoginChart3"></div>
			</div>
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
				title:'系统登录情况',

				d_rs: 0,
				d_cs: 0,
				d_mh_cs: 0,

				p_rs: '',
				p_cs: '',
				p_mh_rs: '',
			}
		},
		components:{
			moudleheader
		},
		created() {
			//this.getXtdl();
			this.getDayData();
			setTimeout(() => {
				this.getMonthData();
			}, 300);
		},
		mounted() {
			
		},
		methods: {
			getDayData() {
				var params={ type: 'd_rs_cs'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objs = data.data.sqlRes;
					// 日_登陆人数
					this.d_rs = objs[0].D_DLRS;
					// 日_访问次数
					this.d_cs = objs[0].D_FWCS;
				});
				// 门户
				var params={ type: 'd_mh_cs'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objs = data.data.sqlRes;
					// 日_门户访问次数
					this.d_mh_cs = objs[0].D_MH_DLRS;
				});
			},
			getMonthData() {
				var params={ type: 'm_rs_cs'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objs = data.data.sqlRes;
					// 月_登陆人数
					var m_rs = objs[0].M_DLRS;
					// 月_访问次数
					var m_cs = objs[0].M_FWCS;

					this.p_rs = (this.d_rs/m_rs * 100).toFixed(2) + '%';
					this.p_cs = (this.d_cs/m_cs * 100).toFixed(2) + '%';
					this.drawLine(m_rs, this.d_rs);
					this.drawLine2(m_cs, this.d_cs);
				});
				var params2={ type: 'm_mh_cs'};
				httpservice.get(MONITOR_URL_V1, params2)
				.then(data => { 
					var objs = data.data.sqlRes;
					// 月_门户次数
					var m_mh_cs = objs[0].M_MH_DLRS;
					this.p_mh_rs = (this.d_mh_cs/m_mh_cs * 100).toFixed(2) + '%';
					this.drawLine3(m_mh_cs, this.d_mh_cs);
				});
			},
			getXtdl() {
				var params={ name: 'xtdl'};
				httpservice.get(MONITOR_URL_V2, params)
				.then(data=>{ 
					var objs = data.data.sqlRes;
					// 日_登陆人数
					this.d_rs = objs.d_rs_cs[0].D_DLRS;
					// 日_访问次数
					this.d_cs = objs.d_rs_cs[0].D_FWCS;
					// 日_门户人数
					this.d_mh_cs = objs.d_mh_cs[0].D_MH_DLRS;


					// 月_登陆人数
					var m_rs = objs.m_rs_cs[0].M_DLRS;
					// 月_访问次数
					var m_cs = objs.m_rs_cs[0].M_FWCS;
					// 月_门户次数
					var m_mh_cs = objs.m_mh_cs[0].M_MH_DLRS;

					this.p_rs = (this.d_rs/m_rs * 100).toFixed(2) + '%';
					this.p_cs = (this.d_cs/m_cs * 100).toFixed(2) + '%';
					this.p_mh_rs = (this.d_mh_cs/m_mh_cs * 100).toFixed(2) + '%';

					this.drawLine(m_rs, this.d_rs);
					this.drawLine2(m_cs, this.d_cs);
					this.drawLine3(m_mh_cs, this.d_mh_cs);
				});
			},


			drawLine(max, d) {
				let systemLoginChart = this.$echarts.init(document.getElementById('systemLoginChart'));
				systemLoginChart.setOption({
					title:{
						// text:'20:6',
						// textStyle:{
						// 	color:'rgba(42, 243, 224, 1)',
						// 	fontSize: '16'
						// },
						// top: '96',
						// left: '65'
					},
					tooltip: {},
					angleAxis: {
						max: max,
						startAngle: -270,
						splitLine: {
							show: false
						},
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							show:false
						}
					},
					radiusAxis: {
						type: 'category',
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						data: [],
						z: 10
					},
					polar: {
					},
					series: [{
						type: 'bar',
						data: [d],
						coordinateSystem: 'polar',
						name: '总登陆人数',
						color: 'rgba(42, 243, 224, 1)',
						barWidth: 5,//柱子宽度
						showBackground: true,
						roundCap:true,
						backgroundStyle: {
							color: 'rgba(42, 243, 224, .5)',
						},
						
					}],
					legend: {
						show: false,
						data: ['Without Round Cap', 'With Round Cap']
					}
				})
			},
			drawLine2(max, d) {
				let systemLoginChart2 = this.$echarts.init(document.getElementById('systemLoginChart2'));
				systemLoginChart2.setOption({
					title:{
						// text:'20:6',
						// textStyle:{
						// 	color: 'rgba(86, 150, 244, 1)',
						// 	fontSize: '16'
						// },
						// top: '96',
						// left: '65'
					},
					tooltip: {},
					grid:{
						bottom: '15%'
					},
					angleAxis: {
						max: max,
						startAngle: -270,
						splitLine: {
							show: false
						},
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							show:false
						}
					},
					radiusAxis: {
						type: 'category',
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						data: [],
						z: 10
					},
					polar: {
					},
					series: [{
						type: 'bar',
						data: [d],
						coordinateSystem: 'polar',
						name: '总登陆人数',
						color: 'rgba(86, 150, 244, 1)',
						barWidth: 5,//柱子宽度
						showBackground: true,
						roundCap:true,
						backgroundStyle: {
							color: 'rgba(86, 150, 244, .5)',
						},
						
					}],
					legend: {
						show: false,
						data: ['Without Round Cap', 'With Round Cap']
					}
				})
			},
			drawLine3(max, d) {
				let systemLoginChart3 = this.$echarts.init(document.getElementById('systemLoginChart3'));
				systemLoginChart3.setOption({
					title:{
						// text:'20:6',
						// textStyle:{
						// 	color: 'rgba(162, 86, 255, 1)',
						// 	fontSize: '16'
						// },
						// top: '96',
						// left: '65'
					},
					tooltip: {},
					grid:{
						bottom: '15%'
					},
					angleAxis: {
						max: max,
						startAngle: -270,
						splitLine: {
							show: false
						},
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							show:false
						}
					},
					radiusAxis: {
						type: 'category',
						axisLine:{
							show: false
						},
						axisTick:{
							show:false
						},
						data: [],
						z: 10
					},
					polar: {
					},
					series: [{
						type: 'bar',
						data: [d],
						coordinateSystem: 'polar',
						name: '总登陆人数',
						color: 'rgba(162, 86, 255, 1)',
						barWidth: 5,//柱子宽度
						showBackground: true,
						roundCap:true,
						backgroundStyle: {
							color: 'rgba(162, 86, 255, .5)',
						},
						
					}],
					legend: {
						show: false,
						data: ['Without Round Cap', 'With Round Cap']
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.charts{
		width: 100%;
		height: 150px;
		display: inline-flex;
		justify-content: space-evenly;
		>div{
			width: 30%;
			height: 145%;
			top:-30px;
			p{
				position: relative;
				top: 88px;
				left: 0px;
				color: rgba(39, 246, 222, 1);
				font-size:16px;
				font-weight: 600;
			}
		}
		>div:nth-of-type(2){
			p{
				color: rgba(0, 116, 238, 1);
			}
		}
		>div:nth-of-type(3){
			p{
				color: rgba(161, 86, 255, 1);
			}
		}
	}
	#systemLoginChart,#systemLoginChart2,#systemLoginChart3{
		width: 100%;
		height: 100%;
		position: relative;
		top:-30px;
	}
	.systemLoginTemplate .moudleheader .title-content-bg{
		top: -2px;
	}
	.loginNum{
		width: 98%;
		height: 80px;
		display: inline-flex;
		justify-content: space-evenly;
		margin-top: 15px;
		.item{
			width: 30%;
			height: 100%;
			border-radius: 5px;
			background-color: rgba(134, 147, 212, .36);
			text-align: left;
			color: #fff;
			div{
				display: inline-block;
			}
			.item-icon,.item-icon2,.item-icon3{
				width: 60px;
				height: 60px;
				position: relative;
				top: 10px;
				background: url(../../../public/img/hy/loginAll@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.item-icon2{
				background: url(../../../public/img/hy/onlineAll@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.item-icon3{
				background: url(../../../public/img/hy/online@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.item-info{
				width: 65%;
				height: 100%;
				p{
					height: 50%;
					line-height: 30px;
					padding-left: 10px;
				}
				.item-num{
					font-size: 22px;
					color: rgba(254, 164, 10, 1);
					line-height: 40px
				}
			}
		}
		.item:nth-of-type(2){
			.item-info{
				.item-num{
					color: rgba(226, 226, 56, 1);
				}
			}
		}
		.item:nth-of-type(3){
			.item-icon3{
				top: -10px;
			}
			.item-info{
				.item-num{
					color: rgba(255, 106, 180, 1);
				}
			}
		}
	}
	.largeScreen{
		display: none;
	}
	.smallScreen{
		display: block;
	}
	@media screen and (max-width:1920px)  {
		.largeScreen{
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.smallScreen{
			display: none!important;
		}
		.charts{
			>div{
				p{
					top: 62px;
				}
			}
		}
		#systemLoginChart, #systemLoginChart2, #systemLoginChart3{
			top: -57px;
		}
	}
	@media screen and (max-width:1600px)  {
		.largeScreen{
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.smallScreen{
			display: none!important;
		}
		.loginNum{
			height: 70px;
			margin-top: 10px;
			.item{
				.item-icon,.item-icon2,.item-icon3{
					width: 55px;
					height: 55px;
					top: 2px;
				}
				.item-icon2{
					top: 7px;
				}
			}
		}
		.charts{
			height: 160px;
			>div{
				height: 100%;
				top:-30px;
				p{
					top: 48px;
				}
			}
		}
		#systemLoginChart,#systemLoginChart2,#systemLoginChart3{
			top:-40px;
		}
	}
	@media screen and (max-width:1366px)  {
		.largeScreen{
			display: none;
		}
		.smallScreen{
			display: inline-block!important;
		}
		.loginNum{
			height: 54px;
			margin-top: 20px;
			.item{
				.item-icon,.item-icon2,.item-icon3{
					width: 40px;
					height: 40px;
					top: 0px;
					left: 5px;
				}
			}
		}
		.charts{
			height: 100px;
			>div{
				height: 200%;
				top:-30px;
				p{
					top: 52px;
				}
			}
		}
		.systemLoginTemplate .chart-title{
			margin-top: 15px;
		}
		#systemLoginChart,#systemLoginChart2,#systemLoginChart3{
			top:-58px;
		}
	}
	@media (max-height:667px) and (max-width:1366px)  {
		.largeScreen{
			display: none;
		}
		.smallScreen{
			display: inline-block!important;
		}
		.loginNum{
			height: 54px;
			margin-top: 10px;
			.item{
				.item-icon,.item-icon2,.item-icon3{
					width: 40px;
					height: 40px;
					top: 0px;
					left: 5px;
				}
			}
		}
		.charts{
			height: 100px;
			>div{
				height: 150%;
				top:-30px;
				p{
					top: 28px;
				}
			}
		}
		#systemLoginChart,#systemLoginChart2,#systemLoginChart3{
			top:-56px;
		}
	}
</style>
