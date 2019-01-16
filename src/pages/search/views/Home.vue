<template>
    <div class="home">
        <el-tabs v-model="activeTab" type="card" >
            <el-tab-pane label="前端概况" name="front">
                <Front/>
            </el-tab-pane>
            <el-tab-pane label="自定义查询" name="search">
                <Search />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Search from './Search.vue'
    import Front from './Front.vue'
    export default {
        name: "home",
        data() {
            return {
                activeTab: 'front'
            };
        },
        methods: {
           
        },
        components:{Search,Front}
    };
</script>
