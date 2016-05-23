<template>
    <article>
        <aside>
            <h2>文章列表</h2>
            <ul>
                <li :class="{ 'active' : current === $index }" @click="choice($index)" v-for="el in arts"><a>{{el.title}}</a></li>
            </ul>
        </aside>
        <section>
            {{{decodeURIComponent(content)}}}

        </section>
    </article>
</template>
<style scoped>
    article {
        background: #fff;
        border-radius: 5px;
        display: flex;
    }
    aside {
        padding: 15px 0;
        flex: 1;
    }
    aside h2 {
        text-align: center;
        padding:0 0 10px;
        border-bottom: 1px solid #ccc;
    }
    aside li {
        color: #333;
        padding:10px;
        cursor: pointer;
    }
    aside li.active {
        background: #F0F3F1;

    }
    section {
        padding: 15px 25px;
        border-left: 1px solid #ccc;
        flex: 4;
    }
</style>
<script>
    import prism from 'prismjs';
    export default{
        data(){
            return {
                arts : null,
                content : null,
                current : 0
            }
        },
        route: {
            data() {
                this.$http.get('/kodo/article/list')
                    .then(function(ret) {
                        this.arts = ret.data.arts;
                        this.content = ret.data.arts[0].content;
                    });
            }
        },
        ready() {
            setTimeout(function() {
                prism.highlightAll(false);
            },50)
        },
        methods : {
            choice(idx) {
                this.content = this.arts[idx].content;
                this.current = idx;
                setTimeout(function() {
                    prism.highlightAll(false);
                },0)
            }
        }
    }
</script>