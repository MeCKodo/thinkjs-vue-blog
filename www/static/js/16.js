webpackJsonp([16],{

/***/ 34:
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

/***/ 35:
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
	  console.warn("[vue-loader] source/common/kodo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(42)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/kodo/WebstormProjects/thinkJsProject/blog/source/common/kodo.vue"
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
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./kodo.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./kodo.vue");
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

	exports = module.exports = __webpack_require__(34)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.header {\n    text-align: center;\n}\n", "", {"version":3,"sources":["/./source/common/kodo.vue?671de344"],"names":[],"mappings":";AAqCA;IACA,mBAAA;CACA","file":"kodo.vue","sourcesContent":["<template>\n    <article>\n        <div class=\"header\">\n            <div class=\"am-g\">\n                <h1>你的房间</h1>\n                <p>Integrated Development Environment<br/>代码编辑，代码生成，界面设计，调试，编译</p>\n            </div>\n            <hr />\n        </div>\n\n        <div class=\"am-g\">\n            <div class=\"am-u-lg-6 am-u-md-8 am-u-sm-centered\">\n                <form class=\"am-form\">\n                    <label >主人:</label>\n                    <input type=\"text\" name=\"\" v-model=\"username\"  value=\"\">\n                    <br>\n                    <label >暗号:</label>\n                    <input type=\"password\" name=\"\" v-model=\"pwd\"  value=\"\">\n                    <br>\n                    <label for=\"remember-me\">\n                        <input id=\"remember-me\" type=\"checkbox\">\n                        记住密码\n                    </label>\n                    <br />\n                    <div class=\"am-cf\">\n                        <input type=\"submit\" @click=\"login\" name=\"\" value=\"登 录\" class=\"am-btn am-btn-primary am-btn-sm am-fl\">\n                        <input type=\"submit\" name=\"\" value=\"忘记密码 ^_^? \" class=\"am-btn am-btn-default am-btn-sm am-fr\">\n                    </div>\n                </form>\n                <hr>\n                <p>© 2014 AllMobilize, Inc. Licensed under MIT license.</p>\n            </div>\n        </div>\n    </article>\n\n</template>\n<style>\n    .header {\n        text-align: center;\n    }\n</style>\n<script>\n    export default{\n        route : {\n            data(transition){\n                console.log(transition);\n            }\n        },\n        data() {\n            return {\n                username : '',\n                pwd : ''\n            }\n        },\n        methods : {\n            login(){\n                let _this = this;\n                $.ajax({\n                    url : \"/kodo/login/index\",\n                    type : \"POST\",\n                    data : {\n                        username : this.username,\n                        pwd : this.pwd\n                    },\n                    success(ret) {\n                        if(ret.errcode === 0) {\n                            _this.$route.router.go('admin');\n                        } else {\n                            alert(ret.msg);\n                        }\n                    },\n                    error(){\n\n                    }\n                })\n            }\n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 41:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <article>
	//         <div class="header">
	//             <div class="am-g">
	//                 <h1>你的房间</h1>
	//                 <p>Integrated Development Environment<br/>代码编辑，代码生成，界面设计，调试，编译</p>
	//             </div>
	//             <hr />
	//         </div>
	//
	//         <div class="am-g">
	//             <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
	//                 <form class="am-form">
	//                     <label >主人:</label>
	//                     <input type="text" name="" v-model="username"  value="">
	//                     <br>
	//                     <label >暗号:</label>
	//                     <input type="password" name="" v-model="pwd"  value="">
	//                     <br>
	//                     <label for="remember-me">
	//                         <input id="remember-me" type="checkbox">
	//                         记住密码
	//                     </label>
	//                     <br />
	//                     <div class="am-cf">
	//                         <input type="submit" @click="login" name="" value="登 录" class="am-btn am-btn-primary am-btn-sm am-fl">
	//                         <input type="submit" name="" value="忘记密码 ^_^? " class="am-btn am-btn-default am-btn-sm am-fr">
	//                     </div>
	//                 </form>
	//                 <hr>
	//                 <p>© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
	//             </div>
	//         </div>
	//     </article>
	//
	// </template>
	// <style>
	//     .header {
	//         text-align: center;
	//     }
	// </style>
	// <script>
	exports.default = {
	    route: {
	        data: function data(transition) {
	            console.log(transition);
	        }
	    },
	    data: function data() {
	        return {
	            username: '',
	            pwd: ''
	        };
	    },
	
	    methods: {
	        login: function login() {
	            var _this = this;
	            $.ajax({
	                url: "/kodo/login/index",
	                type: "POST",
	                data: {
	                    username: this.username,
	                    pwd: this.pwd
	                },
	                success: function success(ret) {
	                    if (ret.errcode === 0) {
	                        _this.$route.router.go('admin');
	                    } else {
	                        alert(ret.msg);
	                    }
	                },
	                error: function error() {}
	            });
	        }
	    }
	};
	// </script>
	/* generated by vue-loader */

/***/ },

/***/ 42:
/***/ function(module, exports) {

	module.exports = "\n<article>\n    <div class=\"header\">\n        <div class=\"am-g\">\n            <h1>你的房间</h1>\n            <p>Integrated Development Environment<br/>代码编辑，代码生成，界面设计，调试，编译</p>\n        </div>\n        <hr />\n    </div>\n\n    <div class=\"am-g\">\n        <div class=\"am-u-lg-6 am-u-md-8 am-u-sm-centered\">\n            <form class=\"am-form\">\n                <label >主人:</label>\n                <input type=\"text\" name=\"\" v-model=\"username\"  value=\"\">\n                <br>\n                <label >暗号:</label>\n                <input type=\"password\" name=\"\" v-model=\"pwd\"  value=\"\">\n                <br>\n                <label for=\"remember-me\">\n                    <input id=\"remember-me\" type=\"checkbox\">\n                    记住密码\n                </label>\n                <br />\n                <div class=\"am-cf\">\n                    <input type=\"submit\" @click=\"login\" name=\"\" value=\"登 录\" class=\"am-btn am-btn-primary am-btn-sm am-fl\">\n                    <input type=\"submit\" name=\"\" value=\"忘记密码 ^_^? \" class=\"am-btn am-btn-default am-btn-sm am-fr\">\n                </div>\n            </form>\n            <hr>\n            <p>© 2014 AllMobilize, Inc. Licensed under MIT license.</p>\n        </div>\n    </div>\n</article>\n\n";

/***/ }

});
//# sourceMappingURL=16.js.map