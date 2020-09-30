<template>
	<div id="cockpit">
		<bg></bg>
		<div class="header">
			<div class="header-bg"></div>
			<h2>综合校情大数据总览</h2>
			<div class="bgline"></div>
		</div>
		<div class="contentBox">
			<div class="left-content">
				<div class="personnelTrainning">
					<personnelTraining></personnelTraining>
				</div>
				<div class="DisciplineConstruction">
					<disciplineConstruction></disciplineConstruction>
				</div>
			</div>
			<div class="mid-content">
				<div class="systemLogin">
					<systemLogin></systemLogin>
				</div>
				<div class="schoolProfile">
					<schoolProfile></schoolProfile>
				</div>
			</div>
			<div class="right-content">
				<div class="schoolRunningConditions">
					<schoolRunningConditions></schoolRunningConditions>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bg from 'mycomponents/bg.vue'
	import personnelTraining from 'cockpit/personnelTraining.vue'
	import disciplineConstruction from 'cockpit/disciplineConstruction.vue'
	import systemLogin from 'cockpit/systemLogin.vue'
	import schoolProfile from 'cockpit/schoolProfile.vue'
	import schoolRunningConditions from 'cockpit/schoolRunningConditions.vue'
export default {
	name: 'cockpit',
	components: {
		bg,
		personnelTraining,
		disciplineConstruction,
		systemLogin,
		schoolProfile,
		schoolRunningConditions
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
	font-size: 20px;
}
body {
	height: 100%;
	font-size: 16px;
	span{
		font-weight: bold;
	}
}
#cockpit {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
.header {
	position: relative;
	width: 100%;
	height: 6vh;
	line-height: 6vh;
	color: rgba(95, 155, 245, 1);//rgba(77, 126, 200, 1)
	background-image: url(../../../public/img/hy/headbar.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: auto;
	margin-bottom: 2vh;
	.header-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(270deg, rgba(17, 24, 111, 0.08) 0%, rgba(19, 52, 222, 0.16) 54%, rgba(17, 24, 111, 0.08) 100%);
	}
}
.header h2 {
	font-size: 1.5rem;
	font-weight: bold;
}
.header .bgline{
	width: 1144px;
	height: 3px;
	background: linear-gradient(270deg, rgba(29, 103, 255, 0) 0%, #3F7AFF 52%, rgba(29, 103, 255, 0) 100%);
	box-shadow: 0px 0px 6px 1px rgba(138, 143, 173, 0.5);
	margin: 0 auto;
}
.contentBox {
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
	height: 91vh;
	flex-direction: row;
}
.left-content,.mid-content,.right-content{
	width: 325px;
	height: 100%;
	display: inherit;
	flex-direction: column;
}
.mid-content{
	width: 635px;
}
.personnelTrainning{
	height: 56%;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/rcpy@2x.png)  no-repeat center;
	background-size: 100% 100%;
}
.DisciplineConstruction{
	height: 40%;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/xkjs@2x.png)  no-repeat center;
	background-size: 100% 100%;
}
.systemLogin{
	width: 100%;
	height: 40%;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/xtdlqk@2x.png)  no-repeat center;
	background-size: 100% 100%;
}
.schoolProfile{
	width: 100%;
	height: 58%;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/xxgk@2x.png)  no-repeat center;
	background-size: 100% 100%;
}
.schoolRunningConditions{
	width: 100%;
	height: 100%;
	position: relative;
	// overflow: hidden;
	background: url(../../../public/img/hy/bxtj@2x.png)  no-repeat center;
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
@media screen and (max-width:1920px)  {
	.contentBox{
		height: 91vh;
		justify-content: space-evenly;
	}
	.personnelTrainning{
		height: 56%;
	}
	.DisciplineConstruction{
		margin-top: 5%;
	}
	.mid-content{
		width: 840px;
	}
	.systemLogin{
		height: 36%;
	}
	.schoolProfile{
		height: 60%;
		margin-top: 2%;
	}
	.schoolRunningConditions{
		height: 98%;
	}
}
@media screen and (max-width:1600px)  {
	html,body{
		font-size: 14px;
	}
	.contentBox{
		height: 91vh;
	}
	.mid-content{
		width: 800px;
	}
	.header{
		height: 6vh;
		line-height: 6vh;
		margin-bottom: 2vh;
		h2{
			font-size: 2rem;
		}
	}
	.personnelTrainning{
		height: 52%;
	}
	.DisciplineConstruction{
		height: 44%;
		margin-top: 5%;
	}
	.systemLogin{
		height: 36%;
	}
	.schoolProfile{
		height: 60%;
		margin-top: 2%;
	}
	.schoolRunningConditions{
		height: 89.5vh;
	}
}
@media screen and (max-width:1366px)  {
	html,body{
		font-size: 14px;
	}
	.contentBox{
		height: 92vh;
	}
	.header{
		height: 6vh;
		line-height: 6vh;
		margin-bottom: 2vh;
		h2{
			font-size: 30px;
		}
	}
	.mid-content{
		width: 635px;
	}
	.personnelTrainning{
		height: 56%;
	}
	.DisciplineConstruction{
		height: 39%;
		margin-top: 5%;
	}
	.systemLogin{
		height: 36%;
	}
	.schoolProfile{
		height: 59.4%;
		margin-top: 2%;
	}
	.schoolRunningConditions{
		height: 89.6vh;;//89.6vh;
	}
}
</style>
