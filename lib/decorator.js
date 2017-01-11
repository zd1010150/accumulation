"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _dec, _dec2, _desc2, _value2, _class3, _desc3, _value3, _class4;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function readonly(target, key, descriptor) {
    descriptor.isWritable = false;
    return descriptor;
}
var Hero = (_class = function () {
    function Hero(name) {
        _classCallCheck(this, Hero);

        this.name = name;
        this.title = "hero";
    }

    _createClass(Hero, [{
        key: "bigPower",
        value: function bigPower() {
            console.log("I am flying on the head ");
        }
    }]);

    return Hero;
}(), (_applyDecoratedDescriptor(_class.prototype, "bigPower", [readonly], Object.getOwnPropertyDescriptor(_class.prototype, "bigPower"), _class.prototype)), _class);
// var superman = new Hero();
// superman.bigPower = function(){
//   console.log("I can climb the wall");
// }

function HeroFather(target) {
    target.title = "hero";
    target.sayBigPower = function () {
        console.log("Ihave big power");
    };
}

var SuperHero = HeroFather(_class2 = function SuperHero(name) {
    _classCallCheck(this, SuperHero);

    this.name = name;
}) || _class2;

var spiderman = new SuperHero("spiderman");
console.log("===" + spiderman.name);

function deprecated(errorinfo) {
    var styleStr = "color:red;";
    errorinfo = errorinfo || "this is defalut errorinfo";
    return function (target, key, descript) {
        console.log("%c" + errorinfo, styleStr);
    };
}

var Test = (_dec = deprecated(), _dec2 = deprecated("this method deprecated,this is harder error info"), (_class3 = function () {
    function Test() {
        _classCallCheck(this, Test);
    }

    _createClass(Test, [{
        key: "testDeprecated",
        value: function testDeprecated() {
            console.log("work");
        }
    }, {
        key: "testHarder",
        value: function testHarder() {
            console.log("work2");
        }
    }]);

    return Test;
}(), (_applyDecoratedDescriptor(_class3.prototype, "testDeprecated", [_dec], Object.getOwnPropertyDescriptor(_class3.prototype, "testDeprecated"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "testHarder", [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, "testHarder"), _class3.prototype)), _class3));

var t = new Test();
t.testDeprecated();
t.testHarder();
function log(target, key, descriptor) {
    var oldvalue = descriptor.value;
    descriptor.value = function () {
        console.log("calling " + key + ",the args are", arguments);
        oldvalue.apply(null, arguments);
    };
    return descriptor;
}
var Test2 = (_class4 = function () {
    function Test2() {
        _classCallCheck(this, Test2);
    }

    _createClass(Test2, [{
        key: "setname",
        value: function setname(name) {
            console.log("====" + name);
        }
    }]);

    return Test2;
}(), (_applyDecoratedDescriptor(_class4.prototype, "setname", [log], Object.getOwnPropertyDescriptor(_class4.prototype, "setname"), _class4.prototype)), _class4);

new Test2().setname("344");