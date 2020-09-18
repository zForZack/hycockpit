<template>
	<div class="jobListTemplate">
		<h4 class="title">作业列表统计</h4>
		<div class="jobListTable">
			<table>
				<thead>
					<tr>
						<td width="70%">业务系统</td>
						<td>作业量</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="items in jobList">
						<td class="systemName">{{items.NAME}}</td>
						<td class="jobQuantity">{{items.TOTAL}}</td>
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
				jobList: []
			}
		},
		created() {
			this.getJobList();
		},
		methods: {
			getJobList() {
				var params = { name: 'job_list_stat' };
				httpservice.get(RESULT_URL, params).then(data=>{
					this.jobList = data.list;
				});
			}
		}
	}
</script>

<style lang="less">
	.jobListTable{
		table{
			width: 100%;
			table-layout: fixed;
			color: #fff;
			padding: 0 15px;
			line-height: 35px;
			text-align: left;
			thead{
				color: #38e4ff;
				font-size: 18px;
				tr{
					td{
						padding-left: 10px;
					}
				}
			}
			tbody{
				tr{
					td{
						&.systemName{
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						&.jobQuantity{
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
