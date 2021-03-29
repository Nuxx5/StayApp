import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home-page.vue'
// import chatApp from './cmps/chat-app.vue'
import stayApp from './views/stay-app.vue'
import stayDetails from './views/stay-details.vue'
import stayEdit from './views/stay-edit.vue'
import login from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import stayAdd from './views/stay-add.vue'
import dashboard from './views/dashboard.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: homePage
        },
        {
            path: '/stay',
            name: 'stay',
            component: stayApp
        },
        {
            path: '/stay/add',
            name: 'stay-add',
            component: stayAdd
        },
        {
            path: '/stay/edit/:id',
            name: 'stayEdit',
            component: stayEdit
        },
        {
            path: '/stay/:id',
            name: 'stay-details',
            component: stayDetails
        },
        // {
        //     path: '/chat',
        //     name: 'chat',
        //     component: chatApp
        // },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/user/:id',
            name: 'user-details',
            component: userDetails
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            components: dashboard
        }
    ]
})
