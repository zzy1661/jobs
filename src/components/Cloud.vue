<template>
    <el-row type="flex" class="flex-wrap py-4">
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="18" class="order-2 order-xl-1">
            <canvas class="d-block mx-auto" id="canvas" width="890" height="760" @click="toSearch"></canvas>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="6" class="d-flex flex-wrap order-1 order-xl-2 mb-4 mb-xl-0">
            <el-col :span="12" :lg="24" class="d-flex">
                <div id="line" :style="{width: '280px', height: '280px'}" class="mx-auto"></div>
            </el-col>
            <el-col :span="12" :lg="24" class="d-flex">
                <div id="pie" :style="{width: '280px', height: '280px'}" class="mx-auto align-self-end"></div>
            </el-col>
        </el-col>
    </el-row>
    <!--<div class="">
		<div >
			<canvas id="canvas" width="890" height="760"></canvas>
		</div>
		<div >
			<div id="line" :style="{width: '280px', height: '280px'}"></div>
			<div id="pie" :style="{width: '280px', height: '280px'}"></div>
		</div>
	</div>-->
</template>

<script>
import WordCloud from "wordcloud";
import utils from "../utils";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
const idb = utils.idb;
export default {
    data() {
        return {
            frontDatas: {
                all: null,
                skillful: null,
                weights: null,
                master: null
            }
        };
    },
    mounted() {
        this.getDatasFromIDB("weights").then(data => {
            if (data) {
                this.frontDatas.weights = data;
                this.renderCloud();
            }
        });
        this.getDatasFromIDB("all").then(data => {
            if (data) {
                this.frontDatas.all = data;
                this.drawPie();
            }
        });
        Promise.all([
            this.getDatasFromIDB("master"),
            this.getDatasFromIDB("skillful")
        ]).then(datas => {
            if (datas && datas.length === 2) {
                this.frontDatas.master = datas[0];
                this.frontDatas.skillful = datas[1];
                this.drawLine();
            }
        });
        this.getWeightData();
    },
    methods: {
        saveIDB(datas) {
            idb.saveIndexedDB(
                Object.keys(datas).map(k => {
                    return {
                        name: k,
                        value: datas[k]
                    };
                })
            );
        },
        getDatasFromIDB(key) {
            return idb.getKey(key).then(datas => {
                if (datas && datas.value) {
                    return datas.value;
                } else {
                    return null;
                }
            });
        },
        getWeightData() {
            return this.formRequest.get("/frontCloud").then(res => {
                const data = res.data;
                if (data && data.code === 0) {
                    this.frontDatas = data.data;
                    this.saveIDB(this.frontDatas);
                }
            });
        },
        toSearch() {
            window.location.href = "/search.html";
        },
        renderCloud() {
            let list = this.frontDatas.weights;
            WordCloud(document.getElementById("canvas"), {
                list: list.map(i => [i.word, i.weight]),
                gridSize: 8,
                weightFactor: 0.03,
                fontFamily: "Hiragino Mincho Pro, serif",
                color: "random-dark",
                backgroundColor: "#f0f0f0",
                rotateRatio: Math.random() * 90
            });
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            const lineChart = echarts.init(document.getElementById("line"));
            const { master, skillful } = this.frontDatas;
            // 绘制图表
            lineChart.setOption({
                backgroundColor: "#f0f0f0",
                title: {
                    text: "三大框架熟练度要求对比",
                    subtext: "数据来源：智联卓聘"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: "category",
                    data: ["Vue", "React", "Angular"]
                },
                series: [
                    {
                        name: "精通",
                        type: "bar",
                        data: [master.vue, master.react, master.angular]
                    },
                    {
                        name: "熟练",
                        type: "bar",
                        data: [skillful.vue, skillful.react, skillful.angular]
                    }
                ]
            });
        },
        drawPie() {
            const pieChart = echarts.init(document.getElementById("pie"));
            const { all } = this.frontDatas;
            let option = {
                backgroundColor: "#f0f0f0",
                title: {
                    text: "三大框架热度对比",
                    subtext: "数据来源：智联卓聘"
                    //						left: 'center',
                    //						top: 20,
                    //						textStyle: {
                    //							color: '#ccc'
                    //						}
                },

                tooltip: {
                    trigger: "item",
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
                series: [
                    {
                        name: "出现次数",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: Object.keys(all).map(key => ({
                            value: all[key],
                            name: key[0].toUpperCase() + key.substr(1)
                        })),
                        roseType: "radius",
                        label: {
                            normal: {
                                textStyle: {
                                    color: "rgba(255, 255, 255, 0.3)"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "rgba(255, 255, 255, 0.3)"
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#c23531",
                                shadowBlur: 200,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },

                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function(idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            pieChart.setOption(option);
        }
    },
    watch: {
        "frontDatas.all": function(newV, oldV) {
            if(!oldV) {
                return ;
            }
            if (Object.keys(newV).some(k=>newV[k] !== oldV[k])) {
                console.log("all update", newV, oldV);
                this.drawPie();
            }
        },
        "frontDatas.weights": function(newV, oldV) {
            if(!oldV) {
                return ;
            }
            if (Object.keys(newV).some(k=>{return newV[k].word !== oldV[k].word || newV[k].weight !== oldV[k].weight })) {
                console.log("weights update", newV, oldV);
                this.renderCloud();
            }
        },
        "frontDatas.skillful": function(newV, oldV) {
            if(!oldV) {
                return ;
            }
            if (Object.keys(newV).some(k=>newV[k] !== oldV[k])) {
                console.log("master update", newV, oldV);
                this.drawLine();
            }
        },
        "frontDatas.master": function(newV, oldV) {
            if(!oldV) {
                return;
            }
            if (Object.keys(newV).some(k=>newV[k] !== oldV[k])) {
                console.log("master update", newV, oldV);
                this.drawLine();
            }
        }
    }
};
</script>

<style>
</style>