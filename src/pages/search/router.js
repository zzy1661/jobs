import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        // {
        //     path: '/test',
        //     name: 'test',
        //     component: resolve => require(['./views/Test.vue'], resolve)
        // },
        {
            path: '/:name?',
            name: 'home',
            component: Home,
            
        }
    ]
})
