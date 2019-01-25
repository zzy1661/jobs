<template>
    <div class="px-1 px-sm-4">
        <el-form label-width="80px" class="search-form">
            <el-form-item label="地点" class="text-left">
                <el-radio-group class="radio-group" v-model="form.JobLocation">
                    <el-radio class="mr-4 ml-0" v-for="item in locations" :label="item.value" :key="item.value">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="media justify-content-between flex-wrap">
                <el-form-item label="职位" class="media-body job-input">
                    <el-input v-model.lazy="form.Q"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </div>
            <div class="d-flex flex-wrap">
                <el-form-item label="年薪">
                    <div class="d-inline-block">
                        <input class="el-input__inner w-60" v-model="form.AnnualSalaryMin"></input>
                    </div>
                    万——
                    <div class="d-inline-block">
                        <input class="el-input__inner w-60" v-model="form.AnnualSalaryMax"></input>
                    </div>
                    万
                </el-form-item>
                <el-form-item label="时间">
                    <el-select v-model="form.ReleaseDate" placeholder="请选择发布时间">
                        <el-option v-for="item in timeOptions" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timeOptions: [
                { name: "不限", value: "" },
                { name: "今天", value: "1" },
                { name: "最近三天", value: "3" },
                { name: "最近一周", value: "7" },
                { name: "最近一月", value: "30" }
            ],
            form: {
                Q: "",
                JobLocation: "",
                AnnualSalaryMin: "",
                AnnualSalaryMax: "",
                ReleaseDate: "",
                timeName: ""
            }
        };
    },
    mounted() {
        this.form.JobLocation = this.locations[0].value;
    },
    methods: {
        search() {
            this.$emit('search')
        },
        reset() {
            this.form = {
                Q: "",
                JobLocation: this.locations[0].value,
                AnnualSalaryMin: "",
                AnnualSalaryMax: "",
                ReleaseDate: "",
                
            }
        },
        removeConditions(fields) {
            fields.forEach(f => {
                if (f === "JobLocation") {
                    this.form.JobLocation = this.locations[0].vlaue;
                } else {
                    this.form[f] = "";
                }
            });
        }
    },
    computed: {
        locations() {
            return this.$store.state.locations;
        }
    },
    watch: {
        form: {
            deep: true,
            handler(newForm, oldForm) {
                if (isNaN(newForm.AnnualSalaryMin)) {
                    newForm.AnnualSalaryMin = "";
                }
                if (isNaN(newForm.AnnualSalaryMax)) {
                    newForm.AnnualSalaryMax = "";
                }
                if(newForm.AnnualSalaryMin&&newForm.AnnualSalaryMax&&newForm.AnnualSalaryMax<newForm.AnnualSalaryMin) {
                    newForm.AnnualSalaryMin = "";
                }
                let params = {...newForm};
                params.AnnualSalaryMin = newForm.AnnualSalaryMin||-1;
                params.AnnualSalaryMax = newForm.AnnualSalaryMax || -1;
                params.timeName = params.locationName = '';
                if (newForm.ReleaseDate) {
                    params.timeName = this.timeOptions.filter(
                        item => item.value == newForm.ReleaseDate
                    )[0].name;
                }
                const location = this.locations.filter(lo=>lo.value==newForm.JobLocation)[0];
                params.locationName = location && location.name;
                this.$emit("input", params);
            }
        }
    }
};
</script>
<style>
.search-form label {
    margin-bottom: 0;
}
.job-input {
    min-width: 300px;
}
</style>
