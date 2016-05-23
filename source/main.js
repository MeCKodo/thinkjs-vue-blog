import './index.scss';
import Vue from 'vue';
import $ from 'jquery';
import myHeader from 'components/index/header.vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import routerMap from "./router";
Vue.use(VueResource);
Vue.use(VueRouter);
const router = new VueRouter({});
routerMap(router);
console.log($);
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
