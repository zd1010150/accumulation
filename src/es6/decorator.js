function readonly(target, key, descriptor) {
    descriptor.isWritable = false;
    return descriptor;
}
class Hero {
    constructor(name) {
        this.name = name;
        this.title = "hero";
    }
    @readonly
    bigPower() {
        console.log("I am flying on the head ");
    }
}
// var superman = new Hero();
// superman.bigPower = function(){
//   console.log("I can climb the wall");
// }
function HeroFather(target) {
    target.title = "hero";
    target.sayBigPower = function() {
        console.log("Ihave big power");
    };
}
@HeroFather
class SuperHero {
    constructor(name) {
        this.name = name;
    }
}
var spiderman = new SuperHero("spiderman");
console.log("===" + spiderman.name);

function deprecated(errorinfo) {
    var styleStr = "color:red;"
    errorinfo = errorinfo || "this is defalut errorinfo";
    return function(target, key, descript) {
        console.log("%c"+errorinfo,styleStr);
    }
}

class Test {
    @deprecated()
    testDeprecated() {
        console.log("work");
    }
    @deprecated("this method deprecated,this is harder error info")
    testHarder(){
      console.log("work2");
    }
}
var t = new Test();
t.testDeprecated();
t.testHarder();
function log(target,key,descriptor){
  var oldvalue = descriptor.value;
  descriptor.value = function(){
    console.log(`calling ${key},the args are`,arguments);
    oldvalue.apply(null,arguments);
  }
  return descriptor;
}
class Test2 {
  @log
  setname(name){
    console.log("===="+name);
  }
}
new Test2().setname("344");
