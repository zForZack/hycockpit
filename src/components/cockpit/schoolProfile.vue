<template>
	<div class="schoolProfileTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<div class="map">
			<!-- <div class="addr1" @click="handleClick('addr1')" >
				<hoverBar :addr="addr" v-show="this.hover"></hoverBar>
			</div>
			<div class="addr2"  @click="handleClick('addr2')">
				<hoverBar :addr="addr" v-show="this.hover2"></hoverBar>
			</div>
			<div class="addr3"  @click="handleClick('addr3')">
				<hoverBar :addr="addr" v-show="this.hover3"></hoverBar>
			</div> -->
			<div class="addr1" >
				<hoverBar :addr="addr1"></hoverBar>
			</div>
			<div class="addr2">
				<hoverBar :addr="addr2"></hoverBar>
			</div>
			<div class="addr3">
				<hoverBar :addr="addr3"></hoverBar>
			</div>
		</div>
		<div class="schoolProfile-content">
			<div class="schoolProfile-info">
				<div class="li-info">
					<p>学院数：<span>{{xys}}</span> 个</p>
					<p>学科数：<span>{{xks}}</span> 个</p>
					<p>学生数：<span>{{xss}}</span> 人</p>
					<p>教师数：<span>{{jss}}</span> 人</p>
				</div>
				<div class="detailInfo">
					<p class="firstP">其中：</p>
					<div class="detailInfo-right">
						<p v-for="item in jslbArr" :key="item.index">
							{{item.LB}}
							<span>{{item.SL}}</span> 人
						</p>
					</div>
				</div>
			</div>
			<div class="schoolProfileDiv">
				<p>师生比</p>
				<div id="schoolProfileChart"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import moudleheader from 'mycomponents/moudleHeader'
	import hoverBar from 'mycomponents/hoverBar'
	import echarts from 'echarts/lib/echarts'
	import httpservice from 'common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V1 } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V2 } from 'common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return {
				schoolProfileData:[],
				title:'学校概况',
				xys:'0',
				xks:'0',
				xss:'0',
				jss:'0',

				jslbArr: [],
				addr:'',
				addr1: '北京路校区：北京北路89号',
				addr2: '枚乘路校区：枚乘路1号',
				addr3: '萧湖校区：竹巷街114号'
			}
		},
		components:{
			moudleheader,
			hoverBar
		},
		created() {
			// this.getPersonnelData();
			this.hover = false;
			this.hover2 = false;
			this.hover3 = false;
			this.getXyXk();
			this.getXss();
			this.getJss();
			this.getJslbs();
			this.getEchartData();
		},
		mounted() {
			this.drawLine();//图表
		},
		methods:{
			// 学院学科
			getXyXk() {
				var params={ type: 'xyxks'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					objArr.forEach(element => {
						this[element.LB] = element.SL;
					});
				});
			},
			// 学生数
			getXss() {
				var params={ type: 'xss'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.xss   = objArr[0].XSS;
				});
			},
			// 教职工总数
			getJss() {
				var params={ type: 'jg_sl'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.jss   = objArr[0].SL;
				});
			},
			// 师生比图
			getEchartData() {
				var params={ name: 'xxgk_tb'};
				httpservice.get(MONITOR_URL_V2, params)
				.then(data => { 
					var wjjgs = data.data.sqlRes.wjjgs;
					var wjxss = data.data.sqlRes.wjxss;

					var xAxis = [], echartData = [];
					for (let index = wjxss.length-1; index >= 0; index--) {
						const xss = wjxss[index];
						const jgs = wjjgs[index];

						xAxis.push(xss.RQ);
						echartData.push(xss.XSS/jgs.JGS);
					}
					console.log(xAxis)
					console.log(echartData)
					this.drawLine(xAxis, echartData);
				});
			},
			// 教职工类别数
			getJslbs() {
				var params={ type: 'jg_lb'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					this.jslbArr = objArr;
				});
			},
			handleClick(e){
				if(e === 'addr1'){
					this.addr = this.addr1;
					this.hover = this.hover === false ? true : false;
					this.hover2 = this.hover3 = false;
				}else if(e === 'addr2'){
					this.addr = this.addr2
					this.hover2 = this.hover2 === false ? true : false;
					this.hover = this.hover3 = false;
				}else if(e === 'addr3'){
					this.addr = this.addr3
					this.hover3 = this.hover3=== false ? true : false;
					this.hover = this.hover2 = false;
				}
				this.$forceUpdate();
			},
			drawLine(xAxis, echartData) {
				let schoolProfileChart = this.$echarts.init(document.getElementById('schoolProfileChart'));
				schoolProfileChart.setOption({
					grid:{left: '5%', right: '8%', top: '8%' ,bottom: '5%' , containLabel: true},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine:{//轴属性
							show: false,
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
							show: false,
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
							color: 'rgba(0, 116, 238, 1)'
						},
						lineStyle:{
							color: 'rgba(0, 116, 238, 1)'
						},
						areaStyle: {
							color:{
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: 'rgba(86, 150, 244, 1)' // 0% 处的颜色
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

<style lang="less">
	.map{
		width: 94%;
		height: 260px;
		margin: 0 auto;
		background: url(../../../public/img/hy/map@2x.png);
		background-size: 100% 100%;
		.addr1,.addr2,.addr3{
			width: 95px;
			height: 28px;
			position: relative;
			left: 14%;
			top: 14px;
			hoverBar{
				position: relative;
				left:20px;
			}
		}
		.addr2{
			left: 20%;
			top: 106px;
		}
		.addr3{
			left: 73%;
			top: 116px;
		}
		.addr1:hover,.addr2:hover,.addr3:hover{
			cursor: pointer;
		}
	}
	.schoolProfile-content{
		width: 100%;
		height: 210px;
		margin-top: 10px;
		display: inline-flex;
		div{
			display: inline-block;
		}
		.schoolProfile-info{
			width: 50%;
			height: 100%;
			padding-left: 20px;
			display: inline-flex;
			flex-direction: column;
			color: #fff;
			.li-info{
				width: 100%;
				height: 60px;
				display: inline-flex;
				flex-direction: row;
    			flex-wrap: wrap;
				p{
					width: 50%;
					height: 30px;
					line-height: 30px;
					text-align: left;
				}
				p::before{
					content: '';
					display: inline-block;
					position: relative;
					right: 5px;
					bottom: 2px;
					width: 5px;
					height: 5px;
					border-radius: 30px;
					background-color: lightskyblue;
				}
			}
			.detailInfo{
				width: 100%;
				height: 115px;
				margin-top: 10px;
				position: relative;
				display: inline-flex;
				padding-left: 5px;
				.firstP{
					height: 30px;
    				line-height: 30px;
				}
				.detailInfo-right{
					text-align: left;
					p{
						height: 30px;
						line-height: 30px;
					}
					span{
						color: rgba(0, 116, 238, 1);
					}
				}
			}
			p:nth-of-type(1){
				span{
					color:rgba(255, 106, 180, 1);
				}
			}
			p:nth-of-type(2){
				span{
					color:rgba(254, 164, 10, 1);
				}
			}
			p:nth-of-type(3){
				span{
					color:rgba(39, 246, 222, 1);
				}
			}
			p:nth-of-type(4){
				span{
					color:rgba(0, 116, 238, 1);
				}
			}
		}
		.schoolProfileDiv{
			width: 50%;
			color: #fff;
			text-align: left;
			#schoolProfileChart{
				width: 98%;
				height: 85%;
			}
		}
	}
	@media screen and (max-width:1920px)  {
		
	}
	@media screen and (max-width:1600px)  {
		.schoolProfile-content{
			margin-top: 5px;
			height: 175px;
		}
		.schoolProfileDiv{
			#schoolProfileChart{
				height: 75%;
			}
		}
		.map{
			width: 92%;
    		height: 225px;
			.addr1,.addr2,.addr3{
				width: 93px;
    			height: 35px;
				position: relative;
				left: 14%;
				top: 0px;
				hoverBar{
					position: relative;
					left:20px;
				}
			}
			.addr2{
				left: 21%;
				top: 68px;
			}
			.addr3{
				left: 73%;
				top: 65px;
			}
		}
		.schoolProfile-content .schoolProfile-info {
			height: 86%;
			.detailInfo{
				margin-top: 0px;
				.firstP{
					left: 26px;
					height: 20px;
					line-height: 20px;
				}
				.detailInfo-right{
					p{
						height: 20px;
						line-height: 20px;
					}
				}
			}
		}
	}
	@media screen and (max-width:1366px)  {
		.schoolProfileTemplate .moudleheader .title-content-bg{
			top: -2px!important;
		}
		.schoolProfile-content{
			margin-top: 5px;
			height: 139px;
			.schoolProfileDiv{
				p{
					font-size: 11px;
				}
				#schoolProfileChart{
					margin-top: 5px;
					height: 100%;
				}
			}
		}
		.schoolProfile-content .schoolProfile-info{
			.li-info{
				height: 40px;
				p{
					height: 20px;
					line-height: 20px;
					font-size: 11px;
					span{
						font-size: 15px;
					}
				}
			}
			.detailInfo{
				margin-top: 10px;
				p{
					font-size: 12px;
					span{
						font-size: 15px;
					}
				}
				.firstP{
					left: 26px;
					height: 20px;
					line-height: 20px;
				}
				.detailInfo-right{
					p{
						height: 20px;
						line-height: 20px;
					}
				}
			}
			p{
				margin-bottom: 5px;
			}
		}
		.map{
			width: 90%;
    		height: 230px;
			.addr1,.addr2,.addr3{
				width: 68px;
				height: 28px;
				position: relative;
				left: 14%;
				top: 7px;
				hoverBar{
					position: relative;
					left:20px;
				}
			}
			.addr2{
				left: 20%;
				top: 84px;
			}
			.addr3{
				left: 73%;
				top: 90px;
			}
		}
	}
	@media (max-height:667px) and (max-width:1366px)  {
		.schoolProfileTemplate .moudleheader .title-content-bg{
			top: -2px!important;
		}
		.schoolProfile-content{
			margin-top: 5px;
			height: 139px;
		}
		.schoolProfileDiv{
			p{
				font-size: 11px;
			}
			#schoolProfileChart{
				height: 80%!important;
			}
		}
		.schoolProfile-content .schoolProfile-info{
			.li-info{
				height: 40px;
				p{
					height: 20px;
					line-height: 20px;
					font-size: 11px;
					span{
						font-size: 15px;
					}
				}
			}
			.detailInfo{
				margin-top: 5px;
				p{
					font-size: 12px;
					span{
						font-size: 15px;
					}
				}
				.firstP{
					left: 26px;
					height: 20px;
					line-height: 20px;
				}
				.detailInfo-right{
					p{
						height: 20px;
						line-height: 20px;
					}
				}
			}
			p{
				margin-bottom: 0px;
			}
		}
		.map{
			width: 85%;
    		height: 170px;
			.addr1,.addr2,.addr3{
				width: 63px;
				height: 28px;
				position: relative;
				left: 14%;
				top: 0px;
				hoverBar{
					position: relative;
					left:20px;
				}
			}
			.addr2{
				left: 20%;
				top: 50px;
			}
			.addr3{
				left: 73%;
				top: 45px;
			}
		}
	}
</style>
