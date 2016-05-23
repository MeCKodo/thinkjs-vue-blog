import $ from 'jquery';
export default function (router) { 
    router.map({
        '*': {
            name: "404",
            component (resolve) {
                require(['./common/404.vue'], resolve);
            }
        },
        '/': {
            component (resolve) {
                require(['./common/kodo.vue'], resolve);
            }
        },
        '/login': {
            name: "login",
            component(resolve){
                require(['./common/kodo.vue'], resolve);
            }
        },
        '/admin': {
            name: 'admin',
            auth: true,
            component(resolve) {
                require(['./views/kodo/admin.vue'], resolve);
            },
            subRoutes: {
                '/': {
                    component (resolve) {
                        require(['./views/profile.vue'], resolve);
                    }
                },
                '/post-new/': {
                    component (resolve) {
                        require(['./views/kodo/postNew.vue'], resolve);
                    }
                },
                'update/:id' : {
                    component (resolve) {
                        require(['./views/kodo/postNew.vue'], resolve);
                    }
                },
                '/article-list': {
                    component(resolve) {
                        require(['./views/kodo/articleList.vue'], resolve)
                    }
                }
            }
        }
    });
    router.beforeEach(({to, next}) => {
        if (to.auth) {
            // 对身份进行验证...
            $.ajax({
                url : "/kodo/login/status",
                success(ret) {
                    if(ret.errcode === -1) {
                        alert('身份验证已过期,请登入');
                        let redirect = encodeURIComponent(to.path);
                        console.log(redirect);

                        router.go({name: 'login'});
                    } else {
                        next();
                    }
                    // next();
                    
                },
                error() {

                }
            });
            
        } else {
            next();
        }
        // transition.next();
    });
}
