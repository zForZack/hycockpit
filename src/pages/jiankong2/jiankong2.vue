<template>
	<div id="jiankong2">
		<div class="header"><h2>天津大学数据应用驾驶舱</h2></div>
		<div class="contentBox">
			<div class="departmentListNumer">
				<div class="bg"></div>
				<departmentListNumer></departmentListNumer>
			</div>
			<div class="two-module">
				<div class="data-exchange">
					<div class="bg"></div>
					<dataExchange></dataExchange>
				</div>
				<div class="service-visit">
					<div class="bg"></div>
					<serviceVisit></serviceVisit>
				</div>
			</div>
			<div class="middle-module">
				<div class="mddle-module-top">
					<div class="allocation">
						<div class="bg"></div>
						<allocation></allocation>
					</div>
					<div class="monthly-data">
						<div class="bg"></div>
						<monthlyData></monthlyData>
					</div>
				</div>
				<div class="mddle-module-bottom">
					<div class="bg"></div>
					<checkError></checkError>
				</div>
			</div>
			<div class="two-module">
				<div class="health-data">
					<div class="bg"></div>
					<healthData></healthData>
				</div>
				<div class="problemState">
					<div class="bg"></div>
					<problemState></problemState>
				</div>
			</div>
			<div class="jobList">
				<div class="bg"></div>
				<jobList></jobList>
			</div>
		</div>
		<div class="footer">
			<jinkongFooter></jinkongFooter>
		</div>
	</div>
</template>

<script>
	import departmentListNumer from '../../components/departmentListNumer.vue'
	import dataExchange from '../../components/dataExchange.vue'
	import serviceVisit from '../../components/serviceVisit.vue'
	import allocation from '../../components/allocation.vue'
	import monthlyData from '../../components/monthly-data.vue'
	import checkError from '../../components/check-error.vue'
	import healthData from '../../components/health-data.vue'
	import jobList from '../../components/jobList.vue'
	import problemState from '../../components/problemState.vue'
	import jinkongFooter from '../../components/jiankongFooter.vue'
export default {
	name: 'jiankong2',
	components: {
		departmentListNumer,
		dataExchange,
		serviceVisit,
		allocation,
		monthlyData,
		checkError,
		healthData,
		jobList,
		problemState,
		jinkongFooter
	},
	methods: {}
};
</script>
<style lang="less">
* {
	margin: 0;
	padding: 0;
}
li{
	list-style: none;
}
body {
	background: url(../../../public/img/bg.png) no-repeat center;
	background-size: cover;
}
#jiankong2 {
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
.el-progress-bar__outer{
	height: 3px!important;
	background-color: rgba(255,255,255,0.2);
	overflow: visible;
}
.el-progress-bar__inner{
	height: 6px!important;
	bottom: 0;
	top: -3px;
}
.title {
	color: #76ffff;
	font-size: 22px;
	font-weight: bold;
	background: url(../../../public/img/headicon.png) no-repeat left center;
	text-align: left;
	padding-left: 30px;
	margin: 23px 16px;
	margin-bottom: 19px;
}
.header {
	width: 100%;
	height: 74px;
	line-height: 74px;
	color: #fff;
	background: url(../../../public/img/head-bg.png) no-repeat center;
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
.departmentListNumer{
	width: 284px;
	border-radius: 6px;
	height: 809px;
	position: relative;
	// overflow: hidden;
	background: transparent;
}
.two-module{
	width: 313px;
	height: 809px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.data-exchange{
		width: 313px;
		height: 394px;
		border-radius: 6px;
		position: relative;
	}
	.service-visit{
		width: 313px;
		height: 394px;
		border-radius: 6px;
		position: relative;
	}
	.health-data{
		width: 313px;
		height: 394px;
		border-radius: 6px;
		position: relative;
	}
	.problemState{
		width: 313px;
		height: 394px;
		border-radius: 6px;
		position: relative;
	}
}
.middle-module{
	width: 646px;
	height: 809px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.mddle-module-top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		.allocation{
			width: 313px;
			height: 394px;
			border-radius: 6px;
			position: relative;
		}
		.monthly-data{
			width: 313px;
			height: 394px;
			border-radius: 6px;
			position: relative;
		}
	}
	.mddle-module-bottom{
		width: 100%;
		height: 399px;
		border-radius: 6px;
		position: relative;
	}
}
.jobList{
	width: 284px;
	border-radius: 6px;
	height: 809px;
	position: relative;
	// overflow: hidden;
	background: transparent;
}
.footer {
	margin-top: 12px;
	width: 100%;
	height: 148px;
	position: relative;
	overflow: hidden;
	background: url(../../../public/img/footerbg.png) no-repeat center -1px;
}
</style>
