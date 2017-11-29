[https://github.com/reactjs/redux.git](https://github.com/reactjs/redux.git)
### reducer
reducer 一定是纯函数，没有任何副作用，不会修改传入的变量，不会调用Date.now(),Math.random(),
或者异步调用，或者路由转换

*对数组的无副作用操作一般都是先copy（[].concat(arr)）一个数组，然后再对copy的数组进行操作*

### container(map state to ui component props and action)

* mapStateToProps(state,ownProps),如果定义了该函数，传入到connect中，那么这个component
就会监听redux store的变化，每当变化的时候，就会去渲染connect的ui组件，这个地方的ownProps是
我们在父组件中引用本组件 时传入的
* mapDispatchToProps(dispatch,ownProps),如果定义了该函数，传入到connect中，那么当UI component
调用对应的事件的时候，就会交给dispatch处理