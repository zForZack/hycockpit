<template>
	<div class="data-exchange-template">
		<div class="twodaysData">
			<ul>
				<li>
					<div>昨日数据交换</div>
					<span>{{yestodayExchangeAmount}}</span>
				</li>
				<li>
					<div>今日数据交换</div>
					<span>{{todayExchangeAmount}}</span>
				</li>
			</ul>
		</div>
		<h4 class="title">今日数据交换Top5</h4>
		<div class="data-exchange-top">
			<table>
				<thead>
					<tr>
						<td style="width: 8%;"></td>
						<td style="width: 72%;">部门</td>
						<td style="width: 20%;">数量</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(items,index) in dataExchangeList">
						<td class="index">{{index+1}}</td>
						<td class="departmentName">{{items.NAME}}</td>
						<td class="departmentData">{{items.TOTAL}}</td>
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
			dataExchangeList: [],
			yestodayExchangeAmount:'',
			todayExchangeAmount:'',
		}
	},
	created() {
		this.getYestodayExchangeAmount();
		this.getTodayExchangeAmount();
		this.getExchangeList();
	},
	methods: {
		getYestodayExchangeAmount() {
			var params = { name: 'yestoday_data_exchange_total' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.yestodayExchangeAmount = data.list[0].TOTAL;
			});
		},
		getTodayExchangeAmount() {
			var params = { name: 'today_data_exchange_total' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.todayExchangeAmount = data.list[0].TOTAL;
			});
		},
		getExchangeList() {
			var params = { name: 'data_exchange_list' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.dataExchangeList = data.list;
			});
		}
	}
	
}
</script>

<style lang="less">
	.twodaysData{
		ul{
			display: flex;
			justify-content: space-between;
			padding: 15px 10px 0 10px;
			li{
				text-align: left;
				>div{
					color: #fff;
					margin-bottom: 15px;
				}
				>span{
					color: #FBFD7B;
					font-size: 34px;
					font-weight: bold;
				}
			}
			
		}
	}
	.data-exchange-top{
		table{
			width: 100%;
			padding: 0 20px;
			color: #fff;
			font-size: 18px;
			table-layout: fixed;
			text-align: left;
			thead{
				color: #76ffff;
				line-height: 35px;
			}
			tbody{
				tr{
					td{
						font-size: 16px;
						line-height: 30px;
						&.index{
							color: #76ffff;
							width: 8%;
						}
						&.departmentName{
							width: 72%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
