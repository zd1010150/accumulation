/**
 * 连续触发某个函数，但是保证只在最后一次触发时，才执行函数,例如window的resize事件
 * 
 * @author:kiwizhang.zd
 * @DateTime:2016-03-10T19:59:41+0800
 * @param                             {[type]} processor [description]
 * @param                             {[type]} waitTime  [description]
 * @param                             {[type]} context   [description]
 * @return                            {[type]}           [description]
 */
var $=require("./jquery/jquery.min.js");
console.log($);
var obj1={
	forecolor:"red",
	backcolor:"blue"
};
var obj2={
	forecolor:"green"
};
var obj={};
$.extend(obj,obj1,obj2);
console.log("[debug obj]",obj);
exports.debounce = function(processor, waitTime, context) {
	return function() {
		clearTimeout(processor.timerId);
		processor.timerId = setTimeout(
			function() {
				processor.call(context,[].slice.call(arguments).slice(3));
			}, waitTime);
	};

};