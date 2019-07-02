import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue"
import Home from "./views/home"
import User from "./views/user"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        { path: "/user", component: User }
      ]
    },
    {
      path: "/",
      redirect: '/login'
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  if (localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
