/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)

	var funcs = __webpack_require__(5)
	var module = __webpack_require__(6)
	 shadowDom = __webpack_require__(7)

	console.log(funcs.id())
	console.log(module.id())
	shadowDom.createHTMLObject()
	shadowDom.createBox()



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*body {\n    background: tomato;\n    ;\n}\n*/\n\nx-foo{\n    width:100px;\n    height:100px;\n    border: 1px solid red;\n}\n\nmy-box::shadow{\n\twidth:200px;\n\theight:300px;\n\tborder: 1px solid red;\n}\n.box{\n\twidth:200px;\n\theight:300px;\n\tborder: 1px solid red;\n}\n\nx-product {\n    display: inline-block;\n    float: left;\n    margin: 0.5em;\n    border-radius: 3px;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n    font-family: Helvetica, arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n}\n\nx-product::shadow .product-img {\n    cursor: pointer;\n    background: #FFF;\n    margin: 0.5em;\n}\n\nx-product::shadow .product-name {\n    display: block;\n    text-align: center;\n    text-decoration: none;\n    color: green;\n    border-top: 1px solid #EEE;\n    font-weight: bold;\n    padding: 0.75em 0;\n}", ""]);

	// exports


/***/ },
/* 3 */
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
/* 4 */
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

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
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

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	module.exports={

		 postAJAX:function(route, data, callback){
			var xhr = new XMLHttpRequest();
			xhr.open('POST', route);
			// xhr.responseType = 'json';
			xhr.send(data);
			xhr.onreadystatechange = function () {
			  var DONE = 4; // readyState 4 means the request is done.
			  var OK = 200; // status 200 is a successful return.
			  if (xhr.readyState === DONE) {
			    if (xhr.status === OK){
			     	console.log(xhr.responseText); // 'This is the returned text.'
			     	callback(JSON.parse(xhr.responseText))
			    } else {
			      console.log('Error: ' + xhr.status); // An error occurred during the request.
			    }
			  }
			};
		},

		getAJAX:function(route, callback){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', route);
			// xhr.responseType = 'json';
			xhr.send();
			xhr.onreadystatechange = function () {
			  var DONE = 4; // readyState 4 means the request is done.
			  var OK = 200; // status 200 is a successful return.
			  if (xhr.readyState === DONE) {
			    if (xhr.status === OK){
			     	console.log(xhr.responseText); // 'This is the returned text.'
			     	callback(JSON.parse(xhr.responseText))
			    } else {
			      console.log('Error: ' + xhr.status); // An error occurred during the request.
			    }
			  }
			};
		},
		id:function(){
			console.log(module.id);
		}

	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports={
		id:function(){
			console.log(module.id)
		}

	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	
	module.exports={

		createBox:function(){
			var BoxProto =  Object.create(HTMLElement.prototype);

			BoxProto.createdCallback = function(){
				var shadow = this.createShadowRoot();
				var div = document.createElement('div');
				// div.innerText = this.getAttribute('data-text');
				// div.height = this.getAttribute('data-height');
				// div.width = this.getAttribute('data-width');
				div.width = '150';
				div.height = '150';
				shadow.appendChild(div);
				div.addEventListener('click', function(e) {
					alert(e)
				});

			}
			var Box = document.registerElement('my-box', {
			    prototype: BoxProto
			});
		},

		createHTMLObject:function(){
	var XProductProto = Object.create(HTMLElement.prototype);
			XProductProto.createdCallback = function(){
				// Create a Shadow Root
				   var shadow = this.createShadowRoot();

				   // Create an img element and set it's attributes.
				   var img = document.createElement('img');
				   img.alt = this.getAttribute('data-name');
				   img.src = this.getAttribute('data-img');
				   img.width = '250';
				   img.height = '150';
				   img.className = 'product-img';

				   // Add the image to the Shadow Root.
				   shadow.appendChild(img);

				   // Add an event listener to the image.
				   img.addEventListener('click', function(e) {
				       window.location = this.getAttribute('data-url');
				   });

				   // Create a link to the product.
				   var link = document.createElement('a');
				   link.innerText = this.getAttribute('data-name');
				   link.href = this.getAttribute('data-url');
				   link.className = 'product-name';

				   // Add the link to the Shadow Root.
				   shadow.appendChild(link);


			}
			XProductProto.attachedCallback = function(){
				console.log('attachedCallback')

			}
			XProductProto.detachedCallback = function(){
				console.log('detachedCallback')

			}
			XProductProto.attributeChangedCallback = function(attrName, oldValue, newValue){
				console.log('attributeChangedCallback ')
				for(var x = 0;x<arguments.length;x++){
					console.log(x+' : '+arguments[x])
				}


			}

			var XProduct = document.registerElement('x-product', {
			    prototype: XProductProto
			});


		},
		addProp:function(objectProto, propString, valueObject){
			if(typeof propString != 'string')return
			Object.defineProperty(objectProto, propString, valueObject)
		},



		appendNewCustomElement:function(elementName, Prototype, text){
		if((typeof arguments[0] != 'string')||(arguments[0].indexOf('-')<0)) return //emit error and data
		
		if(!NewElement){
			var NewElement = document.registerElement(elementName.toLowerCase(),  { 
			    prototype: Prototype
			});

		} 
		NewElement.innerHTML=text
		var newelement = new NewElement();
		document.body.appendChild(newelement);


		

		},


	}

/***/ }
/******/ ]);