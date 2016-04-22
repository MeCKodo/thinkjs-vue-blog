
### 前言

尝试用thinkjs搭建一套blog

> thinkjs + mongodb + vue + vueRouter + webpack

### dev

> npm run dev

主站 http://localhost:8200/source/index.html
后台 http://localhost:8200/source/admin.html

### build

> npm run build

### 结合后台测试

> npm run start

主站 http://localhost:8360
后台 http://localhost:8360/admin


#### 目录介绍

由于后台使用了 `thinkjs` 框架的ES6模式

`src` 为后台编写文件, `app` 则为后台编译后的文件

线上的页面需要放在 `view/home` 下

静态资源文件全放在 `www/static` 下

前端开发目录为 `source`

#### 前端开发约定（目录）

```javascript
- source 
	- common          // 公用.vue
	- components      // 对应controller下的组件
	- static          // 第三方静态资源
	- unitTest        // 数据测试json
	- views           // 页面
	index.html        // 主站入口html
	index.sass        // 主站全局sass
	main.js           // 主站入口js
	router.js         // 主站路由
	admin.html        // 后台入口html
	admin.js          // 后台入口js
	admin.router.js   // 后台路由

```





#### 更新

> 4月22号

主站首页完成 新增article.vue header.vue _variable.scss _reset.scss