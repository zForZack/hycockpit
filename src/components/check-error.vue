<template>
	<div class="checkErrorTemplate">
		<h4 class="title">核查错误折线图（按日统计）</h4>
		<div class="twodaysCheck">
			<ul>
				<li>
					<span>昨日错误量</span>
					<a href="javascript:;">{{yestodayError}}</a>
				</li>
				<li>
					<span>今日错误量</span>
					<a href="javascript:;">{{todayError}}</a>
				</li>
			</ul>
		</div>
		<div id="checkErrorChart"></div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			todayError:'',
			yestodayError:'',
			days:[],
			daylyErrors:[]
		};
	},
	created() {
		this.getTodayErrors();
		this.getYesTodayErrors();
		this.getCheckErrorList();
	},
	methods: {
		getTodayErrors() {
			var params = { name: 'today_error' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.todayError=data.list[0].TOTAL;
			});
		},
		getYesTodayErrors() {
			var params = { name: 'yestoday_error' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.yestodayError=data.list[0].TOTAL;
			});
		},
		getCheckErrorList() {
			var params = { name: 'dayly_check_error' };
			httpservice.get(RESULT_URL, params).then(data=>{
				let item=data.list;
				for(var i=0;i<item.length;i++){
					this.days.push(item[i].NAME);
					this.daylyErrors.push(item[i].TOTAL);
				}
				this.drawLine();
			});
		},
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			let checkErrorChart = this.$echarts.init(document.getElementById('checkErrorChart'));
			
			// 绘制图表
			checkErrorChart.setOption({
				title:{},
				grid: {
					left: '18%',
					right: '4%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.days,
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
						data: this.daylyErrors,
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

<style lang="less">
	a{
		text-decoration: none;
	}
	#checkErrorChart{
		width: 630px;
		height: 300px;
	}
	.twodaysCheck{
		ul{
			display: flex;
			justify-content: flex-end;
			margin-right: 15px;
			li{
				margin-right: 15px;
				span{
					color: #fff;
					font-size: 20px;
				}
				a{
					font-size: 30px;
					color: #FCFE7C;
					font-weight: bold;
					padding-left: 10px;
				}
			}
		}
	}
</style>
