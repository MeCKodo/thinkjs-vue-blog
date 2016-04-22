<template>
    <header id="header" :class="{ 'scroll' : isScroll}">
        <nav>
            <ul>
                <li><a>里程碑</a></li>
                <li><a>首页</a></li>
                <li><a>留言</a></li>
                <li><a>作品</a></li>
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
        title: "里程碑",
        href: ""
    }, {
        title: "里程碑",
        href: ""
    }, {
        title: "里程碑",
        href: ""
    }];
    export default{
        props : ['is-scroll'],
        data(){
            return {}
        },
        components: {}
    }
</script>