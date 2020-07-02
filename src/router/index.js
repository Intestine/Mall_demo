import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Address from '../views/Address.vue'
import page404 from '../views/page404.vue'
Vue.use(VueRouter)

  const routes = [
	{
	    path: '/',
		redirect: '/login',
	    name: 'MyLogin',
	},
  {
    path: '/home',
    name: 'Home',
	 meta: {
	      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/address',
    name: 'Address',
	meta: {
	      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	    },
    component: Address
  },
  {
    path: '*',
    name: '404',
    component: page404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

if (window.localStorage.getItem('token')) {
    store.commit('LOGIN', window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
		
    }
	else {
	     next();
	 }
})

export default router
