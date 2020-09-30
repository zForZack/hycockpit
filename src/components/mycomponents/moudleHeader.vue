<template>
	<div class="title-header">
		<div class="title-content-bg">
			<p>{{title}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'moudleHeader',
		props: {
			title:String
		}
	}
</script>

<style lang="less" scoped>
	.title-header {
		width: 101.5%;
		height: 40px;
		p{
			color: rgba(46, 228, 255, 1);
			position: relative;
    		top: 12px;
		}
	}
	.title-content-bg {
		width: 170px;
		margin: 0 auto;
		height: 40px;
		position: relative;
		top: -3px;
		background: url(../../../public/img/hy/title.png);
		background-size: 100% 100%;
	}
@media screen and (max-width:1920px)  {
	
}
@media screen and (max-width:1600px)  {
	.title-header {
		height: 25px;
		p{
			position: relative;
			top: 8px;
		}
	}
	.title-content-bg {
		height: 30px;
	}
}
@media screen and (max-width:1366px)  {
	.title-header {
		height: 25px;
		p{
			position: relative;
			top: 8px;
			font-size: 13px;
		}
	}
	.title-content-bg {
		height: 30px;
	}
}
</style>