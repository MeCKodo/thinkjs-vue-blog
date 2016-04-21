<template>

    <!-- 侧边栏内容 -->
    <div id="doc-oc-demo2" class="am-offcanvas">
        <div class="am-offcanvas-bar am-offcanvas-bar-flip">
            <div class="am-offcanvas-content">
                <a v-link="{ path : el.link}" @click="closeNav" v-for="el in nav">{{el.type}}</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
    a {
        display: block;
    }
</style>
<script>
    let navs = [{
        type : '首页',
        link : '/admin'
    },{
        type : '写小H文咯',
        link : '/admin/post-new'
    }];

    export default{
        data(){
            return{
                nav : navs
            }
        },
        ready(){

        },
        methods : {
            closeNav (){
                $("#doc-oc-demo2").offCanvas('close')
            }
        },
        components:{
            
        }
    }
</script>