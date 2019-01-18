<template>
	<div class="d-flex justify-content-around">
		<canvas id="canvas" width="900" height="760"></canvas>
		<div class="d-flex flex-column justify-content-between">
			<div id="line" :style="{width: '300px', height: '300px'}"></div>
			<div id="pie" :style="{width: '300px', height: '300px'}"></div>
		</div>
	</div>
</template>

<script>
	import WordCloud from 'wordcloud'

	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	require('echarts/lib/chart/pie')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')

	const datas = {
		"weights": [{
			"word": "js",
			"weight": 12079.641231988964
		}, {
			"word": "web",
			"weight": 11363.549769256868
		}, {
			"word": "css",
			"weight": 5353.077164030095
		}, {
			"word": "java",
			"weight": 5153.510690809675
		}, {
			"word": "react",
			"weight": 4519.593658227163
		}, {
			"word": "html",
			"weight": 4249.591959164242
		}, {
			"word": "html5",
			"weight": 3838.7198084163183
		}, {
			"word": "vue",
			"weight": 3697.8493567313158
		}, {
			"word": "jquery",
			"weight": 3005.2363026133867
		}, {
			"word": "angular",
			"weight": 2688.277786322131
		}, {
			"word": "css3",
			"weight": 2653.0601734008806
		}, {
			"word": "app",
			"weight": 2347.8408614167083
		}, {
			"word": "node",
			"weight": 2289.1448398812904
		}, {
			"word": "ui",
			"weight": 2077.839162353787
		}, {
			"word": "mysql",
			"weight": 2042.6215494325363
		}, {
			"word": "spring",
			"weight": 1890.0118934404502
		}, {
			"word": "ajax",
			"weight": 1678.7062159129464
		}, {
			"word": "linux",
			"weight": 1655.2278072987795
		}, {
			"word": "php",
			"weight": 1549.5749685350274
		}, {
			"word": "h5",
			"weight": 1467.4005383854428
		}, {
			"word": "webpack",
			"weight": 1443.9221297712756
		}, {
			"word": "android",
			"weight": 1432.182925464192
		}, {
			"word": "ios",
			"weight": 1408.704516850025
		}, {
			"word": "git",
			"weight": 1256.094860857939
		}, {
			"word": "mvc",
			"weight": 1220.8772479366883
		}, {
			"word": "pc",
			"weight": 1209.1380436296047
		}, {
			"word": "python",
			"weight": 1173.9204307083542
		}, {
			"word": "es6",
			"weight": 1162.1812264012706
		}, {
			"word": "sql",
			"weight": 1162.1812264012706
		}, {
			"word": "http",
			"weight": 1103.485204865853
		}, {
			"word": "oracle",
			"weight": 1091.7460005587693
		}, {
			"word": "bootstrap",
			"weight": 974.3539574879339
		}, {
			"word": "redis",
			"weight": 939.1363445666833
		}, {
			"word": "gulp",
			"weight": 915.6579359525163
		}, {
			"word": "w3c",
			"weight": 915.6579359525163
		}, {
			"word": "mybatis",
			"weight": 845.222710110015
		}, {
			"word": "native",
			"weight": 833.4835058029314
		}, {
			"word": "xml",
			"weight": 798.2658928816809
		}, {
			"word": "api",
			"weight": 774.7874842675137
		}, {
			"word": "json",
			"weight": 739.5698713462631
		}, {
			"word": "experience",
			"weight": 692.613054117929
		}, {
			"word": "sdk",
			"weight": 586.9602153541771
		}, {
			"word": "cocos2d",
			"weight": 516.5249895116758
		}, {
			"word": "mobile",
			"weight": 516.5249895116758
		}, {
			"word": "nosql",
			"weight": 504.7857852045923
		}, {
			"word": "bug",
			"weight": 504.7857852045923
		}, {
			"word": "xhtml",
			"weight": 493.04658089750876
		}, {
			"word": "grunt",
			"weight": 493.04658089750876
		}, {
			"word": "j2ee",
			"weight": 493.04658089750876
		}, {
			"word": "tomcat",
			"weight": 493.04658089750876
		}],
		"all": {
			"vue": 321,
			"react": 375,
			"master": 244
		},
		"master": {
			"vue": 36,
			"react": 17,
			"angular": 2
		},
		"skillful": {
			"vue": 17,
			"react": 9,
			"angular": 7
		}
	}
	export default {
		data() {
			return {
				list: datas.weights
			}
		},
		mounted() {
			this.renderCloud();
			this.drawLine();
			this.drawPie();
		},
		methods: {
			renderCloud() {
				WordCloud(document.getElementById('canvas'), {
					list: this.list.map(i => [i.word, i.weight]),
					gridSize: 8,
					weightFactor: 0.03,
					fontFamily: 'Hiragino Mincho Pro, serif',
					color: 'random-dark',
					backgroundColor: '#f0f0f0',
					rotateRatio: Math.random() * 90
				});
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let lineChart = echarts.init(document.getElementById('line'))
				// 绘制图表
				lineChart.setOption({
					backgroundColor: '#f0f0f0',
					title: {
						text: '三大框架熟练度要求对比',
						subtext: '数据来源：智联卓聘'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: 'category',
						data: ['Vue', 'React', 'Angular']
					},
					series: [{
							name: '精通',
							type: 'bar',
							data: [datas.master.vue,datas.master.react,datas.master.angular],
						},
						{
							name: '熟练',
							type: 'bar',
							data: [datas.skillful.vue,datas.skillful.react,datas.skillful.angular]
						}
					]
				});
			},
			drawPie() {
				let pieChart = echarts.init(document.getElementById('pie'))

				let option = {
					backgroundColor: '#f0f0f0',
					title: {
						text: '三大框架热度对比',
						subtext: '数据来源：智联卓聘',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#ccc'
						}
					},

					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},

					visualMap: {
						show: false,
						min: 80,
						max: 600,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series: [{
						name: '出现次数',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: Object.keys(datas.all).map(key=>({
							value: datas.all[key],
							name: key[0].toUpperCase()+key.substr(1)
						})),
						roseType: 'radius',
						label: {
							normal: {
								textStyle: {
									color: 'rgba(255, 255, 255, 0.3)'
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.3)'
								},
								smooth: 0.2,
								length: 10,
								length2: 20
							}
						},
						itemStyle: {
							normal: {
								color: '#c23531',
								shadowBlur: 200,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},

						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function(idx) {
							return Math.random() * 200;
						}
					}]
				};
				pieChart.setOption(option)
			}
		}
	}
</script>

<style>

</style>