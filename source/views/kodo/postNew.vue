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
                <textarea placeholder="今天,我想说的是..." v-model="editorContent"></textarea>
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

            }
        },
        filters: {
            marked: marked
        },
        ready() {
            var self = this;
            // 创建编辑器
            /*var editor = new wangEditor('editor-trigger');
            editor.onchange = function () {
                // onchange 事件中更新数据
                self.editorContent = editor.$txt.html();
            };
            editor.config.menus = [
                'source',
                '|',
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                '|',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                '|',
                'link',
                'unlink',
                'table',
                '|',
                'img',
                'insertcode',
                '|',
                'undo',
                'redo',
                'fullscreen'
            ];
            editor.create();*/
        },
        methods : {
            postArticle() {
                //TODO ajax 提交文章
                let badges = [];
                this.badge.forEach(function(item) {
                    if(item.active)
                        badges.push(item.text);
                });
                $.ajax({
                    url: "/kodo/article/add",
                    type : "POST",
                    data: {
                        title : this.title,
                        content: $("#show-content").html(),
                        bg : JSON.stringify(badges)
                    },
                    success(data){
                        console.log(data)
                    },
                    error(){
                        console.log('出错');
                    }
                });
            },
            test (e) {
                this.editorContent = e.target.innerHTML;

            },
            choiceBadge(idx){
                this.badge[idx].active ? this.badge[idx].active = false : this.badge[idx].active = true;
            }
        },
        components:{
            
        }
    }
</script>