<template>
    <div id="container">
        <article class="article" v-for="el in articles">
            <time v-text="el.ctime"></time>
            <h2><a v-link="'article/'+ el._id +''">{{el.title}}</a></h2>
            <span><i v-for="badge in el.badges" v-text="'#' + badge + ' '"></i></span>
            <section class="article-content" v-html="el.content">
            </section>
            <footer>
                <a v-link="'article/'+ el._id +''">阅读全文</a>
            </footer>
        </article>

    </div>
</template>
<style lang="sass">


</style>
<script>

    export default{
        data(){
            return {
                articles : $data
            }
        },
        components: {}
    }
</script>