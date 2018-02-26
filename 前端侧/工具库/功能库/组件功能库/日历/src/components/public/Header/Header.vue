<template>
	<div id="oa-header">
		<div class="header-content">
			<div class="header-left">
				<img src="/dist/images/logo.jpg">
			</div>
			<div class="one-line">
				<span class="system-name">江寓OA管理系统</span>
				<p>
					<span><i class="name">李大</i>，欢迎登录&nbsp;&nbsp;<i class="time">2017年07月28日&nbsp;信息三</i></span>
					<span class="icon">系统通知</span>
					<span class="icon">修改密码</span>
					<span class="icon">推出登录</span>
				</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {

	}
</script>
<style scoped>
	#oa-header{
		height: 70px;
		background-color: #fff;
	}
	.header-content{
		position: relative;
	}

	.header-left{
		width: 270px;
		height: 70px;
		float: left;
	}
	.header-left img{
		width: 270px;
		height: 70px;
	}
	.header-content{
		
	}
	.header-content .one-line{
		line-height: 70px;
		height: 70px;
	}
	.header-content .one-line span{
		
	}
	.header-content .one-line span.system-name{
		font-size: 25px;
		font-weight: bold;
		color: #999;
		padding-left: 25px;
	}
	.header-content .one-line p{
		float: right;
		padding-right: 60px;
	}
	.header-content .one-line p .icon{
		padding-left: 25px;
	}
</style>