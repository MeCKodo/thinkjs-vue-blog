<template>
    <div>
        <article-list></article-list>
    </div>
</template>
<style lang="sass">

</style>
<script>
    import ArticleList from '../../components/index/articleList.vue';
    export default{
        data(){
            return {
            }
        },
        created () {
            document.addEventListener('scroll',function(e) {
                var top = document.body.scrollTop;
                top > 250 ? this.isScroll = true : this.isScroll = false;
            }.bind(this));
        },
        ready () {

        },
        components: {
            ArticleList
        }
    }
</script>