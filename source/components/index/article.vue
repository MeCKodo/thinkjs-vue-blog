<template>
    <div id="container">
        <article class="article">
            <time>4月01日</time>
            <h2>我是文章标题</h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
            </section>
            <footer>
                <a>阅读全文</a>
            </footer>
        </article>
        <article class="article">
            <time>4月01日</time>
            <h2>我是文章标题</h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
            </section>
            <footer>
                <a>阅读全文</a>
            </footer>
        </article>
        <article class="article">
            <time>4月01日</time>
            <h2>我是文章标题</h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
            </section>
            <footer>
                <a>阅读全文</a>
            </footer>
        </article>
        <article class="article">
            <time>4月01日</time>
            <h2>我是文章标题</h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                <p>我是文章的内容长长长长长长长长长长长长长长长长长长</p>
            </section>
            <footer>
                <a>阅读全文</a>
            </footer>
        </article>
        <article class="article">
            <time>4月01日</time>
            <h2>我是文章标题</h2>
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
    @import "../../_variables.scss";
    #container {
        position: relative;
        max-width: 95%;
        margin: 0 auto;
    }

    .article {
        position: relative;
        padding:20px;
        margin:40px auto;
        max-width:950px;
        background: #fff;
        text-align: center;
    }



    .article > time {
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        padding: 4px 5px 0;
        color: #999;
    }

    .article > h2 {
        margin:35px 0 25px;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
    }

    .article > span {
        position: absolute;
        top: 0;
        right: 0;
        color: #999;
        padding:3px 10px;
        background: #f1f1f1;
        font-size: 14px;
    }
    .article section {
        text-align: left;
        padding:10px;
        font-size:16px;
    }
    .article p {
        margin:0 0 25px;
    }
    .article footer {
        margin:15px 0;
    }
    .article footer a {
        display: inline-block;
        color: $color;
        cursor: pointer;
         &:hover {
            text-shadow:4px 5px 9px rgba(25, 181, 150, 0.3)
         }
    }
</style>
<script>

    export default{
        data(){
            return {}
        },
        components: {}
    }
</script>