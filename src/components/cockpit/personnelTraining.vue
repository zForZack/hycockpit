<template>
	<div class="personnelTemplate">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<!-- 招生情况条形图 -->
		<div class="chart-title">招生情况</div>
		<div class="All-info">
			<p>总全校招生：<span>{{newStudent}}</span>人</p>
			<p>总报到率：<span>{{registeringRate}}</span></p>
		</div>
		<div class="personnelContent">
			<div id="personnelChart"></div>
			<div class="sexBar">
				<div class="blueBar">男</div>
				<div class="pinkBar">女</div>
			</div>
		</div>
		<div class="chart-title2">在校情况</div>
		<div class="All-info2">
			<p>在校总人数：<span>{{studentNumber}}</span>人</p>
		</div>
		<div class="schoolContent">
			<div class="sexContent">
				<div class="blueNum"><span>{{zxs_nan}}</span> 男生</div>
				<div class="pinkNum"><span>{{zxs_nv}}</span> 女生</div>
			</div>
			<div id="schoolChart"></div>
		</div>
		<div class="chart-title2">毕业人数</div>
		<div class="All-info2">
			<p>毕业总人数：<span>{{graduatesNumber}}</span>人</p>
		</div>
		<div class="graduatesContent">
			<div id="graduatesChart"></div>
			<div class="sexBar">
				<div class="blueBar">男</div>
				<div class="pinkBar">女</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moudleheader from 'mycomponents/moudleHeader'
	import echarts from 'echarts/lib/echarts'
	import httpservice from 'common/service/httpservice.js'; // get, post请求封装
	import { RESULT_URL } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V1 } from 'common/config/serviceurl.js'; // 后台地址配置
	import { MONITOR_URL_V2 } from 'common/config/serviceurl.js'; // 后台地址配置
	export default {
		data() {
			return {
				personnelData: {
					bks_xzs_男 : 0, 
					yjs_xzs_女: 0,
					yjs_xzs_男: 0,
					bks_zxs_女: 0,
					bks_zxs_男: 0, 
					yjs_zxs_女: 0,
					yjs_zxs_男: 0,
					bks_byss_女: 0,
					bks_byss_男: 0,
					yjs_byss_女: 0,
					yjs_byss_男: 0,

					yjsAll:'150',
					yjsboy:'75',
					yjsgirl:'65',
					bksAll:'130',
					bksboy:'55',
					bksgirl:'77'
				},
				zxs_nan: 0,
				zxs_nv: 0,
				newStudent: '',
				registeringRate:'',
				studentNumber:'',
				graduatesNumber:'',
				title: '人才培养',
				screenWidth:'',
				screenHeight:'',
				gridOption:[],
				gridOption3:[],
			}
		},
		components:{
			moudleheader
		},
		created() {
			this.getPersonnelData();
			this.newStudent = 9658;
			this.studentNumber = 9060;
			this.graduatesNumber = 8200;
			this.registeringRate = 98+'%';
		},
		mounted() {
			this.screenWidth = document.body.clientWidth
			this.screenHeight = document.body.clientHeight
		},
		methods: {
			getPersonnelData() {
				var params={ name: 'persontrain'};
				httpservice.get(MONITOR_URL_V2, params)
				.then(data=>{ 
					var objs = data.data.sqlRes;
					var obj = {};
					for (const key in objs) {
						if (objs.hasOwnProperty(key)) {
							const element = objs[key];
							element.forEach(item => {
								obj[key+'_'+item.XB] = item.NUM;
							});
						}
					}
					this.personnelData = obj;
					// 新生
					this.newStudent = obj.bks_xzs_女 + obj.bks_xzs_男 + 
										obj.yjs_xzs_女 + obj.yjs_xzs_男;
					// 学生总数
					this.studentNumber = obj.bks_zxs_女 + obj.bks_zxs_男 + 
											obj.yjs_zxs_女 + obj.yjs_zxs_男;
					// 毕业生数
					this.graduatesNumber = obj.bks_byss_女 + obj.bks_byss_男 + 
											obj.yjs_byss_女 + obj.yjs_byss_男;	
					this.zxs_nan = obj.bks_zxs_男 + obj.yjs_zxs_男;
					this.zxs_nv  = obj.bks_zxs_女 + obj.yjs_zxs_女;

					this.drawLine(this.personnelData.yjs_xzs_男 + this.personnelData.yjs_xzs_女
								 ,this.personnelData.bks_xzs_男 + this.personnelData.bks_xzs_女
								 ,this.personnelData.yjs_xzs_男
								 ,this.personnelData.bks_xzs_男);
					this.drawLine2();
					this.drawLine3(this.personnelData.yjs_byss_男 + this.personnelData.yjs_byss_女
								 ,this.personnelData.bks_byss_男 + this.personnelData.bks_byss_女
								 ,this.personnelData.yjs_byss_男
								 ,this.personnelData.bks_byss_男);
				});
			},
			drawLine(yjs_max, bks_max, yjs_n, bks_n) {
				let personnelChart = this.$echarts.init(document.getElementById('personnelChart'));
				if( this.screenWidth <= 1366){
					if(this.screenHeight <= 625){
						this.gridOption = [{left: '8%', right: '0%', top: '100%', containLabel: true},
						{left: '8%', right: '0%', bottom: '70%', containLabel: true}]
					}else{
						this.gridOption = [{left: '8%', right: '0%', top: '60%', containLabel: true},
						{left: '8%', right: '0%', bottom: '40%', containLabel: true}]
					}
				}else if( this.screenWidth>= 1366 && this.screenWidth <= 1600 ) {
					this.gridOption = [{left: '6%', right: '0%', top: '50%', containLabel: true},
						{left: '6%', right: '0%', bottom: '50%', containLabel: true}]
				}else if ( this.screenWidth>= 1600 && this.screenWidth <= 1920 ) {
					this.gridOption = [{left: '6%', right: '0%', top: '20%', containLabel: true},
						{left: '6%', right: '0%', top: '90%', containLabel: true}]
				}
				personnelChart.setOption({
					title: [],
					tooltip: {},
					legend: {
						show: false
					},
					grid: this.gridOption,
					xAxis:[{
						type:'value',
						gridIndex: 0,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						max: yjs_max
					},{
						type:'value',
						gridIndex: 1,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						max: bks_max
					}],
					yAxis:[{
						type:'category',
						gridIndex: 0,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						data: [{
							value:'研究生',
							textStyle:{
								color: '#fff',
								fontSize: '11'
							}
						}]
					},{
						type:'category',
						gridIndex: 1,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						data: [{
							value:'本科生',
							textStyle:{
								color: '#fff',
								fontSize: '11'
							}
						}]
					}],
					series: [{
						name: '研究生',
						type: 'bar',//种类——柱形
						barWidth: 7,//柱子宽度
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(255, 106, 180, 1)',
							barBorderRadius:7
						},
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
							barBorderRadius:7
						},
						z:1,//类似z-index
						data: [yjs_n]
					},{
						name: '本科生',
						type: 'bar',//种类——柱形
						barWidth: 7,//柱子宽度
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(255, 106, 180, 1)',
							barBorderRadius:7
						},
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
							barBorderRadius:7
						},
						z:2,//类似z-index
						data: [bks_n],
						xAxisIndex: 1,
                    	yAxisIndex: 1
					}]
				})
			},
			drawLine2() {
				let schoolChart = this.$echarts.init(document.getElementById('schoolChart'));
				schoolChart.setOption({
					title: [],
					tooltip: {},
					legend: {
						show: false
					},
					grid:[{left: '5%', right: '55%',bottom: '30%' ,top: '20%', containLabel: true},
						{left: '55%', right: '8%',bottom: '30%' ,top: '20%',containLabel: true}],
					xAxis:[{
						type:'category',
						gridIndex: 0,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//轴分隔线属性
							show: true,
							interval: 0,
							lineStyle:{
								color: 'rgba(0, 115, 238, 1)',
								width: 1,
							}
						},
						axisLabel:{
							show: false
						},
						minorSplitLine: {
							show: false,
							lineStyle: {
								color: '#ddd'
							}
						},
						data:['2015','2015','2015','2015','2015'],
						max: 'datamax'
					},{
						type:'category',
						gridIndex: 1,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//轴分隔线属性
							show: true,
							interval: 0,
							lineStyle:{
								color: 'rgba(0, 115, 238, 1)',
								width: 1,
							}
						},
						axisLabel:{
							show: false
						},
						data:['2015','2015','2015','2015','2015'],
						max: "datamax"
					}],
					yAxis:[{
						type:'value',
						gridIndex: 0,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						data:'男生'
					},{
						type:'value',
						gridIndex: 1,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine: {
							show: false,
							interval: 0
						},
						axisLabel:{
							show: false
						},
						data:'女生'
					}],
					series: [{
						name: '男生',
						type: 'line',//种类——柱形
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
						},
						smooth:true,
						symbol: 'circle',
						data: ['75','0','33','12','0','55'],
						lable:{

						},
						markLine:{
							lineStyle:{
								color: 'rgba(86, 149, 244, 1)'
							},
							precision : 0,
							data:[{
								type : 'average', 
								name: '平均值',
								symbol: 'none'
							}],
							label:{
								show: true,
								// formatter:'{d}%'
							}
						},
						xAxisIndex: 0,
                    	yAxisIndex: 0
					},{
						name: '女生',
						type: 'line',//种类——柱形
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
						},
						smooth:true,
						symbol: 'circle',
						data: ['0','55','75','0','33','12'],
						markLine:{
							lineStyle:{
								color: 'rgba(86, 149, 244, 1)'
							},
							precision : 0,
							data:[{
								type : 'average', 
								name: '平均值',
								symbol: 'none'
							}]
						},
						xAxisIndex: 1,
                    	yAxisIndex: 1
					}]
				})
			},
			drawLine3(yjs_max, bks_max, yjs_n, bks_n) {
				let graduatesChart = this.$echarts.init(document.getElementById('graduatesChart'));
				if( this.screenWidth <= 1366){
					if(this.screenHeight <= 625){
						this.gridOption3 = [{left: '8%', right: '0%', top: '100%', containLabel: true},
						{left: '8%', right: '0%', bottom: '70%', containLabel: true}]
					}else{
						this.gridOption3 = [{left: '8%', right: '0%', top: '60%', containLabel: true},
						{left: '8%', right: '0%', bottom: '40%', containLabel: true}]
					}
				}else if( this.screenWidth>= 1366 && this.screenWidth <= 1600 ) {
					this.gridOption3 = [{left: '6%', right: '0%', top: '50%', containLabel: true},
						{left: '6%', right: '0%', bottom: '50%', containLabel: true}]
				}else if ( this.screenWidth>= 1600 && this.screenWidth <= 1920 ) {
					this.gridOption3 = [{left: '6%', right: '0%', top: '20%', containLabel: true},
						{left: '6%', right: '0%', top: '90%', containLabel: true}]
				}
				graduatesChart.setOption({
					title: [],
					tooltip: {},
					legend: {
						show: false
					},
					grid:this.gridOption3,
					xAxis:[{
						type:'value',
						gridIndex: 0,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						max: yjs_max
					},{
						type:'value',
						gridIndex: 1,
						axisTick:{//刻度线属性
							show: false
						},
						axisLine:{//轴线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						axisLabel:{
							show: false
						},
						max: bks_max
					}],
					yAxis:[{
						type:'category',
						gridIndex: 0,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						data: [{
							value:'研究生',
							textStyle:{
								color: '#fff',
								fontSize:'11'
							}
						}]
					},{
						type:'category',
						gridIndex: 1,
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						data: [{
							value:'本科生',
							textStyle:{
								color: '#fff',
								fontSize:'11'
							}
						}]
					}],
					series: [{
						name: '研究生',
						type: 'bar',//种类——柱形
						barWidth: 7,//柱子宽度
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(255, 106, 180, 1)',
							barBorderRadius:7
						},
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
							barBorderRadius:7
						},
						z:1,//类似z-index
						data: [yjs_n]
					},{
						name: '本科生',
						type: 'bar',//种类——柱形
						barWidth: 7,//柱子宽度
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(255, 106, 180, 1)',
							barBorderRadius: 7
						},
						itemStyle: {
							color: 'rgba(86, 149, 244, 1)',
							barBorderRadius:7
						},
						z:2,//类似z-index
						data: [bks_n],
						xAxisIndex: 1,
                    	yAxisIndex: 1
					}]
				})
			}
		}
	}
</script>

<style lang="less">
	.personnelTemplate{
		height: 100%;

	}
	.personnelContent,.graduatesContent{
		width: 100%;
		height: 18%;
		display: inline-flex;
		position: relative;
		.blueBar{
			position: absolute;
			color: #fff;
			font-size: 9px;
			right: 10px;
			top: 18px;
		}
		.blueBar::before{
			content: '';
			display: inline-block;
			position: relative;
			top: -2px;
			padding-right: 5px;
			margin-right: 5px;
			border-radius: 10px;
			width: 10px;
			height: 5px;
			background-color: rgba(86, 149, 244, 1);
		}
		.pinkBar{
			position: absolute;
			color: #fff;
			font-size: 9px;
			right: 10px;
			top: 40px;
		}
		.pinkBar::before{
			content: '';
			display: inline-block;
			position: relative;
			top: -2px;
			padding-right: 5px;
			margin-right: 5px;
			border-radius: 10px;
			width: 10px;
			height: 5px;
			background-color: rgba(255, 106, 180, 1);
		}
	}
	#personnelChart,#graduatesChart{
		width: 80%;
		height: 100%;
	}
	.All-info,.All-info2{
		width: 100%;
		display: inline-flex;
		justify-content: flex-start;
		margin-top: 10px;
		position: relative;
		p{
			color: #fff;
			font-size: 16px;
			padding-left: 15px;
			span{
				color: rgba(39, 246, 222, 1);
				font-size: 18px;
			}
		}
	}
	.All-info2{
		justify-content: flex-start;
		p{
			padding-left: 20px;
		}
	}
	.chart-title,.chart-title2{
		font-size: 14px;
		color: #fff;
		text-align: left;
		padding-left: 15px;
	}
	.chart-title{
		margin-top: 5px;
	}
	.chart-title::before,.chart-title2::before{
		content: "";
		display: inline-block;
		width: 5px;
		height: 20px;
		background: url(../../../public/img/hy/sidebar@2x.png);
		background-size: 100% 100%;
		position: relative;
		top:5px;
		left:-14px;
	}
	.schoolContent{
		position: relative;
		width: 100%;
		height: 20%;
		color: #fff;
		.sexContent{
			width: 100%;
			display: inline-flex;
			justify-content: space-around;
			.blueNum {
				font-size: 12px;
				span{
					color: rgba(0, 140, 255, 1);
					font-size: 15px;
				}
			}
			.pinkNum {
				font-size: 12px;
				span{
					color: rgba(255, 106, 180, 1);
					font-size: 15px;
				}
			}
		}
		#schoolChart{
			width: 100%;
			height: 100%;
		}
	}
	@media screen and (max-width:1920px)  {
		.chart-title,.chart-title2{
			font-size: 14px;
		}
	}
	@media screen and (max-width:1600px)  {
		.personnelTemplate{
			height: 100%;
			.moudleheader{
				.title-content-bg{
					top: -4px;
				}
			}
		}
		.chart-title::before,.chart-title2::before{
			height: 18px;
		}
		.chart-title {
			margin-top: 5px;
		}
		.All-info p, .All-info2 p {
			font-size: 14px;
			span{
				font-size: 16px;
			}
		}
		.personnelContent,.graduatesContent{
			height: 17%;
			.blueBar{
				top: 5px;
			}
			.pinkBar{
				top: 23px;
			}
		}
		.schoolContent{
			#schoolChart{
				width: 100%;
				height: 80%;
			}
		}
		.All-info,.All-info2{
			margin-top: 5px;
		}
	}
	@media screen and (max-width:1366px)  {
		.personnelTemplate{
			height: 100%;
			.moudleheader{
				.title-content-bg{
					top: -4px;
				}
			}
		}
		.chart-title::before,.chart-title2::before{
			height: 18px;
		}
		.chart-title {
			margin-top: 5px;
		}
		.All-info p, .All-info2 p {
			font-size: 12px;
			span{
				font-size: 15px;
			}
		}
		.personnelContent,.graduatesContent{
			height: 15%;
			.blueBar{
				top: 8px;
			}
			.pinkBar{
				top: 37px;
			}
		}
		.schoolContent{
			#schoolChart{
				width: 100%;
				height: 80%;
			}
			.sexContent{
				position: relative;
    			top: 5px;
			}
		}
		.All-info,.All-info2{
			margin-top: 10px;
		}
	}
	@media (max-height:667px) and (max-width:1366px)  {
		.personnelTemplate{
			height: 100%;
			.moudleheader{
				.title-content-bg{
					top: -4px;
				}
			}
		}
		.chart-title::before,.chart-title2::before{
			height: 18px;
		}
		.chart-title {
			margin-top: 5px;
		}
		.All-info p, .All-info2 p {
			font-size: 12px;
			span{
				font-size: 15px;
			}
		}
		.personnelContent,.graduatesContent{
			height: 15%;
			.blueBar{
				top: 8px;
			}
			.pinkBar{
				top: 28px;
			}
		}
		.schoolContent{
			#schoolChart{
				width: 100%;
				height: 80%;
			}
		}
		.All-info,.All-info2{
			margin-top: 0px;
		}
	}
	
</style>
