<template>
	<div class="px-4">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="地点">
				<el-radio-group v-model="form.location">
					<el-radio label="全国" value="489"></el-radio>
					<el-radio label="北京" value="530"></el-radio>
					<el-radio label="上海" value="538"></el-radio>
					<el-radio label="广州" value="763"></el-radio>
					<el-radio label="深圳" value="765"></el-radio>
					<el-radio label="武汉" value="736"></el-radio>
					<el-radio label="南京" value="635"></el-radio>
					<el-radio label="杭州" value="653"></el-radio>
					<el-radio label="苏州" value="639"></el-radio>
					<el-radio label="无锡" value="636"></el-radio>
					<el-radio label="合肥" value="664"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="职位">
				<el-input v-model="form.job"></el-input>
			</el-form-item>
			<div class="d-flex justify-content-between flex-wrap">
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
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button>重置</el-button>
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
					job: '',
					location: '',
					minSalary: '',
					maxSalary: '',
					time: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>