export default function (router){
    router.map({
        '*' : {
            name : "404",
            component (resolve) {
                require(['./common/404.vue'], resolve);
            }
        },
        '/' : {
            component (resolve) {
                require(['./common/kodo.vue'], resolve);
            }
        },
        '/login' : {
            name : "login",
            component(resolve){
                require(['./common/kodo.vue'], resolve);
            }
        },
        '/admin': {
            name : 'admin',
            auth : true,
            component(resolve) {
                require(['./views/kodo/admin.vue'], resolve);
            },
            subRoutes: {
                '/': {
                    // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
                    // 一个Bar组件
                    component (resolve) {
                        require(['./views/profile.vue'], resolve);
                    }
                },
                '/post-new': {
                    // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
                    // 一个Bar组件
                    component (resolve) {
                        require(['./views/kodo/postNew.vue'], resolve);
                    }
                }
            }
        }
    });
    router.beforeEach(({to,next}) => {
        console.log(localStorage.getItem('kodo'));
        if (to.auth) {
            // 对身份进行验证...
            if(localStorage.getItem('kodo')) {
                next();
            } else {
                alert('身份验证已过期,请登入');
                let redirect = encodeURIComponent(to.path);
                console.log(redirect);

                router.go({name: 'login'});
            }
        } else {
            next();
        }
        // transition.next();
    });
}
