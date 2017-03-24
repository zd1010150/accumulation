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

    * `<table><my-component></my-component></table>`是无效的，Vue对于在
        `ul，ol,table,select`里嵌套的自定义组件都认为是无效内容，正确方式是
        `<table><tr is='my-component'></tr></table>`
    * 如何获取事件对象的值？`$event.target.value`