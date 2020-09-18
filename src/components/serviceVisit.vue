<template>
	<div>
		<h4 class="title">服务访问动态</h4>
		<div class="service-visit-table">
			<table>
				<thead>
					<tr>
						<td style="width: 65%;">访问接口</td>
						<td>访问时间</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="items in serviceVistList">
						<td class="interfaceName">{{items.NAME}}</td>
						<td class="visitTime">{{items.TOTAL}}</td>
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
				serviceVistList:[]
			}
		},
		created() {
			this.getServiceAccessDynamics();
		},
		methods: {
			getServiceAccessDynamics() {
				var params = { name: 'service_access_dynamics' };
				httpservice.get(RESULT_URL, params).then(data=>{
					this.serviceVistList=data.list;
				});
			}
		}
	}
</script>

<style lang="less">
	.service-visit-table{
		table{
			width: 100%;
			color: #fff;
			text-align: left;
			padding: 0 20px;
			font-size: 20px;
			table-layout: fixed;
			thead{
				line-height: 35px;
				color: #76ffff;
			}
			tbody{
				font-size: 18px;
				tr{
					td{
						line-height: 35px;
						&.interfaceName{
							width: 65%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							background: url(../../public/img/disc.png) no-repeat left center;
							padding-left: 20px;
						}
					}
				}
			}
		}
	}
</style>
