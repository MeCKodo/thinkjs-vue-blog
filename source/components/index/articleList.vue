<template>
    <div id="container">
        <article class="article" v-for="el in articles">
            <time>4月01日</time>
            <h2><a v-link="'article/'+ el._id +''">{{el.title}}</a></h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
            </section>
            <footer>
                <a>阅读全文</a>
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