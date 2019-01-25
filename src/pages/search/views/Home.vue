<template>
    <div class="home">
        <el-tabs v-model="activeTab" type="card" @tab-click="onTabClick">
            <el-tab-pane label="前端概况" name="front" >
                <Front v-if="$route.name==='home'||'front'"/>
            </el-tab-pane>
            <el-tab-pane label="自定义查询" name="search" >
                <Search v-if="$route.name==='search'" />
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
                activeTab: ''
            };
        },
        mounted() {
            var name = this.$router.name;
            if(name === 'search') {
                this.activeTab = 'search';
            } else {
                this.activeTab = 'front'
            }
        },
        methods: {
            onTabClick() {
                this.$router.push({name:this.activeTab})
            }
        },
        components:{Search,Front}
    };
</script>
