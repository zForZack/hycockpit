<template>
	<div id="cockpit">
		<div class="header"><h2>综合校情大数据总览</h2></div>
		<div class="contentBox">
			<div class="personnelTrainning">
				<personnelTraining></personnelTraining>
			</div>
		</div>
	</div>
</template>

<script>
	import personnelTraining from 'cockpit/personnelTraining.vue'
export default {
	name: 'cockpit',
	components: {
		personnelTraining
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
html{
	height: 100%;
}
body {
	height: 100%;
	background: url(../../../public/img/hy/bg1.png) no-repeat center;
	background-size: cover;
}
#cockpit {
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
.header {
	width: 100%;
	height: 74px;
	line-height: 74px;
	color: rgba(77, 126, 200, 1);//rgba(77, 126, 200, 1)
	background: url(../../../public/img/hy/headbar.png) no-repeat center;
	background-size: auto;
	margin-bottom: 30px;
}
.header h2 {
	font-size: 34px;
	font-weight: 500;
}
.contentBox {
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
}
.personnelTrainning{
	width: 340px;
	height: 410px;
	border-radius: 6px;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/rcpy.png)  no-repeat center;
	background-size: 100% 100%;
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
