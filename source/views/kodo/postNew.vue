<template>
    <article class="am-g">
        <div id="editor-container" class="am-u-sm-6">
            <h3>撰写文章</h3>
            <input type="text" v-model="title" placeholder="文章标题" class="am-form-field am-radius" />
            <div id="editor-trigger"></div>
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
            {{{editorContent}}}
        </div>
    </article>
</template>
<style scoped>
    #editor-trigger {
        min-height:400px;
    }
    #editor-container input {
        margin:0 0 20px;
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
        ready() {
            var self = this;
            // 创建编辑器
            var editor = new wangEditor('editor-trigger');
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
            editor.create();
        },
        methods : {
            postArticle(){
                //TODO ajax 提交文章
                let badges = [];
                this.badge.forEach(function(item) {
                    if(item.active)
                        badges.push(item.text);
                });
                $.ajax({
                    url: "/admin/article",
                    type : "POST",
                    data: {
                        title : this.title,
                        content: this.editorContent,
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
            choiceBadge(idx){
                this.badge[idx].active ? this.badge[idx].active = false : this.badge[idx].active = true;
            }
        },
        components:{
            
        }
    }
</script>