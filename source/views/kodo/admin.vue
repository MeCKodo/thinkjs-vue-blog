<template>
    <div>
        <h1>我是后台首页</h1>
        <button class="am-btn am-btn-primary am-fr" data-am-offcanvas="{target: '#doc-oc-demo2'}">点击显示侧边栏</button>
        <my-aside></my-aside>
        <router-view class="view" transition="test" transition-mode="out-in"></router-view>
    </div>
</template>
<style>
    @import "../../index.scss";
</style>
<script>
    import myAside from '../../common/admin/aside.vue';

    export default{
        data(){
            return{
                
            }
        },
        components:{
            myAside : myAside,
        }
    }
</script>