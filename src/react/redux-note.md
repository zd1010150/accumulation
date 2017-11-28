[https://github.com/reactjs/redux.git](https://github.com/reactjs/redux.git)
### reducer
reducer 一定是纯函数，没有任何副作用，不会修改传入的变量，不会调用Date.now(),Math.random(),
或者异步调用，或者路由转换

*对数组的无副作用操作一般都是先copy（[].concat(arr)）一个数组，然后再对copy的数组进行操作*