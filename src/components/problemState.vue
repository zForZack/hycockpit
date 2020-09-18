<template>
	<div class="problemStateTemplate">
		<h4 class="title">数据不同类型问题状态</h4>
		<div class="problemStateTable">
			<table>
				<thead>
					<tr>
						<td style="width: 25%;">规则类型</td>
						<td style="width: 25%;">问题数量</td>
						<td style="width: 20%;">较上次</td>
						<td style="width: 30%;">近三月趋势</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(items, index) in dataList">
						<td>{{ items.NAME }}</td>
						<td>{{ items.TOTAL }}</td>
						<td>
							<span>{{ items.COMPARE }}</span>
							<i :class="items.COMPARE >= 0 ? 'el-icon-top' : 'el-icon-bottom'"></i>
						</td>
						<td><div :id="'problemTrend' + index" style="width: 100%; height: 35px;" ref="chart"></div></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			dataList:[]
		};
	},
	created() {
		this.getProblemList();
	},
	watch:{
		dataList(){
			this.$nextTick(()=>{
				//异步获取dataList，数据赋值后画趋势图
				let item=this.dataList;
				for(var i=0;i<item.length;i++){
					var before_last_month = item[i].BEFORE_LAST_MONTH;
					var last_month = item[i].LAST_MONTH;
					var this_month = item[i].THIS_MONTH;
					var	dataArray=new Array() ;//将字符转化成数字
					dataArray.push(parseFloat(before_last_month));
					dataArray.push(parseFloat(last_month));
					dataArray.push(parseFloat(this_month));
					this.drawLine('problemTrend'+i, dataArray);

				}
			});
		}
	},

	methods: {
		getProblemList() {
			var params = { name: 'different_data_types_problem' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.dataList = data.list;
			});
		},
		drawLine(name,monthDatas) {
			let problemTrend = this.$echarts.init(document.getElementById(name));
			problemTrend.setOption({
				title: {},
				grid: {
					x: 8,
					y: 5,
					x2: 2,
					y2: 5
				},
				xAxis: {
					show: false,
					type: 'category',
					boundaryGap: false,
					data: ['The month before last', 'last month', 'this month']
				},
				yAxis: {
					show: false,
					type: 'value'
				},
				series: [
					{
						name: '每月销量趋势',
						type: 'line',
						radius: '50%',
						center: ['50%', '50%'],
						data: monthDatas
					}
				],
				textStyle: {
					color: '#B0C8FF',
					fontSize: 18
				}
			});
		}
	},
	
};
</script>

<style lang="less">
// #problemTrend {
// 	// width: 80px;
// 	// height: 25px;
// }
.problemStateTable {
	color: #3ae4fe;
	font-size: 16px;
	table {
		width: 100%;
		padding: 0 10px;
		line-height: 40px;
		// table-layout: fixed;
		thead {
			color: #fff;
		}
		tbody {
			tr {
				td {
					.el-icon-top {
						color: red;
					}
					.el-icon-bottom {
						color: #00ff00;
					}
				}
			}
		}
	}
}
</style>
