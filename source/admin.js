import Vue from 'vue';
import VueRouter from "vue-router";
import routerMap from "./admin.router";
Vue.use(VueRouter);
const router = new VueRouter();
routerMap(router);
const app = Vue.extend({
    el: function () {
        return "html"
    },
    data () {
        return {}
    },
    ready () {
    }
});

router.start(app, "#app");
