<template>
    <article class="am-g">
        <div id="editor-container" class="am-u-sm-6">
            <section id="title">
                <h3>撰写文章</h3>
                <p>你文章的标题</p>
                <input type="text" v-model="title" placeholder="文章标题" class="am-form-field am-radius" />
            </section>
            <section>
                <h3>文章内容</h3>
                <textarea placeholder="今天,我想说的是..." @input="markRender" v-model="editorContent"></textarea>
            </section>
            <!--<div id="editor-trigger"></div>-->
            <ul>
                <li class="am-badge am-radius am-text-default"
                    v-for="el in badge"
                    :class="{ 'active' : el.active }"
                    @click="choiceBadge($index)"
                >{{el.text}}</li>
            </ul>
            <button class="am-fr am-btn am-round am-btn-secondary" type="button" @click="postArticle">发射!</button>
            <button class="am-fr am-btn am-round am-btn-secondary" type="button" @click="delete">删除</button>
        </div>
        <div id="show-content" class="am-u-sm-6">
            {{{editorContent | marked}}}
        </div>
    </article>
</template>
<style scoped>

    section {
        background: #fff;
        padding:15px 20px 10px;
        margin:20px 0;
        border-radius: 5px;
        box-shadow: 0 0 5px #f7f7f7;
    }
    section > p {
        font-size:14px;
        color: #666;
    }
    textarea {
        width:100%;
        min-height:400px;
        border:0;
    }
    h3 {
        font-weight: bold;
        font-size:18px;
        margin:0 0 10px;
    }
    #editor-container button {
        /*margin:20px 0;*/
    }
    #editor-container li {
        margin:5px 10px;
        cursor: pointer;
    }
    #editor-container li.active {
        background: #3bb4f2;
    }
</style>
<script>
    import marked from 'marked';
    import prism from 'prismjs';
    let badge = [{
        text : "css",
        active : false
    },{
        text : "js",
        active : false
    },{
        text : "自动化构建",
        active : false
    },{
        text : "自动化构建",
        active : false
    },{
        text : "自动化构建",
        active : false
    },{
        text : "自动化构建",
        active : false
    },{
        text : "自动化构建",
        active : false
    }];

    export default{
        data(){
            return{
                editorContent: '',
                title : '',
                badge : badge
            }
        },
        route: {
            data() {
                if(!this.$route.params.id) return;
                this.$http.get('/kodo/article/detail/id/' + this.$route.params.id)
                    .then(function(ret) {
                        this.title = ret.data.title;
                        this.editorContent = decodeURIComponent(ret.data.content);
                    });

            }
        },
        filters: {
            marked: marked
        },
        ready() {
            setTimeout(function() {
                prism.highlightAll(false);
            },50)
        },
        methods : {
            postArticle() {
                //TODO ajax 提交文章
                let badges = [];
                this.badge.forEach(function(item) {
                    if(item.active)
                        badges.push(item.text);
                });
                if(this.$route.params.id) {
                    update(this,this.$route.params.id)
                } else {
                    create(this);
                }

            },
            markRender () {//实时渲染markdown
                prism.highlightAll(false);
            },
            choiceBadge(idx){
                this.badge[idx].active ? this.badge[idx].active = false : this.badge[idx].active = true;
            },
            delete() {
                if(!confirm('确认删除吗?')) return;
                this.$http.post("/kodo/article/delete",{
                    id : this.$route.params.id
                }).then(function(ret) {
                    alert('更新成功');
                })
            }
        },
        components:{
            
        }
    } 
    function update(v,id) {
        v.$http.post("/kodo/article/update",{
            id : id,
            title : v.title,
            content: v.editorContent
        }).then(function(ret) {
            alert('更新成功');
        })
    }
    function create(v) {
        v.$http.post("/kodo/article/add",{
            title : v.title,
            content: v.editorContent,
            bg : JSON.stringify(v.badges)
        }).then(function(ret) {
            alert('发射成功');
        })
    }
</script>