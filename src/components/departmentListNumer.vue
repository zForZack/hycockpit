<template>
	<div class="departmentListTemplte">
		<h4 class="title">部门表数量</h4>
		<div class="departmentList">
			<ul>
				<li v-for="items in departmentList">
					<div class="listTitle">
						<div>
							<span class="departmentNumber">{{items.UNIT}}</span>
							<span class="departmentName">{{items.NAME}}</span>
						</div>
						<div class="departmentPercent">{{items.TOTAL}}</div>
					</div>
					<el-progress :percentage="items.percentage" :color="customColor" :show-text="false"></el-progress>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			// percentage: '',
			customColor: '#72e8fb',
			departmentList: []
		};
	},
	created(){
		this.getDepartmentList();
	},
	methods: {
		getDepartmentList(){
			var params = { name: 'dept_table_amount' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.departmentList = data.list;
			});
		}

		// customColorMethod(percentage) {
		// 	if (percentage < 30) {
		// 		return '#72e8fb';
		// 	} else if (percentage < 70) {
		// 		return '#e6a23c';
		// 	} else {
		// 		return '#67c23a';
		// 	}
		// },
		// increase() {
		// 	this.percentage += 10;
		// 	if (this.percentage > 100) {
		// 		this.percentage = 100;
		// 	}
		// },
		// decrease() {
		// 	this.percentage -= 10;
		// 	if (this.percentage < 0) {
		// 		this.percentage = 0;
		// 	}
		// }
	}
};
</script>

<style lang="less">
	.departmentList{
		padding: 10px;
		ul{
			li{
				margin-bottom: 22px;
				.listTitle{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20px;
					>div{
						.departmentNumber{
							color: #72e8fb;
							font-weight: 600;
							font-size: 20px;
							margin-right: 20px;
						}
						.departmentName{
							color: #fff;
							font-size: 18px;
						}
					}
					.departmentPercent{
						color: #72e8fb;
						font-weight: 600;
						font-size: 18px;
					}
				}
			}
		}
	}
</style>
