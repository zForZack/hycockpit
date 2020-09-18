<template>
	<div class="teachersTemplate">
		<h4 class="title">师资</h4>
		<div class="aptitudeTable">
			<table>
				<tbody>
					<tr v-for="item in items">
						<td>{{ item.NAME }}</td>
						<td>
							{{ item.TOTAL }}
							<span>人</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 柱状图 -->
		<div id="myChart"></div>
	</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	name: 'teacher',
	data() {
		return {
			//items: [{ name: '正高', number: '891' }, { name: '副高', number: '1469' }, { name: '中级', number: '1561' }, { name: '初级', number: '310' }]
			items: [],
			names:[],
			totals:[]
		};
	},
	created() { // 页面未加载之前执行
		this.getShiziData();
	},
	methods: {
		getShiziData() {
			var params = { name: 'shizi' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.items = data.list;
				for (var i = 0; i < this.items.length; i++) {
					this.names.push(this.items[i].NAME);
					this.totals.push(this.items[i].TOTAL);
				}
				this.drawLine();
			});
			
		},
		
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById('myChart'));
			// 绘制图表
			myChart.setOption({
				title: {
					text: '职级维度',
					textStyle: {
						color: 'rgba(254,255,255,1)',
						fontSize: 18,
						fontWeight: 400
					}
				},
				grid: {
					left: '23%',
					right: '3%'
				},
				tooltip: {},
				xAxis: {
					data: this.names,
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
							fontSize: 15
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
							fontSize: 13
						}
					}
				},
				series: [
					{
						name: '人数',
						type: 'bar',
						data: this.totals,
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
					fontSize: 30
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
	margin-bottom: 19px;
}
.aptitudeTable {
	margin: 0 10px;
	table {
		width: 100%;
		border-spacing: 0;
		table-layout: fixed;
		tr {
			width: 100%;
			height: 55px;
			line-height: 55px;
			&:nth-child(odd) {
				background: rgba(96, 165, 217, 0.2);
				border-radius: 4px;
			}
			td {
				width: 50%;
				font-size: 18px;
				color: #fff;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				&:first-of-type {
					text-align: left;
					// font-weight: bold;
					padding-left: 20px;
				}
				&:last-of-type {
					text-align: right;
					color: #FCFE7C;
					font-size: 18px;
					padding-right: 20px;
					font-weight: bold;
					span {
						color: #76ffff;
						font-size: 16px;
						margin-left: 10px;
						font-weight: 400;
					}
				}
			}
		}
	}
}
#myChart {
	margin: 0 auto;
	margin-top: 110px;
	height: 280px;
	width: 280px;
}
@width1600-per: 0.8;
@width1366-per: 0.7;
@media screen and (max-width: 1600px) {
	.title {
		font-size: 22px*@width1600-per;
		padding-left: 30px*@width1600-per;
		margin: 23px*@width1600-per 16px*@width1600-per;
		margin-bottom: 19px*@width1600-per;
	}
	.aptitudeTable {
		margin: 0 10px*@width1600-per;
		table {
			tr {
				height: 55px*@width1600-per;
				line-height: 55px*@width1600-per;
				td {
					font-size: 18px*@width1600-per;
					&:first-of-type {
						padding-left: 20px*@width1600-per;
					}
					&:last-of-type {
						font-size: 18px*@width1600-per;
						padding-right: 20px*@width1600-per;
						span {
							font-size: 16px*@width1600-per;
							margin-left: 10px*@width1600-per;
						}
					}
				}
			}
		}
	}
	#myChart {
		margin-top: 110px*@width1600-per;
		height: 280px*@width1600-per;
		width: 280px*@width1600-per;
	}
}
@media screen and (max-width: 1366px) {
	.title {
		font-size: 22px*@width1366-per;
		padding-left: 30px*@width1366-per;
		margin: 23px*@width1366-per 16px*@width1366-per;
		margin-bottom: 19px*@width1366-per;
	}
	.aptitudeTable {
		margin: 0 10px*@width1366-per;
		table {
			tr {
				height: 55px*@width1366-per;
				line-height: 55px*@width1366-per;
				td {
					font-size: 18px*@width1366-per;
					&:first-of-type {
						padding-left: 20px*@width1366-per;
					}
					&:last-of-type {
						font-size: 18px*@width1366-per;
						padding-right: 20px*@width1366-per;
						span {
							font-size: 16px*@width1366-per;
							margin-left: 10px*@width1366-per;
						}
					}
				}
			}
		}
	}
	#myChart {
		margin-top: 110px*@width1366-per;
		height: 280px*@width1366-per;
		width: 280px*@width1366-per;
	}
}
</style>
