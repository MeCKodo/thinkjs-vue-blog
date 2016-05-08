webpackJsonp([5],{

/***/ 10:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(39)
	__vue_script__ = __webpack_require__(41)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] source/views/kodo/postNew.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(45)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/kodo/WebstormProjects/thinkJsProject/blog/source/views/kodo/postNew.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fd39ea1e&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./postNew.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fd39ea1e&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./postNew.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, "\n#editor-trigger[_v-fd39ea1e] {\n    min-height:400px;\n}\n#editor-container input[_v-fd39ea1e] {\n    margin:0 0 20px;\n}\n#editor-container button[_v-fd39ea1e] {\n    /*margin:20px 0;*/\n}\n#editor-container li[_v-fd39ea1e] {\n    margin:5px 10px;\n    cursor: pointer;\n}\n#editor-container li.active[_v-fd39ea1e] {\n    background: #3bb4f2;\n}\n", "", {"version":3,"sources":["/./source/views/kodo/postNew.vue?3bb89c2c"],"names":[],"mappings":";AAqBA;IACA,iBAAA;CACA;AACA;IACA,gBAAA;CACA;AACA;IACA,kBAAA;CACA;AACA;IACA,gBAAA;IACA,gBAAA;CACA;AACA;IACA,oBAAA;CACA","file":"postNew.vue","sourcesContent":["<template>\n    <article class=\"am-g\">\n        <div id=\"editor-container\" class=\"am-u-sm-6\">\n            <h3>撰写文章</h3>\n            <input type=\"text\" v-model=\"title\" placeholder=\"文章标题\" class=\"am-form-field am-radius\" />\n            <div id=\"editor-trigger\"></div>\n            <ul>\n                <li class=\"am-badge am-radius am-text-default\"\n                    v-for=\"el in badge\"\n                    :class=\"{ 'active' : el.active }\"\n                    @click=\"choiceBadge($index)\"\n                >{{el.text}}</li>\n            </ul>\n            <button class=\"am-fr am-btn am-round am-btn-secondary\" type=\"button\" @click=\"postArticle\">发射!</button>\n        </div>\n        <div id=\"show-content\" class=\"am-u-sm-6\">\n            {{{editorContent}}}\n        </div>\n    </article>\n</template>\n<style scoped>\n    #editor-trigger {\n        min-height:400px;\n    }\n    #editor-container input {\n        margin:0 0 20px;\n    }\n    #editor-container button {\n        /*margin:20px 0;*/\n    }\n    #editor-container li {\n        margin:5px 10px;\n        cursor: pointer;\n    }\n    #editor-container li.active {\n        background: #3bb4f2;\n    }\n</style>\n<script>\n\n    let badge = [{\n        text : \"css\",\n        active : false\n    },{\n        text : \"js\",\n        active : false\n    },{\n        text : \"自动化构建\",\n        active : false\n    },{\n        text : \"自动化构建\",\n        active : false\n    },{\n        text : \"自动化构建\",\n        active : false\n    },{\n        text : \"自动化构建\",\n        active : false\n    },{\n        text : \"自动化构建\",\n        active : false\n    }];\n\n    export default{\n        data(){\n            return{\n                editorContent: '',\n                title : '',\n                badge : badge\n            }\n        },\n        route: {\n            data() {\n                console.log(1);\n            }\n        },\n        ready() {\n            var self = this;\n            // 创建编辑器\n            var editor = new wangEditor('editor-trigger');\n            editor.onchange = function () {\n                // onchange 事件中更新数据\n                self.editorContent = editor.$txt.html();\n            };\n            editor.config.menus = [\n                'source',\n                '|',\n                'bold',\n                'underline',\n                'italic',\n                'strikethrough',\n                'eraser',\n                'forecolor',\n                'bgcolor',\n                '|',\n                'quote',\n                'fontfamily',\n                'fontsize',\n                'head',\n                'unorderlist',\n                'orderlist',\n                'alignleft',\n                'aligncenter',\n                'alignright',\n                '|',\n                'link',\n                'unlink',\n                'table',\n                '|',\n                'img',\n                'insertcode',\n                '|',\n                'undo',\n                'redo',\n                'fullscreen'\n            ];\n            editor.create();\n        },\n        methods : {\n            postArticle() {\n                //TODO ajax 提交文章\n                let badges = [];\n                this.badge.forEach(function(item) {\n                    if(item.active)\n                        badges.push(item.text);\n                });\n                $.ajax({\n                    url: \"/admin/article\",\n                    type : \"POST\",\n                    data: {\n                        title : this.title,\n                        content: this.editorContent,\n                        bg : JSON.stringify(badges)\n                    },\n                    success(data){\n                        console.log(data)\n                    },\n                    error(){\n                        console.log('出错');\n                    }\n                });\n            },\n            choiceBadge(idx){\n                this.badge[idx].active ? this.badge[idx].active = false : this.badge[idx].active = true;\n            }\n        },\n        components:{\n            \n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(42);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//     <article class="am-g">
	//         <div id="editor-container" class="am-u-sm-6">
	//             <h3>撰写文章</h3>
	//             <input type="text" v-model="title" placeholder="文章标题" class="am-form-field am-radius" />
	//             <div id="editor-trigger"></div>
	//             <ul>
	//                 <li class="am-badge am-radius am-text-default"
	//                     v-for="el in badge"
	//                     :class="{ 'active' : el.active }"
	//                     @click="choiceBadge($index)"
	//                 >{{el.text}}</li>
	//             </ul>
	//             <button class="am-fr am-btn am-round am-btn-secondary" type="button" @click="postArticle">发射!</button>
	//         </div>
	//         <div id="show-content" class="am-u-sm-6">
	//             {{{editorContent}}}
	//         </div>
	//     </article>
	// </template>
	// <style scoped>
	//     #editor-trigger {
	//         min-height:400px;
	//     }
	//     #editor-container input {
	//         margin:0 0 20px;
	//     }
	//     #editor-container button {
	//         /*margin:20px 0;*/
	//     }
	//     #editor-container li {
	//         margin:5px 10px;
	//         cursor: pointer;
	//     }
	//     #editor-container li.active {
	//         background: #3bb4f2;
	//     }
	// </style>
	// <script>
	
	var badge = [{
	    text: "css",
	    active: false
	}, {
	    text: "js",
	    active: false
	}, {
	    text: "自动化构建",
	    active: false
	}, {
	    text: "自动化构建",
	    active: false
	}, {
	    text: "自动化构建",
	    active: false
	}, {
	    text: "自动化构建",
	    active: false
	}, {
	    text: "自动化构建",
	    active: false
	}];
	
	exports.default = {
	    data: function data() {
	        return {
	            editorContent: '',
	            title: '',
	            badge: badge
	        };
	    },
	
	    route: {
	        data: function data() {
	            console.log(1);
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        // 创建编辑器
	        var editor = new wangEditor('editor-trigger');
	        editor.onchange = function () {
	            // onchange 事件中更新数据
	            self.editorContent = editor.$txt.html();
	        };
	        editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', '|', 'img', 'insertcode', '|', 'undo', 'redo', 'fullscreen'];
	        editor.create();
	    },
	
	    methods: {
	        postArticle: function postArticle() {
	            //TODO ajax 提交文章
	            var badges = [];
	            this.badge.forEach(function (item) {
	                if (item.active) badges.push(item.text);
	            });
	            $.ajax({
	                url: "/admin/article",
	                type: "POST",
	                data: {
	                    title: this.title,
	                    content: this.editorContent,
	                    bg: (0, _stringify2.default)(badges)
	                },
	                success: function success(data) {
	                    console.log(data);
	                },
	                error: function error() {
	                    console.log('出错');
	                }
	            });
	        },
	        choiceBadge: function choiceBadge(idx) {
	            this.badge[idx].active ? this.badge[idx].active = false : this.badge[idx].active = true;
	        }
	    },
	    components: {}
	};
	// </script>
	/* generated by vue-loader */

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(44)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },

/***/ 44:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 45:
/***/ function(module, exports) {

	module.exports = "\n<article class=\"am-g\" _v-fd39ea1e=\"\">\n    <div id=\"editor-container\" class=\"am-u-sm-6\" _v-fd39ea1e=\"\">\n        <h3 _v-fd39ea1e=\"\">撰写文章</h3>\n        <input type=\"text\" v-model=\"title\" placeholder=\"文章标题\" class=\"am-form-field am-radius\" _v-fd39ea1e=\"\">\n        <div id=\"editor-trigger\" _v-fd39ea1e=\"\"></div>\n        <ul _v-fd39ea1e=\"\">\n            <li class=\"am-badge am-radius am-text-default\" v-for=\"el in badge\" :class=\"{ 'active' : el.active }\" @click=\"choiceBadge($index)\" _v-fd39ea1e=\"\">{{el.text}}</li>\n        </ul>\n        <button class=\"am-fr am-btn am-round am-btn-secondary\" type=\"button\" @click=\"postArticle\" _v-fd39ea1e=\"\">发射!</button>\n    </div>\n    <div id=\"show-content\" class=\"am-u-sm-6\" _v-fd39ea1e=\"\">\n        {{{editorContent}}}\n    </div>\n</article>\n";

/***/ }

});
//# sourceMappingURL=5.js.map