var throttle = require("./throttle.js").throttleBytimer;
var debounce = require("./debounce.js").debounce;
var $=require("./jquery/jquery.min.js");
var div = document.getElementById("demo");
var processResize = function() {
	div.style.height = div.offsetWidth + "px";
	console.log("[debug throttle]", +new Date());
};
var listener = debounce(processResize, 1000);
console.log("[debug jq]",$);
$(window).on("resize", listener);

var handler = function() {
	console.log(new Date());
};
var inputListener = throttle(handler, 1000, null);
$("#inputtest").on("input", inputListener);
