import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue"
import Register from "./views/register"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
