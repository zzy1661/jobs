<template>
	<div id="app">
		<h1>前端职位要求概览</h1>
		<Cloud></Cloud>
	</div>
</template>

<script>
	import Cloud from '@/components/Cloud.vue'
	console.log(Cloud)
	export default {
		name: 'app',
		components: {
			Cloud
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>