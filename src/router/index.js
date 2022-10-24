import { createRouter, createWebHistory } from "vue-router";

const mainRoute = [
    {
        path: '/',
        name: '首页',
        redirect: '/main',
        component: ()=>import('@/layout/mainPage/index.vue')
    },{
        path: '/news',
        name: "新闻",
        component: ()=>import('@/layout/page-template/index.vue')
    },{
        path: '/main',
        name: '首页',
        component: ()=>import('@/layout/mainPage/index.vue')
    },{
        path: '/group',
        name: '研究团队',
        component: ()=>import('@/layout/page-template/index.vue'),
        children: [
            {
                path: '/group/teachers',
                name: 'teachers',
                component: ()=>import('@/layout/page-template/index.vue'),
            },{
                path: '/group/students',
                name: 'students',
                component: ()=>import('@/layout/page-template/index.vue'),
            }
        ]
    },{
        path: '/results',
        name: '科研成果',
        redirect: '/results/paper',
        component: ()=>import('@/layout/page-template/index.vue'),
        children: [
            {
                path: '/results/paper',
                name: '学术论文',
                component: ()=>import('@/layout/page-template/index.vue'),
            }
        ]
    },{
        path: '/intro/:id',
        name: 'introduction',
        component: ()=>import('@/layout/article/index.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: mainRoute
})

export default router