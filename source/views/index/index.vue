<template>
    <div>
        <my-header :is-scroll="isScroll"></my-header>
        <my-article></my-article>
    </div>
</template>
<style lang="sass">

</style>
<script>
    import myHeader from '../../components/index/header.vue';
    import myArticle from '../../components/index/article.vue';
    export default{
        data(){
            return {
                isScroll : false
            }
        },
        created () {
            document.addEventListener('scroll',function(e) {
                var top = document.body.scrollTop;
                if(top > 250) {
                    this.isScroll = true;
                } else {
                    this.isScroll = false;
                }
            }.bind(this));
        },
        ready () {

        },
        components: {
            myHeader,
            myArticle
        }
    }
</script>