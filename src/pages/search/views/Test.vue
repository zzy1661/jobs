<template>
 <div>
{{msg}}
    {{txt}}
     <button @click="change">click</button>
 </div>
    

</template>
<script>
export default {
    name: 'Test',
    data(){
        return {
            msg: 'msg',
            txt: 'txt'
        }
    },
    mounted: function() {

    },
    beforeUpdate: function() {
        console.log('before update')
    },
    updated: function() {
        console.log('updated')
    },
    methods: {
        change: function() {
            this.msg = 'new msg';
            console.log('msg update')
            this.txt = 'new txt'
            console.log('txt update')
        }
    }

}
</script>

