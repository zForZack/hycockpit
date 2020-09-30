<template>
	<div class="systemtableWrapper">
		<moudleheader class="moudleheader" :title="title"></moudleheader>
		<swiper ref="mySwiper" :options="swiperOptions">
			<swiper-slide v-for="(list,index) in AllList" :key="index">
				<div class="myslide">
					<div class="circleList">
						<div v-for="(item,index) of list" :key="index">
							<p v-if="index<=11"></p>
						</div>
					</div>
					<div class="tableChart"></div>
					<div class="infoList">
						<div class="infoListDiv" v-for="(item,index) in list" :key="index">
							<p v-if="index<=11">
								<span>{{item.value}}</span> 个
							</p>
						</div>
					</div>
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	import moudleheader from 'mycomponents/moudleHeader'
	import echarts from 'echarts/lib/echarts'
	import Swiper2, {Navigation, Pagination} from 'swiper';
	Swiper2.use([Navigation, Pagination]);

	export default {
		data() {
			return {
				personnelData: {},
				title: '各业务系统的表数量',
				AllList:{
					list:[
						{value:'12',title:'财务系统'},
						{value:'8',title:'教务系统'},
						{value:'16',title:'xxxx系统'},
						{value:'37',title:'教务系统'},
						{value:'93',title:'教务系统'},
						{value:'70',title:'教务系统'},
						{value:'20',title:'xxxx系统'},
						{value:'8',title:'财务系统'},
						{value:'62',title:'财务系统'},
						{value:'4',title:'财务系统'},
						{value:'30',title:'财务系统'},
						{value:'19',title:'财务系统'}]
					,
					list2:[
						{value:'12',title:'财务系统'},
						{value:'8',title:'财务系统'},
						{value:'16',title:'财务系统'},
						{value:'37',title:'财务系统'},
						{value:'93',title:'财务系统'},
						{value:'70',title:'财务系统'},
						{value:'20',title:'财务系统'}]
					},
				swiperOptions: {
					centeredSlides: true,
					loop:false,
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: {
						delay: 2500,
						disableOnInteraction: false
					},
					speed:1000,
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: false,
					observer:true, //必须加入
				}
			}
		},
		components:{
			moudleheader
		},
		computed: {
			
		},
		created() {
			//this.getPersonnelData();
		},
		mounted() {
			// this.screenWidth = document.body.clientWidth
			// this.screenHeight = document.body.clientHeight
			// console.log(this.screenWidth + ',' + this.screenHeight)

			Object.keys(this.AllList).forEach((key,myIndex) =>{
				let myList = [];
				let myTitle = [];
				let index = myIndex;
				let Numindex = 0;
				this.AllList[key].forEach((element,indexs) => {
					myList.push(element.value)
					myTitle.push(element.title)
					Numindex = indexs
				});
				this.drawLine(index,Numindex,myList,myTitle);//参数是第几张表
			})
		},
		methods: {
			getPersonnelData() {
				
			},
			drawLine(n,Numindex,dataList,dataTitle) {
				let tableChartdiv = document.getElementsByClassName('tableChart');
				let infoListDiv = document.getElementsByClassName('infoListDiv');
				let divheight = infoListDiv[0].offsetHeight;
				let chartHeight = (Numindex+1) * divheight;
				tableChartdiv[n].style.height = chartHeight+'px';
				console.log(tableChartdiv);
				
				let tableChart = this.$echarts.init(document.getElementsByClassName('tableChart')[n]);
				let colorList = ['#ff6ab4','#fda409','#e2e237','#29f3e0','#5695f4','#a155ff','#ff6ab4','#fda409','#e2e237','#29f3e0','#5695f4','#a155ff'];
				// tableChartdiv.css('height','');
				tableChart.setOption({
					title: [],
					tooltip: {
						formatter:'{b}:{c}个'
					},
					legend: {
						show: false
					},
					grid: {left: '0%', right: '5%',top: '0%', bottom: '0%', containLabel: true},
					xAxis:{
						type:'value',
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
						max: '100'
					},
					yAxis:{
						type:'category',
						axisLine:{//y轴属性
							show: false
						},
						axisTick:{//y轴刻度线属性
							show: false
						},
						splitLine:{//y轴分隔线属性
							show: false
						},
						inverse: true,
						data: dataTitle,
						axisLabel: {
							fontSize: '11',
							color:'#fff',
							formatter: '{value}：'
						}
					},
					series: {
						name: '各业务系统的表数量',
						type: 'bar',//种类——柱形
						barWidth: 7,//柱子宽度
						showBackground: true,
						backgroundStyle: {
							color: '#07205a',
							barBorderRadius:7
						},
						itemStyle: {
							color: function(params){
								return colorList[params.dataIndex]
							},
							barBorderRadius:7
						},
						data: dataList
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.systemtableWrapper{
		width: 100%;
		height: 100%;
		font-size: 14px;
		color: #fff;
		.swiper-container{
			width: 100%;
			height: 93%;
			.swiper-slide{
				width: 100%;
				height: 100%;
				.myslide{
					width: 95%;
					height: 86%;
					padding: 0 2.5%;
					margin-top: 20px;
					display: inline-flex;
					justify-content: space-evenly;
					.circleList{
						height: 100%;
						display: inline-flex;
						flex-direction: column;
						// justify-content: space-evenly;
						div{
							height: 8.3333%;
						}
						p{
							height: 100%;
							position: relative;
						}
						p::before{
							content: '';
							display: inline-block;
							position: absolute;
							right: 0px;
							bottom: 45%;
							width: 5px;
							height: 5px;
							border-radius: 30px;
							background-color: lightskyblue;
						}
					}
					.infoList{
						height: 100%;
						display: inline-flex;
						flex-direction: column;
						div{
							height: 8.3333%;
						}
						div:nth-of-type(1),div:nth-of-type(7){
							span{
								color: #ff6ab4;
							}
						}
						div:nth-of-type(2),div:nth-of-type(8){
							span{
								color: #fda409;
							}
						}
						div:nth-of-type(3),div:nth-of-type(9){
							span{
								color: #e2e237;
							}
						}
						div:nth-of-type(4),div:nth-of-type(10){
							span{
								color: #29f3e0;
							}
						}
						div:nth-of-type(5),div:nth-of-type(11){
							span{
								color: #5695f4;
							}
						}
						div:nth-of-type(6),div:nth-of-type(12){
							span{
								color: #a155ff;
							}
						}
						div:nth-last-of-type(1){
							
						}
						p{
							font-size: 12px;
							height: 100%;
							line-height: 3.432292vh;
							position: relative;
							span{
								font-size: 15px;
							}
						}
					}
					.tableChart{
						width: 80%;
						height: 100%;
					}
				}
			}
		}
	}
	.swiper-container .swiper-pagination-bullet{
		background:#143683;
		height: 8px;
		width: 8px;
		opacity: 1;
	}
	.swiper-container .swiper-pagination-bullet-active{
		background-color: #008bfe;
	}


	// .demo{
	// 	width:250px;
	// 	height:250px;
	// 	border:100px solid red;
	// 	border-left-color:blue;
	// 	border-right-color:yellow;
	// 	border-top-color:#04f105;
	// 	margin:100px;
	// 	border-radius: 50%;/*圆角*/
	// 	-webkit-animation:circle 2s infinite linear; 
	// }
	// @-webkit-keyframes circle{
	// 	0% {transform:rotate(0deg);}
	// 	50%	{transform:rotate(60deg);}
	// 	100% {transform:rotate(0deg);}
	// }
	
	@media screen and (max-width:1920px)  {
		
	}
	@media screen and (max-width:1600px)  {
		
	}
	@media screen and (max-width:1366px)  {
		
	}
	@media (max-height:667px) and (max-width:1366px)  {
		
	}
	
</style>
