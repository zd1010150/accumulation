//extension
var Vue = {
   __message__:"",
};
console.log(Object.defineProperty);
Object.defineProperty(Vue,'message',{
    get:function(){
        return this.__message__;
    },
    set:function(val){
        this.__message__ = val;
    }
});

console.log("1",Vue.message);
Vue.message = "Dan,Come on!"
console.log(Vue.message);