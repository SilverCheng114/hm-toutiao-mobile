// 路由的拦截 => 导航守卫
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入store
// 前置守卫 当路由发生改变之前触发
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 拦截，判断有无token，有放行，无跳转到登录页面
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: to.path // 携带当前地址到登录页
      }
    }
    next(toPath)
  } else {
    next() // 直接放行
  }
})
// 后置守卫

export default router
