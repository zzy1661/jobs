<template>
    <div class="home">
        <el-tabs v-model="activeTab" type="card" @tab-click="onTabClick">
            <el-tab-pane label="前端概况" name="front">
                <Front v-if="$route.params.name==='home'||'front'" />
            </el-tab-pane>
            <el-tab-pane label="自定义查询" name="search">
                <Search v-if="$route.params.name==='search'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Search from "./Search.vue";
import Front from "./Front.vue";
export default {
    name: "home",
    data() {
        return {
            activeTab: ""
        };
    },
    mounted() {
        this.setPanel();
    },
    methods: {
        onTabClick() {
            this.$router.push({ name: this.activeTab });
        },
        setPanel() {
            var name = this.$route.params.name;
            if (name === "search") {
                this.activeTab = "search";
            } else {
                this.activeTab = "front";
            }
        }
    },
    components: { Search, Front },
    watch: {
        $route() {
            this.setPanel();
        }
    }
};
</script>
