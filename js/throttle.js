/**
 * 函数节流，保证某个时间段内，执行函数只执行一次，包括mousemove事件
 *  @author:kiwizhang.zd
 * @DateTime:2016-03-10T20:15:53+0800
 * @return                            {[type]} [description]
 */

exports.throttle = function(processor, waitTime, context) {
	var lastExecuteTime = 0,
		now;
	return function() {
		now = new Date().getTime();
		if (now - lastExecuteTime < waitTime) {
			return;
		}
		setTimeout(function() {
			processor.call(context);
			lastExecuteTime = now;
		}, 0);
	};
};


exports.throttleBytimer = function(processor, waitTime, e, context) {
	return function() {
		if (!processor._throttleTimer) {
			processor._throttleTimer = setTimeout(function() {
				processor.apply(context, [].slice.call(arguments).slice(4));
				clearTimeout(processor._throttleTimer);
			}, waitTime);
		}
	};

};