<template>
    <article>

        <h3>文章列表</h3>
        <ul>
            <li v-for="el in arts"><a>{{el.title}}</a></li>
        </ul>
    </article>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return {
                arts : null
            }
        },
        route: {
            data(transition) {
                $.ajax({
                    url: "/kodo/article/list",
                    success(ret) {
                        transition.next({
                            arts: ret.arts
                        })

                    },
                    error() {

                    }
                })
            }
        },
        components: {}
    }
</script>