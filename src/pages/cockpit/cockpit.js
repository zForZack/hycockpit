import Vue from 'vue'
//引入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import cockpit from './cockpit.vue'
import dataV from '@jiaminghi/data-view'
Vue.config.productionTip = false
Vue.use(dataV)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 引入axios
import axios from "axios";
Vue.prototype.$axios = axios;


Vue.use(ElementUI);
new Vue({
  render: h => h(cockpit),
}).$mount('#cockpit')