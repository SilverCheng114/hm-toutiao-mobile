import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout') // 布局组件
const Home = () => import('@/views/home') // 主页组件
const Question = () => import('@/views/question') // 问答组件
const Video = () => import('@/views/video') // 视频组件
const User = () => import('@/views/user') // 个人中心
const Profile = () => import('@/views/user/profile.vue') // 编辑资料组件
const Chat = () => import('@/views/user/chat.vue') // 编辑资料组件
const Login = () => import('@/views/login') // 登录组件
const Article = () => import('@/views/article') // 文章组件
const Search = () => import('@/views/search') // 搜索组件
const Result = () => import('@/views/search/result.vue') // 搜索结果
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/question',
        component: Question
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  {
    path: '/user/profile',
    component: Profile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/article',
    component: Article
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: Result
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
