<template>
	<div class="addres-header btn">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<p class="noselect">{{addr}}</p>
		<div class="vertical"></div>
  		<div class="horizontal"></div>
	</div>
</template>

<script>
	export default {
		name: 'hoverBar',
		props: {
			addr:String,
		}
	}
</script>

<style lang="less" scoped>
	// .addres-header {
	// 	width: 210px;
	// 	height: 40px;
	// 	position: relative;
	// 	left: -45px;
	// 	top: 39px;
	// 	border: 1px solid rgba(100, 184, 255, 1);
	// 	p{
	// 		color: rgba(100, 184, 255, 1);
	// 		height: 25px;
	// 		line-height: 25px;
	// 		background-color: black;
	// 		border-radius: 5px;
	// 	}
	// }
	.btn {
		width: 180px;
		height: 30px;
		font-family: 'Cinzel', serif;
		font-size: 14px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 0;
		transition: 1s;
		top: 35px;
		left: -40px;
		background: transparent;
		p{
			color: rgba(100, 184, 255, 1);
		}
		span:nth-child(1) {
			position: absolute;
			left: 0px;
			top: 0px;
			padding: 5px;
			border-style: solid;
			border-color: #01e0fb;
			border-width: 1px 0 0 1px;
        }
    	span:nth-child(2) {
			position: absolute;
			right: 0;
			top: 0;
			padding: 5px;
			border-style: solid;
			border-color: #01e0fb;
			border-width: 1px 1px 0 0;
        }
        span:nth-child(3) {
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 5px;
			border-style: solid;
			border-color: #01e0fb;
			border-width: 0 1px 1px 0;
        }
        span:nth-child(4) {
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 5px;
			border-style: solid;
			border-color: #01e0fb;
			border-width: 0 0 1px 1px;
		}
	}
	.vertical, .horizontal {
		position: absolute;
		background: transparent;
		z-index: -1;
		transition: 1s;
	}
	.vertical {
		height: 15px;
		width: 182px;
	}
	.horizontal {
		width: 160px;
		height: 32px;
	}
	.noselect {
	-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
			-ms-user-select: none;
				user-select: none;
	}
	.addres-header:hover .vertical {
		width: 0px;
		background: #3f51b5;
	}
	.addres-header:hover .horizontal {
		height: 0px;
		background: #3f51b5;
	}
	.addres-header:hover {
		background:  #3f51b5;
	}
	@media screen and (max-width:1600px)  {
		
	}
	@media screen and (max-width:1366px)  {
		
	}
</style>