import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
        Q:'',
        pageIndex: 1,
        pageSize: 20,
        qTitle: 1,
        JobLocation: '', 
        AnnualSalaryMin: -1,
        AnnualSalaryMax: -1,
        ReleaseDate: '',
    },
    locations: [
        { name: "全国", value: "" },
        { name: "北京", value: "530" },
        { name: "上海", value: "538" },
        { name: "广州", value: "763" },
        { name: "深圳", value: "765" },
        { name: "武汉", value: "736" },
        { name: "南京", value: "635" },
        { name: "杭州", value: "653" },
        { name: "苏州", value: "639" },
        { name: "无锡", value: "636" },
        { name: "合肥", value: "664" }
      ],
  },
  mutations: {

  },
  actions: {

  }
})
