<template>
    <div class="frontPage">
        <div class="d-flex px-4 mb-4">
            <el-tag class="mr-4 pointer" v-for="item in options" :type="item.type" :key="item.name">{{item.name}}</el-tag>
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
                <div class="pointer" v-if="hasMore" @click="getMore">
                    <i class="el-icon-caret-bottom h3 mb-0 text-primary"></i>
                </div>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import JobCollapse from "@/components/JobCollapse.vue";
export default {
    name: "front",
    data() {
        return {
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
            if (job && !job.Responsibility) {
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
