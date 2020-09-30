<template>
	<div class="disciplineTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<div class="li-info">
			<p>国家级卓越计划试点专业：<span>{{sdzy}}</span> 个</p>
			<p>国家一流专业：<span>{{ylzy}}</span> 个</p>
			<p>国家及特色专业：<span>{{tszy}}</span> 个</p>
			<p>省一流专业：<span>{{sylzy}}</span> 个</p>
			<p>省品牌专业：<span>{{ppzy}}</span> 个</p>
			<p>省"十三五"重点(培育、建设)学科：<span>{{zdxk}}</span> 个</p>
		</div>
		<div class="Bars">
			<div class="pinkBar">卓越</div>
			<div class="orangeBar">国一</div>
			<div class="yellowBar">特色</div>
			<div class="cyanBar">省一</div>
			<div class="blueBar">品牌</div>
			<div class="purpleBar">重点</div>
		</div>
		<!-- 饼图 -->
		<div id="disciplineChart"></div>
	</div>
</template>

<script>
	import moudleheader from 'mycomponents/moudleHeader'
	import echarts from 'echarts/lib/echarts'
	import httpservice from 'common/service/httpservice.js'; // get, post请求封装
	import {
		RESULT_URL
	} from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V1 } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V2 } from 'common/config/serviceurl.js'; // 后台地址配置

	export default {
		data() {
			return {
				disciplineData: [],
				title: '学科建设',
				sdzy: '',
				ylzy: '',
				tszy: '',
				sylzy: '',
				ppzy: '',
				zdxk: '',
			}
		},
		components: {
			moudleheader
		},
		created() {
			this.getDisciplineData();
		},
		mounted() {
		},
		methods: {
			getDisciplineData() {
				var params={ type: 'xkjs'};
				httpservice.get(MONITOR_URL_V1, params)
				.then(data=>{ 
					var objArr = data.data.sqlRes;
					objArr.forEach(element => {
						this[element.LB] = element.SL;

						this.drawLine(this.sdzy, this.ylzy, this.tszy
									, this.sylzy, this.ppzy, this.zdxk);
					});
				});
			},
			drawLine(arg1, arg2, arg3, arg4, arg5, arg6) {
				let disciplineChart = this.$echarts.init(document.getElementById('disciplineChart'));
				disciplineChart.setOption({
					title: {},
					color: ['rgba(255, 106, 180, 1)', 'rgba(254, 164, 10, 1)', 'rgba(226, 226, 56, 1)',
						'rgba(42, 243, 224, 1)', 'rgba(86, 150, 244, 1)', 'rgba(162, 86, 255, 1)'
					],
					tooltip: {
						trigger: 'item',
						formatter: "{b} : {c} 个"
					},
					legend: {
						show: false,
						data: ['卓越', '国一', '特色', '省一', '品牌', '重点']
					},
					series: [{
						name: '学科建设',
						type: 'pie',
						radius: ['30%', '60%'],
						center: ['50%', '50%'],
						data: [{
								value: arg1,
								name: '卓越',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							{
								value: arg2,
								name: '国一',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							{
								value: arg3,
								name: '特色',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							{
								value: arg4,
								name: '省一',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							{
								value: arg5,
								name: '品牌',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							{
								value: arg6,
								name: '重点',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							}
						],
						labelLine: {
							show: false
						},
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
	#disciplineChart {
		width: 284px;
		height: 200px;
		position: absolute !important;
		top: 134px;
		right: -49px;
	}

	.disciplineTemplate .li-info {
		width: 100%;
		margin-top: 10px;
		color: #fff;
		text-align: left;
		padding-left: 15px;
		p {
			font-size: 11px;
			span{
				font-size: 14px;
			}
		}
		p::before {
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

		p:nth-of-type(1) {
			span {
				color: rgba(255, 106, 180, 1);
			}
		}

		p:nth-of-type(2) {
			span {
				color: rgba(254, 164, 10, 1);
			}
		}

		p:nth-of-type(3) {
			span {
				color: rgba(226, 226, 56, 1);
			}
		}

		p:nth-of-type(4) {
			span {
				color: rgba(39, 246, 222, 1);
			}
		}

		p:nth-of-type(5) {
			span {
				color: rgba(0, 116, 238, 1);
			}
		}

		p:nth-of-type(6) {
			span {
				color: rgba(161, 86, 255, 1);
			}
		}
	}

	.Bars {
		position: absolute;
		right: 15px;
		top: 43px;
		color: #fff;
		font-size: 12px;

		div {
			padding-bottom: 2px;
		}

		.pinkBar::before,
		.orangeBar::before,
		.yellowBar::before,
		.cyanBar::before,
		.blueBar::before,
		.purpleBar::before {
			content: '';
			display: inline-block;
			position: relative;
			top: -2px;
			padding-right: 5px;
			margin-right: 5px;
			border-radius: 10px;
			width: 10px;
			height: 5px;
			background-color: rgba(255, 106, 180, 1);
		}

		.orangeBar::before {
			background-color: rgba(254, 164, 10, 1);
		}

		.yellowBar::before {
			background-color: rgba(226, 226, 56, 1)
		}

		.cyanBar::before {
			background-color: rgba(39, 246, 222, 1);
		}

		.blueBar::before {
			background-color: rgba(0, 116, 238, 1);
		}

		.purpleBar::before {
			background-color: rgba(161, 86, 255, 1);
		}
	}

	@media screen and (max-width:1920px) {
		.disciplineTemplate .li-info {
		width: 100%;
		margin-top: 10px;
		color: #fff;
		text-align: left;
		padding-left: 15px;
			p {
				font-size: 15px;
    			margin-bottom: 30px;
				span{
					font-size: 14px;
				}
			}
		}
	}
	@media screen and (max-width:1600px) {
		#disciplineChart {
			width: 190px;
			height: 150px;
			top: 140px;
			right: 20px;
		}
	}

	@media screen and (max-width:1366px) {
		
		.disciplineTemplate .moudleheader .title-content-bg {
			top: -1px;
		}
		#disciplineChart {
			width: 200px;
			height: 160px;
			top: 100px;
			right: 20px;
		}
		.Bars {
			top: 28px;
		}
		.disciplineTemplate .li-info {
			margin-top: 35px;
			p{
				margin-bottom: 25px;
			}
			p:nth-last-of-type(1){
				margin-bottom: 0px;
			}
		}
		.disciplineTemplate .li-info {
				p {
					font-size: 12px;
					margin-bottom: 19px;
					span{
						font-size: 14px;
					}
				}
		}
	}
	@media (max-height:667px) and (max-width:1366px)  {
		.disciplineTemplate .moudleheader .title-content-bg {
			top: -1px;
		}
		#disciplineChart {
			width: 180px;
			height: 140px;
			top: 80px;
			right: 30px;
		}
		.Bars {
			top: 28px;
		}
		.disciplineTemplate .li-info {
			margin-top: 15px;
			p{
				margin-bottom: 16px;
			}
			p:nth-last-of-type(1){
				margin-bottom: 0px;
			}
		}
	}
</style>