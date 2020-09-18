<template>
	<div class="booksTotalContnet">
		<h4 class="title">图书总量</h4>
		<div class="booksTotalTable">
			<table>
				<tbody>
					<tr v-for="item in items">
						<td>{{ item.NAME }}</td>
						<td>
							{{ item.TOTAL }}
							<span>{{item.UNIT}}</span>
						</td>
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
			items: []
		};
	},
	created() { // 页面未加载之前执行
	
		this.getTushuData();
	},
	methods: {
		getTushuData() {
			var params = { name: 'tushu' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.items = data.list;
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
.booksTotalTable {
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
						width: 35px;
						display: inline-block;
						font-weight: 400;
					}
				}
			}
		}
	}
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
	.booksTotalTable {
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
							width: 35px*@width1600-per;
						}
					}
				}
			}
		}
	}
}
@media screen and (max-width: 1366px) {
	.title {
		font-size: 22px*@width1366-per;
		padding-left: 30px*@width1366-per;
		margin: 23px*@width1366-per 16px*@width1366-per;
		margin-bottom: 19px*@width1366-per;
	}
	.booksTotalTable {
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
							width: 35px*@width1366-per;
						}
					}
				}
			}
		}
	}
}
</style>