<template>
    <div id="container">
        <article class="article">
            <time>4月01日</time>
            <h2><a v-link="'article'">我是文章标题</a></h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
                <strong>转载请注明来源：<a href="">二哲</a></strong>
            </section>
        </article>
    </div>
</template>
<style lang="sass" scoped>
    .article strong {
        display: block;
        font-size:12px;
        text-align: right;
        color: #666;
        a {
            color : #999;
        }
    }

</style>
<script>
    
    export default{
        data(){
            return{
                
            }
        },
        components:{
            
        }
    }
</script>