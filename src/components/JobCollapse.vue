<template>
    <div>
        <template v-if="jobs.length>0">
            <el-collapse-item v-for="job,index in jobs" :key="job.JobID" :name="index">
                <template slot="title">
                    <el-row class="w-100" :gutter="10">
                        <el-col :span="5">
                            <div>
                                {{job.JobTitle}}
                                <a class="text-primary small px-1" target="blank" :href="`https://www.highpin.cn/job/b${job.JobID}.html`">
                                    详情
                                    <i class="el-icon-info"></i>
                                </a>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div>{{job.AnnualSalaryMin}} - {{job.AnnualSalaryMax}}万</div>
                        </el-col>
                        <el-col :span="6">
                            <div>{{job.CompanyName}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div>{{job.PublishDate}}</div>
                        </el-col>
                        <el-col :span="8">
                            <a class="text-primary" v-if="job.keywords===null">提取关键字</a>
                            <span v-else>{{job.keywords.join(',')}}</span>
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
        <div class="py-3" v-else>
            暂无数据
        </div>
    </div>
</template>
<script>
export default {
    name: "JobCollapse",
    props: {
        jobs: {
            type: Array,
            required: true
        }
    }
};
</script>
<style>
</style>

