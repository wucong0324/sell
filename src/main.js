import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import '@/common/scss/index.scss'

import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'

Vue.use(VueRouter);
Vue.use(VueResource);  //  全局注册
Vue.config.productionTip = false;

const routes = [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
];
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes
});

router.push('/goods');

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    data: {
        eventHub: new Vue()
    },
    render: h => h(App)
});

