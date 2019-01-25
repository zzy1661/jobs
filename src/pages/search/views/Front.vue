<template>
    <div class="frontPage">
        <div class="d-flex px-4 mb-4">
            <el-tag class="mr-4 pointer" v-for="item in options" :type="item.type" :key="item.name">{{item.name}}</el-tag>
        </div>
        <div class="px-sm-4">
            <el-collapse v-model="activeName" accordion @change="onCollapseChange">
                <el-row class="w-100 py-2 mx-0 pr-3 bg-light" :gutter="0">
                    <el-col :xs="20" :sm="11" :md="10" :xl="6">
                        <div>职位名称</div>
                    </el-col>
                    <el-col :xs="4" :sm="2">
                        <div>年薪</div>
                    </el-col>
                    <el-col :sm="11" :md="10" :xl="6" class="hidden-xs-only">
                        <div>公司</div>
                    </el-col>
                    <el-col :span="2"  class="hidden-sm-and-down">
                        <div>发布日期</div>
                    </el-col>
                    <el-col :span="8"  class="hidden-lg-and-down">
                        <div>关键字</div>
                    </el-col>
                </el-row>
                <job-collapse :jobs="jobs"></job-collapse>
                <div v-if="isLoading">
                    <i class="el-icon-loading h3 mb-0"></i>
                </div>
                <div class="pointer" v-if="hasMore&&!isLoading" @click="getMore">
                    <i class="el-icon-caret-bottom h3 mb-0 text-primary"></i>
                </div>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import JobCollapse from "@/components/JobCollapse.vue";
import jobMixin from '../mixin/jobMixin.js';
export default {
    name: "front",
    mixins: [jobMixin],
    mounted() {
        this.getFrontJobs();
    },
    methods: {
        getFrontJobs() {
            this.getJobs(this.form)
        },
        getMore() {
            this.pagenation.pageIndex++;
            this.getFrontJobs();
        },
    },
    computed: {
        frontParams() {
            const locationName = '上海';
            const JobLocation = this.$store.state.locations.filter(
                i => i.name === locationName
            )[0].value;
            return {
                Q: "前端",
                AnnualSalaryMin: 20,
                AnnualSalaryMax: 30,
                JobLocation,
                locationName
            };
        },
        form() {
            return {
                ...this.$store.state.form,
                ...this.pagenation,
                ...this.frontParams
            };
        },
        options() {
            return [
                {
                    name: this.frontParams.Q,
                    type: "",
                },
                {
                    name: this.frontParams.locationName,
                    type: "success",
                },
                {
                    name: `${this.frontParams.AnnualSalaryMin}-${this.frontParams.AnnualSalaryMax}万`,
                    type: "info",                    
                }
            ]
        } ,
    },
    components: {
        JobCollapse,
    }
};
</script>
