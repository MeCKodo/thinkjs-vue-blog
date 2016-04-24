<template>
    <header id="header" :class="{ 'scroll' : isScroll}">
        <nav>
            <ul>
                <li><a v-for="el in nav" v-link="el.href" v-text="el.title"></a></li>
            </ul>
            <figure>
                <img src="http://7xim8z.com1.z0.glb.clouddn.com/1.pic.jpg" alt="我的资料" title="我的资料">
                <span>二哲</span>
            </figure>
        </nav>
    </header>
    <div id="bg">
        <img src="http://7xim8z.com1.z0.glb.clouddn.com/starBg1.jpg" alt="">
    </div>
</template>
<script>

    let nav = [{
        title: "里程碑",
        href: ""
    }, {
        title: "首页",
        href: "/"
    }, {
        title: "留言板",
        href: ""
    }, {
        title: "作品",
        href: ""
    }];
    export default{
        props : ['is-scroll'],
        data(){
            return {
                nav : nav
            }
        },
        components: {}
    }
</script>