import Vue from "vue";
import App from "./App.vue";
import router from "./router";//引入路由文件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.css";
import axios from "axios";
Vue.use(ElementUI)
//在此处解决三个问题：1.axios引入问题，2.路径引入过长问题。3.headers每次都有写的问题

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
axios.interceptors.request.use (function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.getItem("token")
    return config
  })
 
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
