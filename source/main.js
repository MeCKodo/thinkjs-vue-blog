import './index.scss';
import Vue from 'vue';
import myHeader from 'components/index/header.vue';
import VueRouter from "vue-router";
import routerMap from "./router";
Vue.use(VueRouter);
const router = new VueRouter({});
routerMap(router);

const app = Vue.extend({
    el: function () {
        return "html"
    },
    data () {
        return {
            isScroll : false
        }
    },
    components : {
        myHeader
    }
});

router.start(app, "#app");
