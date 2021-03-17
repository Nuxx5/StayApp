import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home-page.vue'
// import chatApp from './cmps/chat-app.vue'
import stayApp from './views/stay-app.vue'
import stayDetails from './views/stay-details.vue'
import stayEdit from './views/stay-edit.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'

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
            path: '/stay/:id',
            name: 'stay-details',
            component: stayDetails
        },
        {
            path: '/stay/edit/:id',
            name: 'stayEdit',
            component: stayEdit
        },
        // {
        //     path: '/chat',
        //     name: 'chat',
        //     component: chatApp
        // },
        {
            path: '/login',
            name: 'loginSignup',
            component: loginSignup
        },
        {
            path: '/user/:id',
            name: 'user-details',
            component: userDetails
        }
    ]
})
