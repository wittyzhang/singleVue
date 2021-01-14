/*
 * @Author: your name
 * @Date: 2020-10-29 10:54:16
 * @LastEditTime: 2021-01-12 14:17:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /haowulianmeng/src/main.js
 */

import router from './router/router.js';
import App from './index.vue';
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill();
import '@/css/main.scss';
import moment from 'moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
 router,
 store,
 render: h => h(App),
 moment
 }).$mount('#index')