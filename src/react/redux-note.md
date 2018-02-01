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


### redux principle
* the state of application is read only. the only way to change the state of the application
is dispatch the action
* how to add and remove and change value in a array in unmutation method?  including
  ```
    const change = (list, index, value) => {
      if(index > -1 && index < list.length){
        return [
            ...list.slice(0,index),
            value,
            ...list.slice(index+1)
        ];
      }else return list;
    };
    const remove = (list, index) => {
      if(index > -1 && index < list.length){
        return [
          ...list.slice(0,index),
          ...list.slice(index+1),
        ]
      }else return list;
      
    }
    const add = (list, value) => ([
      ...list,
      value
    ]);
    //const add = (list, value) => (list.push(value));
    const deepFreeze = (o) => {
      Object.freeze(o);
    
      Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
        && o[prop] !== null
        && (typeof o[prop] === "object" || typeof o[prop] === "function")
        && !Object.isFrozen(o[prop])) {
          deepFreeze(o[prop]);
        }
      });
      
      return o;
    };
    const testADD = () =>{
      const beforeList = [1,10];
      const afterList = [1,10,11];
      deepFreeze(beforeList);
      expect(
        add(beforeList, 11)
      ).toEqual(afterList);
    }
    testADD();
    const testChange =() =>{
      const beforeList = [1,10,12,13];
      const afterList = [1,10,19,13];
      deepFreeze(beforeList);
      expect(
        change(beforeList, 9)
      ).toEqual(beforeList);
      expect(
        change(beforeList, -1)
      ).toEqual(beforeList);
      expect(
        change(beforeList, 2, 19)
      ).toEqual(afterList);
    }
    testChange();
    const testRemove=() => {
      const beforeList = [1,10,11,12,13];
      expect(
        remove(beforeList, -1)
      ).toEqual(beforeList);
      expect(
        remove(beforeList, 5)
      ).toEqual(beforeList);
      expect(
        remove(beforeList,3)
      ).toEqual([1,10,11,13]);
      expect(
        remove(beforeList,0)
      ).toEqual([10,11,12,13]);
    }
    testRemove();
    console.log("all is  test passed");
  ```