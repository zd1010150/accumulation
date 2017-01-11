const createInjector = (modules) => {
    let injector = {},
        _cacheInstance_ = {};
    const getByFuncName = function(funcName) {
        return _cacheInstance_[funcName];
    };
    const addFuncName = function(funcname, func) {
        _cacheInstance_[name] = func;
    }
    _cacheInstance_ = {
      "whoiam":function(){
        return function(surname) {
            return "kiwi" + surname;
        }.apply(this,arguments);
      },
      "greeting":function(){
        return function(whoiam) {
            var myName = whoiam("zhang");
            console.log(`hello-${myName}`);
        }.apply(this,[cache["whoiam"]]);
      }
    };
    injector.invoke = function() {
        let funcArrs = Array.prototype.slice.call(arguments, 0);
        funcArrs.forEach(function(funcArr) {
                let funcArrName = funcArr[0],
                    _invokedFunc = funcArr[1]；
                //根据函数名查找所有的相关的函数
                const getFuncIterator = function(funcName) {

                    let argArr = [];
                    let func = modules.filter(function(item) {
                        if (item[0] === funcName) {
                            return item;
                        }
                    });
                    //获取当前modules中的项
                    func = func.length > 0 ? func.slice(0, 1)[0] : null;
                    if (func === null) {
                        return;
                    } else {
                        argArr = func.slice(1, -1);
                    }
                    //遍历依赖
                    if (argArr.length > 0) {
                        argArr = argArr.map(function(funcName) {
                            let _func = getByFuncName(funcName);
                            if (!_func) {
                                _func = getFuncIterator(funcName);
                                addFuncName(funcName, _func);
                            }
                            return function() {
                                _func.apply(this, arguments);
                            };
                        });
                    }
                }); func = func.length > 0 ? func.slice(0, 1)[0] : null;
            if (func === null) {
                return;
            } else {
                argArr = func.slice(1, -1);
            }
            //遍历依赖
            if (argArr.length > 0) {
                argArr = argArr.map(function(funcName) {
                    let _func = getByFuncName(funcName);
                    if (!_func) {
                        _func = getFuncIterator(funcName);
                        addFuncName(funcName, _func);
                    }
                    return function() {
                        _func.apply(this, arguments);
                    };
                });
            }

            let _func = function() {
                return func.apply(this, arguments);
            };
            //_invokedFunc(_func);
            _invokedFunc.call(null, _func);
        });

};
return injector;
};
const getParameterNames = (func) => {
    if (Object.prototype.toString.call(func) === '[object Function]') {
        const funcStr = func.toString();
        const reg = /function\s*\((.*)\)/g,
            trimReg = /^[\s\u3000\uFEFF\xA0]+|[\s\u3000\uFEFF\xA0]+$/g;
        let paraStr = reg.exec(funcStr);
        console.log(paraStr[1]);
        paraStr = paraStr[1].split(",");
        paraStr = paraStr.map(function(onePara) {
            return trimReg.exec(onePara)[1];
        });
        return paraStr;
    } else
        return false;
};
const t = function(a, b, c, de) {};
//getParameterNames(t);
const modules = [];
modules.push(['greeting', 'whoiam', function(whoiam) {
    var myName = whoiam("zhang");
    console.log(`hello-${myName}`);
}]);
modules.push(["whoiam", function(surname) {
    return "kiwi" + surname;
}]);

var cache = {
  "whoiam":function(){
    return function(surname) {
        return "kiwi" + surname;
    }.apply(this,arguments);
  },
  "whoyouare":function(){
    return function(surname) {
        return "fedeoo" + surname;
    }.apply(this,arguments);
  },
  "greeting":function(){
    return function(whoiam,whoyouare) {
        var myName = whoiam("zhang") + whoyouare("li");
        console.log(`hello-${myName}`);
    }.apply(this,[cache["whoiam"],cache["whoyouare"]]);
  }
};

(function (greeting) {
  greeting();
}).apply(this,[cache["greeting"]]);

const injector = createInjector(modules);
injector.invoke(["greeting",function (greeting) {
  greeting('kiwi');
}]);
