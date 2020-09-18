<template>
	<div class="container">
		<div class="floorSpaceList">
			<h4 class="title">卫津路校区占地用房</h4>
			<div class="listHeader">
				<h6>总占地面积（万㎡）</h6>
				<span>{{ item.ZZDMJ1 }}</span>
			</div>
			<div class="listTable">
				<table>
					<tbody>
						<tr>
							<td>建筑面积</td>
							<td>
								<span>{{ item.JZMJ1 }}</span>
								万㎡
							</td>
						</tr>
						<tr>
							<td>学科研用房</td>
							<td>
								<span>{{ item.JXMJ }}</span>
								万㎡
							</td>
						</tr>
						<tr>
							<td>图书馆2座</td>
							<td>
								<span>{{ item.TSG1 }}</span>
								万㎡
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="floorSpaceList">
			<h4 class="title">北洋园校区占地用房</h4>
			<div class="listHeader">
				<h6>总占地面积（万㎡）</h6>
				<span>{{ item.ZZDMJ2 }}</span>
			</div>
			<div class="listTable">
				<table>
					<tbody>
						<tr>
							<td>建筑面积</td>
							<td>
								<span>{{ item.JZMJ1 }}</span>
								万㎡
							</td>
						</tr>
						<tr>
							<td>图书馆2座</td>
							<td>
								<span>{{ item.TSG2 }}</span>
								万㎡
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import httpservice from '../../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../../common/config/serviceurl.js'; // 后台地址配置
export default {
	data() {
		return {
			item: {}
		};
	},
	created() { // 页面未加载之前执行
	
		this.getZhandimianjiData();
	},
	methods: {
		getZhandimianjiData() {
			var params = { name: 'zhandimianji' };
			httpservice.get(RESULT_URL, params).then(data=>{
				let items = data.list;
				console.log(items);
				this.item = items[0];
				console.log(this.item);
			});
		}
	}
};
</script>

<style scoped="scoped" lang="less">
.container {
	height: 100%;
}
.floorSpaceList {
	&:first-of-type {
		margin-bottom: 100px;
	}
	.title {
		color: #76ffff;
		font-size: 22px;
		font-weight: bold;
		background: url(../../public/img/headicon.png) no-repeat left center;
		text-align: left;
		padding-left: 30px;
		margin: 23px 16px;
		margin-bottom: 42px;
	}
	.listHeader {
		width: 200px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
		h6 {
			color: #fefefe;
			font-size: 18px;
			font-weight: 500;
		}
		span {
			color: #fcfe7c;
			font-size: 34px;
			font-weight: bold;
		}
	}
	.listTable {
		table {
			width: 100%;
			border-spacing: 0;
			tr {
				width: 100%;
				height: 55px;
				line-height: 55px;
				td {
					font-size: 18px;
					color: #fff;
					width: 50%;
					&:first-of-type {
						text-align: left;
						// font-weight: bold;
						padding-left: 20px;
					}
					&:last-of-type {
						text-align: right;
						color: #76ffff;
						font-size: 16px;
						padding-right: 20px;
						span {
							color: #FCFE7C;
							font-size: 18px;
							margin-left: 10px;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
}
@width1600-per: 0.8;
@width1366-per: 0.7;
@media screen and (max-width: 1600px) {
	.floorSpaceList {
		&:first-of-type {
			margin-bottom: 100px*@width1600-per;
		}
		.title {
			font-size: 22px*@width1600-per;
			padding-left: 30px*@width1600-per;
			margin: 23px*@width1600-per 16px*@width1600-per;
			margin-bottom: 42px*@width1600-per;
		}
		.listHeader {
			width: 200px*@width1600-per;
			margin-bottom: 20px*@width1600-per;
			margin-left: 20px*@width1600-per;
			h6 {
				font-size: 18px*@width1600-per;
			}
			span {
				font-size: 34px*@width1600-per;
			}
		}
		.listTable {
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
							font-size: 16px*@width1600-per;
							padding-right: 20px*@width1600-per;
							span {
								font-size: 18px*@width1600-per;
								margin-left: 10px*@width1600-per;
							}
						}
					}
				}
			}
		}
	}
}
@media screen and (max-width: 1366px) {
	.floorSpaceList {
		&:first-of-type {
			margin-bottom: 100px*@width1366-per;
		}
		.title {
			font-size: 22px*@width1366-per;
			padding-left: 30px*@width1366-per;
			margin: 23px*@width1366-per 16px*@width1366-per;
			margin-bottom: 42px*@width1366-per;
		}
		.listHeader {
			width: 200px*@width1366-per;
			margin-bottom: 20px*@width1366-per;
			margin-left: 20px*@width1366-per;
			h6 {
				font-size: 18px*@width1366-per;
			}
			span {
				font-size: 34px*@width1366-per;
			}
		}
		.listTable {
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
							font-size: 16px*@width1366-per;
							padding-right: 20px*@width1366-per;
							span {
								font-size: 18px*@width1366-per;
								margin-left: 10px*@width1366-per;
							}
						}
					}
				}
			}
		}
	}
}
</style>
