<template>
	<div class="footerTemplate">
		<div><img alt="Vue logo" src="../../public/img/logo-2.png" /></div>
		<ul>
			<li v-for="item in items">
				<h6>{{ item.NAME }}</h6>
				<div>
					<span>{{ item.TOTAL }}</span>
				</div>
			</li>
		</ul>
		<div><img alt="Vue logo" src="../../public/img/qrcode-right.png" /></div>
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
		this.getItems();
	},
	methods: {
		getItems() {
			var params = { name: 'monitor_foot' };
			httpservice.get(RESULT_URL, params).then(data=>{
				this.items = data.list;
			});
		}
	}
};
</script>

<style scoped="scoped" lang="less">
ul,
li {
	list-style: none;
}
.footerTemplate {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	vertical-align: middle;
	padding: 0 102px;
	img{
		margin-top: 30px;
		width: 90px;
		// height: 115px;
	}
	ul {
		margin-top: 30px;
		width: 980px;
		display: flex;
		justify-content: space-between;
		li {
			text-align: left;
			line-height: 48px;
			h6 {
				color: #fff;
				font-size: 20px;
				font-weight: 400;
			}
			> div {
				color: #76ffff;
				font-size: 18px;
				> span {
					color: #f5877a;
					font-size: 38px;
					font-weight: bold;
				}
			}
			&:nth-of-type(2) {
				> div {
					> span {
						color: #f8ab59;
					}
				}
			}
			&:nth-of-type(3) {
				> div {
					> span {
						color: #7cee8e;
					}
				}
			}
			&:nth-of-type(4) {
				> div {
					> span {
						color: #33beff;
					}
				}
			}
			&:nth-of-type(5) {
				> div {
					> span {
						color: #9d8cfc;
					}
				}
			}
		}
	}
}
// @width1600-per: 0.8;
// @width1366-per: 0.7;
// @media screen and (max-width: 1600px) {
// 	.footerTemplate {
// 		padding: 0 102px*@width1600-per;
// 		img{
// 			width: 115px*@width1600-per;
// 			// height: 115px*@width1600-per;
// 		}
// 		ul {
// 			width: 980px*@width1600-per;
// 			li {
// 				line-height: 48px*@width1600-per;
// 				h6 {
// 					font-size: 20px*@width1600-per;
// 				}
// 				> div {
// 					font-size: 14px*@width1600-per;
// 					> span {
// 						font-size: 38px*@width1600-per;
// 					}
// 				}
// 				&:nth-of-type(2) {
// 					> div {
// 						> span {
// 							color: #4ef48d;
// 						}
// 					}
// 				}
// 				&:nth-of-type(3) {
// 					> div {
// 						> span {
// 							color: #fd7e6f;
// 						}
// 					}
// 				}
// 				&:nth-of-type(4) {
// 					> div {
// 						> span {
// 							color: #fca44e;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
// @media screen and (max-width: 1366px) {
// 	.footerTemplate {
// 		padding: 0 102px*@width1366-per;
// 		img{
// 			width: 115px*@width1366-per;
// 			height: 115px*@width1366-per;
// 		}
// 		ul {
// 			width: 980px*@width1366-per;
// 			li {
// 				line-height: 48px*@width1366-per;
// 				h6 {
// 					font-size: 20px*@width1366-per;
// 				}
// 				> div {
// 					font-size: 14px*@width1366-per;
// 					> span {
// 						font-size: 38px*@width1366-per;
// 					}
// 				}
// 				&:nth-of-type(2) {
// 					> div {
// 						> span {
// 							color: #4ef48d;
// 						}
// 					}
// 				}
// 				&:nth-of-type(3) {
// 					> div {
// 						> span {
// 							color: #fd7e6f;
// 						}
// 					}
// 				}
// 				&:nth-of-type(4) {
// 					> div {
// 						> span {
// 							color: #fca44e;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
</style>
