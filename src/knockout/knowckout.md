### click event

* reference the root or parent object by ***$root,$parent***
* the parameter to click function is ***data,eventObject,***
* click event handler function can return true to continue default action
* to stop bublle  using the next configuration when attach event
```
<button data-bind="click: myButtonHandler, clickBubble: false">
             Click me
         </button>
         
 ``` 
 *  just only use native event.using the following configuration
 ```$xslt

ko.options.useOnlyNativeEvents = true;

```