export default {
    data() {
        return {
            jobs: [],
            activeName: -1,
            hasMore: false,
            pagenation: {
                pageIndex: 1
                // pageSize: 5 对方接口该参数无效
            },
            isLoading: false
        };
    },
    methods: {
        getJobs(param) {
            if(this.isLoading) {
                return ;
            }
            this.isLoading = true;
            this.jsonRequest.post("/search", param).then(res => {
                this.isLoading = false;
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
            var requires = ['精通','熟练','熟悉','掌握'];
            let keywords = [];
            for(let i=0;i<requires.length;i++) {
                let reg = new RegExp(`${requires[i]}\\s?([\u4e00-\u9fa5a-zA-Z0-9、\/]+)`,'gi');
                let txt = sentence.match(reg);
                if(txt&&txt.length) {
                    keywords = txt.map(i => i.match(/([a-zA-z]\w+)/g)).reduce((pre, cur) => {
                        return cur ? pre.concat(cur) : pre;
                    }, [])
                    if(keywords&&keywords.length) {
                        break;
                    }
                } else {
                    continue;
                }
            }
            return keywords;
        }
    }
}