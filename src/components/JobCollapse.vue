<template>
    <div>
        <template v-if="jobs.length>0">
        <el-collapse-item v-for="job,index in jobs" :key="job.JobID" :name="index">
            <template slot="title" v-if="showKeywords">
                <el-row class="w-100" :gutter="0">
                    <el-col :xs="20" :sm="11" :md="10" :xl="6">
                        <div>
                            {{job.JobTitle}}
                            <a class="text-primary small" target="blank" :href="`https://www.highpin.cn/job/b${job.JobID}.html`">
                                <span class="hidden-xs-only px-1">详情</span>
                                <i class="el-icon-info"></i>
                            </a>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="2">
                        <div>{{job.AnnualSalaryMin}} - {{job.AnnualSalaryMax}}<span class="hidden-xs-only">万</span></div>
                    </el-col>
                    <el-col :sm="11" :md="10" :xl="6" class="hidden-xs-only">
                        <div>{{job.CompanyName}}</div>
                    </el-col>
                    <el-col :span="2" class="hidden-sm-and-down">
                        <div>{{job.PublishDate}}</div>
                    </el-col>
                    <el-col :span="8"  class="hidden-lg-and-down">
                        <a class="text-primary" v-if="job.keywords===null">提取关键字</a>
                        <span v-else>{{job.keywords.join(',')||'无'}}</span>
                    </el-col>
                </el-row>
            </template>
            <template slot="title" v-else>
                <el-row class="w-100" :gutter="0">
                    <el-col :xs="20" :sm="11" :md="10">
                        <div>
                            {{job.JobTitle}}
                            <a class="text-primary small" target="blank" :href="`https://www.highpin.cn/job/b${job.JobID}.html`">
                                <span class="hidden-xs-only px-1">详情</span>
                                <i class="el-icon-info"></i>
                            </a>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="2">
                        <div>{{job.AnnualSalaryMin}} - {{job.AnnualSalaryMax}}<span class="hidden-xs-only">万</span></div>
                    </el-col>
                    <el-col :sm="11" :md="10" class="hidden-xs-only">
                        <div>{{job.CompanyName}}</div>
                    </el-col>
                    <el-col :md="2" class="hidden-sm-and-down">
                        <div>{{job.PublishDate}}</div>
                    </el-col>
                </el-row>
            </template>
            <div class="text-left px-4" v-if="job.Responsibility">
                <div v-html="job.Responsibility"></div>
            </div>
            <div class="text-center px-4" v-if="!job.Responsibility && !job.isGettingDetail">
                暂无数据
            </div>
            <div class="text-center px-4 h3 mb-0" v-if="job.isGettingDetail">
                <i class="el-icon-loading"></i>
            </div>
        </el-collapse-item>
        </template>    
        <!-- <div class="py-3" v-else>
            暂无数据
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'JobCollapse',
    props: {
        jobs: {
            type: Array,
            required: true
        },
        showKeywords: {
            type: Boolean,
            default: true
        },    
    },
    methods: {
        
    },
    computed: {
        
    }
};
</script>
<style>
</style>

