require("../css/style.css")

var funcs = require('./functions.js')
var module = require('./module.js')
 shadowDom = require('./shadowDom.js')

console.log(funcs.id())
console.log(module.id())
shadowDom.createHTMLObject()
shadowDom.createBox()

