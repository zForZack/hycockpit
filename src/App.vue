<template>
	<div id="app">
		<div class="header"><h2>天津大学数据应用驾驶舱</h2></div>
		<div class="contentBox">
			<div class="teachers">
				<div class="bg"></div>
				<teacher></teacher>
			</div>
			<div class="students">
				<div class="bg"></div>
				<student></student>
			</div>
			<div class="middleContent">
				<div class="middleContentTop">
					<div class="discipline-construction">
						<div class="bg"></div>
						<disciplineConstruction></disciplineConstruction>
					</div>
					<div class="books-total">
						<div class="bg"></div>
						<booksTotal></booksTotal>
					</div>
				</div>
				<div class="research-expenditure">
					<div class="bg"></div>
					<researchExpenditure></researchExpenditure>
				</div>
			</div>
			<div class="floor-space">
				<div class="bg"></div>
				<floorSpace></floorSpace>
			</div>
			<div class="laboratory">
				<div class="bg"></div>
				<laboratory></laboratory>
			</div>
		</div>
		<div class="footer">
			<!-- <div class="bg"></div> -->
			<footerTemplate></footerTemplate>
		</div>
	</div>
</template>

<script>
import teacher from './components/teacher.vue';
import student from './components/student.vue';
import disciplineConstruction from './components/discipline-construction.vue';
import booksTotal from './components/booksTotal.vue';
import researchExpenditure from './components/researchExpenditure.vue';
import floorSpace from './components/floorSpace.vue';
import laboratory from './components/laboratory.vue';
import footerTemplate from './components/footerTemplate.vue';
import httpservice from '../common/service/httpservice.js'; // get, post请求封装
import { RESULT_URL } from '../common/config/serviceurl.js'; // 后台地址配置
export default {
	name: 'app',
	components: {
		teacher,
		student,
		disciplineConstruction,
		booksTotal,
		researchExpenditure,
		floorSpace,
		laboratory,
		footerTemplate
	},
	data() { // 定义变量
		return {
			shizi:{}
		};
	},
	created() { // 页面未加载之前执行
		//this.getShiziData();
	}, 
	methods: { // 定义方法
		getShiziData() {
			var params = { name: 'kyxm' };
			httpservice.get(RESULT_URL, params).then(data=>{
				var list = data.list;
				this.shizi = list[0];
				console.log(this.shizi.CYZYXM);
			});
		}
	} 
};
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
}
body {
	background: url(../public/img/bg.png) no-repeat center;
	background-size: cover;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/* margin-top: 60px; */
	// background: url(../public/img/bg.png) no-repeat center;
	// background-size: cover;
	height: 100%;
}
.header {
	width: 100%;
	height: 74px;
	line-height: 74px;
	color: #fff;
	background: url(../public/img/head-bg.png) no-repeat center;
	background-size: cover;
	margin-bottom: 37px;
}
.header h2 {
	font-size: 34px;
	font-weight: 500;
}
.contentBox {
	display: flex;
	justify-content: space-between;
}
.teachers {
	width: 284px;
	border-radius: 6px;
	height: 809px;
	position: relative;
	// overflow: hidden;
	background: transparent;
}
.students {
	width: 313px;
	height: 809px;
	border-radius: 6px;
	position: relative;
	// overflow: hidden;
	background: transparent;
}
.middleContent {
	width: 646px;
	height: 809px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.middleContentTop {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.discipline-construction {
			width: 313px;
			height: 394px;
			border-radius: 6px;
			position: relative;
			overflow: hidden;
		}
		.books-total {
			width: 313px;
			height: 394px;
			border-radius: 6px;
			position: relative;
			// overflow: hidden;
		}
	}
	.research-expenditure {
		width: 100%;
		height: 399px;
		border-radius: 6px;
		position: relative;
		// overflow: hidden;
	}
}
.floor-space {
	width: 313px;
	height: 809px;
	border-radius: 6px;
	position: relative;
	// overflow: hidden;
}
.laboratory {
	width: 277px;
	height: 809px;
	border-radius: 6px;
	position: relative;
	// overflow: hidden;
}
.footer {
	margin-top: 12px;
	width: 100%;
	height: 148px;
	position: relative;
	overflow: hidden;
	background: url(../public/img/footerbg.png) no-repeat center -1px;
}

.bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(1, 17, 163, 1);
	box-shadow: 0px 0px 10px 0px rgba(14, 252, 255, 0.77);
	opacity: 0.5;
	z-index: -1;
}

.el-carousel__container {
	height: 280px !important;
}
.el-carousel__button {
	width: 10px !important;
	height: 10px !important;
	border-radius: 50%;
	background: #000666;
}
.el-carousel__indicator.is-active button {
	background: #003bff;
}

@width1600-per: 0.8;
@width1366-per: 0.7;
@media screen and (max-width: 1600px) {
	.header {
		height: 74px*@width1600-per;
		line-height: 74px*@width1600-per;
		margin-bottom: 37px*@width1600-per;
	}
	.header h2 {
		font-size: 34px*@width1600-per;
	}
	.teachers {
		width: 284px*@width1600-per;
		border-radius: 6px*@width1600-per;
		height: 809px*@width1600-per;
	}
	.students {
		width: 313px*@width1600-per;
		height: 809px*@width1600-per;
		border-radius: 6px*@width1600-per;
	}
	.middleContent {
		width: 646px*@width1600-per;
		height: 809px*@width1600-per;
		.middleContentTop {
			.discipline-construction {
				width: 313px*@width1600-per;
				height: 394px*@width1600-per;
				border-radius: 6px*@width1600-per;
			}
			.books-total {
				width: 313px*@width1600-per;
				height: 394px*@width1600-per;
				border-radius: 6px*@width1600-per;
			}
		}
		.research-expenditure {
			height: 399px*@width1600-per;
			border-radius: 6px*@width1600-per;
		}
	}
	.floor-space {
		width: 313px*@width1600-per;
		height: 809px*@width1600-per;
		border-radius: 6px*@width1600-per;
	}
	.laboratory {
		width: 277px*@width1600-per;
		height: 809px*@width1600-per;
		border-radius: 6px*@width1600-per;
	}
	.footer {
		margin-top: 12px*@width1600-per;
		height: 148px*@width1600-per;
	}
	.el-carousel__container {
		height: 280px*@width1600-per !important;
	}
	.el-carousel__button {
		width: 10px*@width1600-per !important;
		height: 10px*@width1600-per !important;
	}
}
@media screen and (max-width: 1366px) {
	.header {
		height: 74px*@width1366-per;
		line-height: 74px*@width1366-per@width1366-per;
		margin-bottom: 37px*@width1366-per;
	}
	.header h2 {
		font-size: 34px*@width1366-per;
	}
	.teachers {
		width: 284px*@width1366-per;
		border-radius: 6px*@width1366-per;
		height: 809px*@width1366-per;
	}
	.students {
		width: 313px*@width1366-per;
		height: 809px*@width1366-per;
		border-radius: 6px*@width1366-per;
	}
	.middleContent {
		width: 646px*@width1366-per;
		height: 809px*@width1366-per;
		.middleContentTop {
			.discipline-construction {
				width: 313px*@width1366-per;
				height: 394px*@width1366-per;
				border-radius: 6px*@width1366-per;
			}
			.books-total {
				width: 313px*@width1366-per;
				height: 394px*@width1366-per;
				border-radius: 6px*@width1366-per;
			}
		}
		.research-expenditure {
			height: 399px*@width1366-per;
			border-radius: 6px*@width1366-per;
		}
	}
	.floor-space {
		width: 313px*@width1366-per;
		height: 809px*@width1366-per;
		border-radius: 6px*@width1366-per;
	}
	.laboratory {
		width: 277px*@width1366-per;
		height: 809px*@width1366-per;
		border-radius: 6px*@width1366-per;
	}
	.footer {
		margin-top: 12px*@width1366-per;
		height: 148px*@width1366-per;
	}
	.el-carousel__container {
		height: 280px*@width1366-per !important;
	}
	.el-carousel__button {
		width: 10px*@width1366-per !important;
		height: 10px*@width1366-per !important;
	}
}
</style>
