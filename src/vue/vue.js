function templateReplace(el, __innerdata, tempet) {
    var $el = document.querySelector(el || "body"),
        str = tempet,
        _key;
    for (var i in __innerdata) {
        _key = i.replace(/^__(.*)__$/, function(all, key) {
            return key;
        });
        str = str.replace(new RegExp("\{\{" + _key + "\}\}", "g"), __innerdata[i]["val"]);
    }
    $el.innerHTML = str;

}

function _getTemplate(el) {
    return document.querySelector(el || "body").innerHTML;
}

function Vue(config) {
    var __innerdata = {
            _data: {}
        },
        _el = config.el || "body",
        _data = config.data || {},
        _tempet = _getTemplate(_el);
    __innerdata.el = _el;
    __innerdata.tempet = _tempet;
    //遍历_data
    for (var i in _data) {

        (function(key) {
            var tempetInnerKey = "__" + key + "__";
            __innerdata["_data"][tempetInnerKey] = {};
            Object.defineProperty(__innerdata, key, {
                set: function(val) {
                    __innerdata["_data"][tempetInnerKey]["val"] = val;
                    templateReplace(_el, __innerdata["_data"], _tempet);
                },
                get: function() {
                    return __innerdata["_data"][tempetInnerKey]["val"];
                }
            });
            __innerdata[key] = _data[key];
        })(i);
    }
    return __innerdata;

}