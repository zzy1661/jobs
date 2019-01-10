import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/front',
        }, {
            path: '/front',
            name: '',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'front',
                    component: () => import(/* webpackChunkName: "front" */ './views/Front.vue')
                }
            ]
        },
        {
            path: '/search',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'search',
                    component: () => import(/* webpackChunkName: "search" */ './views/Search.vue')
                }
            ]

        }
    ]
})
