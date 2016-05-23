<template>
    <div>
        <my-aside></my-aside>
        <router-view style="margin: 30px 25px 0 80px" class="view" transition="page" transition-mode="out-in"></router-view>
    </div>
</template>
<style>
    @import "../../index.scss";
    body {
        background: #F7F7F6;
    }
</style>
<script>
    import myAside from '../../common/admin/aside.vue';

    export default{
        data(){
            return{
                
            }
        },
        components:{
            myAside
        }
    }
</script>