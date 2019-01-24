<template>
    <div class="searchPage">
        <SearchForm v-model="params" ref="formComponent" @search="searchJobs" ></SearchForm>
        <div class="text-left ml-5 mb-4">
            <el-tag class="mr-4 pointer" v-for="item in options" v-show="item.name" :type="item.type" :key="item.fields[0]" closable @close="onTagClose(item)">{{item.name}}</el-tag>
        </div>
        <div class="px-4">
            <el-collapse v-model="activeName" accordion @change="onCollapseChange">
                <el-row class="w-100 py-2 mx-0 pr-3 bg-light" :gutter="10">
                    <el-col :span="5">
                        <div>职位名称</div>
                    </el-col>
                    <el-col :span="2">
                        <div>年薪</div>
                    </el-col>
                    <el-col :span="6">
                        <div>公司</div>
                    </el-col>
                    <el-col :span="3">
                        <div>发布日期</div>
                    </el-col>
                    <el-col :span="8">
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
import SearchForm from "@/components/SearchForm.vue";
import JobCollapse from "@/components/JobCollapse.vue";
import jobMixin from "../mixin/jobMixin.js";

export default {
    name: "search",
    data() {
        return {
            params: {},
        };
    },
    mixins: [jobMixin],
    mounted() {
        this.searchJobs();
    },
    methods: {
        searchJobs() {
            this.jobs = [];
            this.getJobs(this.form);
        },
        getMore() {
            this.pagenation.pageIndex++;
            this.getJobs(this.form);
        },
        onTagClose(tag) {
            this.$refs.formComponent.removeConditions(tag.fields);
        },
        getSalaryTxt(min,max) {
            if(min<=0&&max<=0) {
                return ''
            }
            if(min<0&&max>0) {
                return `0-${max}万`
            }
            if(min>0&&max<min) {
                return `${min}万以上`
            }
            if(min>0&&max>min) {
                return `${min}-${max}万`
            }
        },
    
    },
    computed: {
        form() {
            return {
                ...this.$store.state.form,
                ...this.pagenation,
                ...this.params
            };
        },
        options() {
            const arr = [
                {
                    name: this.params.Q,
                    type: "",
                    fields: ["Q"]
                },
                {
                    name: this.params.locationName,
                    type: "success",
                    fields: ["JobLocation"]
                },
                {
                    name: this.getSalaryTxt(this.params.AnnualSalaryMin,this.params.AnnualSalaryMax),
                    type: "info",
                    fields: ["AnnualSalaryMin", "AnnualSalaryMax"]
                },
                {
                    name: this.params.timeName,
                    type: "danger",
                    fields: ["ReleaseDate"]
                }
            ];
            return arr;
        }
    },
    components: {
        SearchForm,
        JobCollapse
    }
};
</script>
<style>
</style>

