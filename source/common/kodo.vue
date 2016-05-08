<template>
    <article>
        <div class="header">
            <div class="am-g">
                <h1>你的房间</h1>
                <p>Integrated Development Environment<br/>代码编辑，代码生成，界面设计，调试，编译</p>
            </div>
            <hr />
        </div>

        <div class="am-g">
            <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                <form class="am-form">
                    <label >主人:</label>
                    <input type="text" name="" v-model="username"  value="">
                    <br>
                    <label >暗号:</label>
                    <input type="password" name="" v-model="pwd"  value="">
                    <br>
                    <label for="remember-me">
                        <input id="remember-me" type="checkbox">
                        记住密码
                    </label>
                    <br />
                    <div class="am-cf">
                        <input type="submit" @click="login" name="" value="登 录" class="am-btn am-btn-primary am-btn-sm am-fl">
                        <input type="submit" name="" value="忘记密码 ^_^? " class="am-btn am-btn-default am-btn-sm am-fr">
                    </div>
                </form>
                <hr>
                <p>© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
            </div>
        </div>
    </article>

</template>
<style>
    .header {
        text-align: center;
    }
</style>
<script>
    export default{
        route : {
            data(transition){
                console.log(transition);
            }
        },
        data() {
            return {
                username : '',
                pwd : ''
            }
        },
        methods : {
            login(){
                let _this = this;
                $.ajax({
                    url : "/kodo/login/index",
                    type : "POST",
                    data : {
                        username : this.username,
                        pwd : this.pwd
                    },
                    success(ret) {
                        if(ret.errcode === 0) {
                            _this.$route.router.go('admin');
                        } else {
                            alert(ret.msg);
                        }
                    },
                    error(){

                    }
                })
            }
        }
    }
</script>