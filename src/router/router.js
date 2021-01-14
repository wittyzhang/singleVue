/*
 * @Author: your name
 * @Date: 2020-10-29 10:54:16
 * @LastEditTime: 2021-01-14 12:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /haowulianmeng/src/pages/index/router/router.js
 */

import store from '../store'
import SelectTree from '../pages/selectTree.vue';
import Login from '../pages/login.vue';
// webpackChunkName注释作用：将对应的文件打入[name].chunk.js文件中
// const Login = () =>
//     import ( /* webpackChunkName: "login" */ '../pages/pages/login');



const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
          title: '登录',
          hideheadder:true
      },
    },
    {
      path: '/selectTree',
      component: SelectTree,
      meta: {
          title: '树形菜单',
          activeIndex: 3
      },
    }
  ],
});

// 页面刷新时，重新赋值token
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的                         
    //meta:{requireAuth:true}，// 意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
        next();
    } else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
  } else {
    next();
  }
})

export default router;