<template>
    <div id="container">
        <article class="article">
            <time v-html="article.ctime">4月01日</time>
            <h2 v-html="article.title"></h2>
            <span><i>#自动化</i> <i>#js</i> <i>#css</i></span>
            <section class="article-content">
                {{{article.content}}}
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
    import $ from 'jquery';
    export default{
        data(){
            return {
                article : null
            }
        },
        route : {
            data (transiton) {
                $.ajax({
                    url : "/index/article/?id=" + this.$route.params.id,
                    success(ret) {
                        transiton.next({
                            article : ret
                        })
                    },
                    error() {
//                        alert('网络异常');
//                        window.location.reload();
                    }
                });
            }
        },
        components:{
            
        }
    }
</script>