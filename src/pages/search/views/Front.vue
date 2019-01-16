<template>
  <div class="frontPage">
    <div class="d-flex px-4 mb-4">
      <el-tag class="mr-4 pointer" v-for="item in options" :key="item.name">{{item.name}}</el-tag>
    </div>
    <div class="px-4">
      <el-collapse v-model="activeName" accordion>
            <el-row class="w-100 py-2 mx-0 pr-3 bg-light" :gutter="10">
                <el-col :span="8"><div >职位名称</div></el-col>
                <el-col :span="6"><div >年薪</div></el-col>
                <el-col :span="10"><div >关键字</div></el-col>
            </el-row>
        <el-collapse-item name="1">
            <template slot="title">
                <el-row class="w-100" :gutter="10">
                    <el-col :span="8"><div >职位名称</div></el-col>
                <el-col :span="6"><div >年薪</div></el-col>
                <el-col :span="10"><div >关键字</div></el-col>
                </el-row>
            </template>
            <div class="text-left px-4">
                 <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
                <el-row class="w-100" :gutter="10">
                    <el-col :span="8"><div >职位名称</div></el-col>
                <el-col :span="6"><div >年薪</div></el-col>
                <el-col :span="10"><div >关键字</div></el-col>
                </el-row>
            </template>
            <div class="text-left px-4">
                 <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: "front",
  data() {
    return {
      options: [
        {
          name: "前端",
          type: "",
          field: ""
        },
        {
          name: "上海",
          type: "success",
          field: ""
        },
        {
          name: "20-30万",
          type: "info",
          field: ""
        }
      ],
      jobs: null,
      activeName: "1"
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    getJobs() {}
  }
};
</script>
