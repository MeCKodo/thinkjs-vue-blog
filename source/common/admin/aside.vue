<template>
    <aside id="aside">
        <a class="iconfont" v-for="el in nav" v-link="el.link">{{{el.type}}}</a>
    </aside>
</template>
<style lang="sass">
    @import "../../_variables.scss";
    $asideSize : 55px;
    #aside {
        position: fixed;
        top:0;
        left:0;
        width:$asideSize;
        height:100%;
        background: #222;
        color: #fff;
        z-index:999;
    }
    #aside a {
        height:$asideSize;
        width:$asideSize;
        line-height: $asideSize;
        color: #fff;
        text-align: center;
        font-size:22px;
        font-weight:bold;
        border-bottom:1px solid #fff;
        display: block;
        @include transition();
    }
    #aside a:hover {
        color: $color;
        border-bottom:1px solid $color;
    }
</style>
<script>
    let navs = [{
        type : '&#xe600;',
        link : '/admin'
    },{
        type : '&#xe601;',
        link : '/admin/article-list'
    },{
        type : '&#xe601;',
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