<template>
    <div class="frontPage">
        <div class="d-flex px-4 mb-4">
            <el-tag class="mr-4 pointer" v-for="item in options" :key="item.name">{{item.name}}</el-tag>
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
                <template v-if="jobs.length>0">
                    <el-collapse-item v-for="job,index in jobs" :key="job.JobID" :name="index">
                        <template slot="title">
                            <el-row class="w-100" :gutter="10">
                                <el-col :span="5">
                                    <div>{{job.JobTitle}}</div>
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
                                    <a class="text-primary" v-if="job.keywords===null">点击获取关键字</a>
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
                <div class="pointer" v-if="hasMore" @click="getMore">
                    <i class="el-icon-caret-bottom h3 mb-0 text-primary"></i>
                </div>
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
            jobs: [],
            activeName: -1,
            hasMore: false,
            pagenation: {
                pageIndex: 1
                // pageSize: 5 对方接口该参数无效
            }
        };
    },
    mounted() {
        this.getFrontJobs();
    },
    methods: {
        getFrontJobs() {
            this.jsonRequest.post("/search", this.form).then(res => {
                const data = res.data;
                if (data.code === "000000") {
                    this.jobs = this.jobs.concat(
                        data.body.JobList.map(job => ({
                            JobID: job.JobID,
                            CompanyName: job.CompanyName,
                            JobTitle: job.JobTitle,
                            AnnualSalaryMax: job.AnnualSalaryMax,
                            AnnualSalaryMin: job.AnnualSalaryMin,
                            PublishDate: job.PublishDate,
                            keywords: null,
                            Responsibility: job.Responsibility,
                            ReferrerType: job.ReferrerType,
                            isGettingDetail: false
                        }))
                    );
                    this.hasMore =
                        data.body.PageCount > this.pagenation.pageIndex;
                }
            });
        },
        getMore() {
            this.pagenation.pageIndex++;
            this.getFrontJobs();
        },
        getDetail(job) {
            if (job.isGettingDetail) {
                return;
            }
            job.isGettingDetail = true;
            this.formRequest
                .get(`/detail?referrerType=${job.ReferrerType}&id=${job.JobID}`)
                .then(res => {
                    job.isGettingDetail = false;
                    const data = res.data;
                    if (data.code === "000000") {
                        job.Responsibility = data.body.Responsibility;
                        job.keywords = this.parseResponseTxt(
                            job.Responsibility
                        );
                    }
                });
        },
        onCollapseChange(index) {
            const job = this.jobs[index];
            if (job) {
                this.getDetail(job);
            }
        },
        parseResponseTxt(sentence) {
            var txt =
                sentence.match(/精通([\u4e00-\u9fa5a-zA-Z0-9、\/]+)/gi) ||
                sentence.match(/熟练([\u4e00-\u9fa5a-zA-Z0-9、\/]+)/gi) ||
                sentence.match(/熟悉([\u4e00-\u9fa5a-zA-Z0-9、\/]+)/gi);
            const keywords = txt
                ? txt.map(i => i.match(/([a-zA-z]\w+)/g)).reduce((pre, cur) => {
                      return cur ? pre.concat(cur) : pre;
                  }, [])
                : [];
            return keywords;
        }
    },
    computed: {
        frontParams() {
            const JobLocation = this.$store.state.locations.filter(
                i => i.name === "上海"
            )[0].value;
            return {
                Q: "前端",
                AnnualSalaryMin: 20,
                AnnualSalaryMax: 30,
                JobLocation
            };
        },
        form() {
            return {
                ...this.$store.state.form,
                ...this.pagenation,
                ...this.frontParams
            };
        }
    }
};
</script>
