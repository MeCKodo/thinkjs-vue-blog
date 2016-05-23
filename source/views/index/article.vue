<template>
    <div id="container">
        <article class="article">
            <time v-html="article.ctime"></time>
            <h2 v-html="article.title"></h2>
            <span>
                <i v-for="el in article.badges" v-text="'#' + el"></i>
            </span>
            <section class="article-content">
                {{{decodeURIComponent(article.content)}}}
                <strong>转载请注明来源：<a>二哲</a></strong>
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
    import prism from 'prismjs';
    export default{
        data(){
            return {
                article : {
                    ctime : null,
                    title : null,
                    content : null,
                    badges : null
                }
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
        ready(){
            setTimeout(function() {
                prism.highlightAll(false,function() {
                    console.log('ok')
                });
                console.log(prism);
            },50)

        },
        components:{
            
        }
    }
</script>