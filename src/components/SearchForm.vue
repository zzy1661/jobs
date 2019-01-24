<template>
	<div class="px-4">
		<el-form ref="form" :model="form" label-width="80px" class="search-form">
			<el-form-item label="地点" class="text-left">
				<el-radio-group v-model="form.location" class="radio-group">
					<el-radio class="mr-4 ml-0" v-for="item in locations" :label="item.name" :value="item.value" :key="item.value"></el-radio>
				</el-radio-group>
			</el-form-item>
            <div class="media justify-content-between flex-wrap">
                <el-form-item label="职位" class="media-body job-input">
                    <el-input v-model="form.job"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </div>
			<div class="d-flex flex-wrap">
				<el-form-item label="年薪">
					<div class="d-inline-block w-60">
						<el-input v-model="form.minSalary"></el-input>
					</div>
					万——
					<div class="d-inline-block w-60">
						<el-input v-model="form.maxSalary"></el-input>
					</div>
					万
				</el-form-item>
				<el-form-item label="时间">
					<el-select v-model="form.time" placeholder="请选择发布时间">
						<el-option label="不限" value="0"></el-option>
						<el-option label="今天" value="1"></el-option>
						<el-option label="最近三天" value="3"></el-option>
						<el-option label="最近一周" value="7"></el-option>
						<el-option label="最近一月" value="30"></el-option>
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
      form: {
        job: "",
        location: "",
        minSalary: "",
        maxSalary: "",
        time: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  computed: {
      locations() {
          return this.$store.state.locations
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
