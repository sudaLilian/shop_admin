import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue"
import Home from "./views/home"
import User from "./views/user"

Vue.use(Router);

export default new Router({
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
        {path:"/user",component:User}
      ]
    },
    {
      path: "/",
      redirect:'/login'
    }
  ]
});
