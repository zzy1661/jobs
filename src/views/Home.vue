<template>
    <div class="home">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="前端概况" name="front">前端概况</el-tab-pane>
            <el-tab-pane label="自定义查询" name="search">自定义查询</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                activeTab: this.$route.name
            };
        },
        methods: {
            handleClick(tab, evt) {
                this.$router.push({name: tab.name})
            }
        }
    };
</script>
