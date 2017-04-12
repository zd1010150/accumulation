* v-show & v-if 用法区别：

    v-show,只是纯基于css的隐藏和显示，和v-if的动态渲染不一样，
    v-if是真正的动态渲染，会销毁条件块内的事件监听器和子组件，切换代价很大.
    所以，如果是频繁的渲染那么就使用v-show就可以，但是如果不太可能频繁切换，
    使用v-if 就好。
* Vue会自动监测数组的变动，然后刷新对应的视图

    但是需要注意的是需要调用一些规定的方法来改变数组，包括pop,push,shift,unshift,
    sort,reverse,splice.例如我们常用的array[index] = new value 这种方法，不会
    触发 Vue去自动刷新。

* 计算属性和watch

    当一个值发生变化的时候，组件中其他的值也会相应的发生变化，那么就应该使用计算属性和watch，
    但一般情况下用计算属性，但是当变化的开销比较大，例如可能需要复杂计算，或者异步获取，那么
    就应该使用watch。
* v-bind,v-model的区别

   * v-bind的用法：v-bind:class,v-bind:style,v-bind:props
   *  v-model用于绑定data与htmlform控件的值，根据控件的类型，绑定不同的事件类型

* Vue Component

    * 不应该在子组件的内部改变props。主要是因为以下2种情形：
      * prop 作为初始值传入后，子组件想把它当作局部数据来用；
      * prop 作为初始值传入，由子组件处理成其它数据输出。

      对这两种原因，正确的应对方式是：
        * 定义一个局部变量，并用 prop 的值初始化它
        * 定义一个计算属性，处理 prop 的值并返回
    * props和v-bind都可以向组件传递值，但是props只是传递静态的值给子组件，但是v-bind是动态的，每当父组件改变了值，子组件都会得到通知。注意
    * `<table><my-component></my-component></table>`是无效的，Vue对于在
        `ul，ol,table,select`里嵌套的自定义组件都认为是无效内容，正确方式是
        `<table><tr is='my-component'></tr></table>`
    * 如何获取事件对象的值？`$event.target.value`
    * 给控件赋值，this.$refs.input.value = “newValue”,
    * 插槽与作用域插槽,作用域插槽是一种特殊的插槽，特殊在于是通过`<template scope="variable from parent"> {{}}</template>`,其中的
    *scope* 的取值是临时变量,此处的临时变量，表示的是所有传入到slot中的值，是一个作用域

    ```
    子列表：
    Vue.component("list",{
      template:"<div><ul>{{litodos}}"
        +"<slot name='item' v-for='item in litodos' :text= 'item.text' :time='item.time'></slot>"
        +"</ul>"
        +"<hr><ul>"
          +"<li  v-for='item in litodos' >{{item}}</li>"
          +"</ul></div>",
      props:['litodos']
    });
    父组件：
    Vue.component("app",{
      template:"<div class='container'> "
      +"<list :litodos='todos'>"
      +"<template slot='item' scope='props'><li>{{props.text}} </li></template>"
      +"</list>"
      +"</div>",
      data:function(){
        return {
          todos:[
            {
              text:'study english',
              time:'3hour'
            },{
              text:'study vue',
              time:'2hour'
            }
          ]
        };
      }
    })

    ```
    * 在组合组件时，内容分发 API 是非常有用的机制。
* Vue 父子组件的数据传递和事件分发
  * 通过使用prop与v-bind可以传递数据到子组件
  * 通过在子组件上绑定v-on可以调用父组件的方法
  * 通过使用slot父组件可以向子组件定义展示的内容，其中有一类特殊的的slot是作用域slot，作用域slot的目标是，在父组件中可以调用子组件作用域下的值。
* Vue 组件的循环调用

 组件间的[循环引用解决方案](https://cn.vuejs.org/v2/guide/components.html#组件间的循环引用Circular-References-Between-Components)
* 属性监测

  直接向对象添加属性，并不会触发检测，这时候可以创建一个新对象，包含原对象的属性和方法，
  ```
  // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
* 使用render方法来从底层控制整个组件的渲染和事件处理
* Vue Plugin
  * Vue plugin is used for adding some

## Tips:
* 不要在dom属性中使用Mustache **{{}}**,而应该使用 **v-bind**
*
