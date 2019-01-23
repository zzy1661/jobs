<template>
    <div class="searchPage">
    	<SearchForm></SearchForm>
    </div>
</template>
<script>
import SearchForm from '@/components/SearchForm.vue';
export default {
    name: "search",
    data() {
        return {

        };
    },
    components: {
    	SearchForm,
    }
};    
</script>
