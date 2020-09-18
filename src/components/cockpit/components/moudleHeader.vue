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
		},
		data() {

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
		width: 55%;
		margin: 0 auto;
		height: 40px;
		position: relative;
		top: -3px;
		background: url(../../../../public/img/hy/title.png);
		background-size: 100% 100%;
	}
</style>