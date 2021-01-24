import Vue from 'vue';
import Antd from 'ant-design-vue';
import VueRouter from 'vue-router'
import App from './App';
import router from './router/index.js'
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
