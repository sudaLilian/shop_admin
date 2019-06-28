import Vue from "vue";
import App from "./App.vue";
import router from "./router";//引入路由文件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.css"
Vue.use(ElementUI)

router.beforeEach((to, from, next)=>{
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

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
