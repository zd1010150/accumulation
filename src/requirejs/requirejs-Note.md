### requireJS 
#### baseUrl
* 以/开头，或者以.js结尾，或者含有协议，不会使用baseUrl
#### shim
* Remember: only use shim config for non-AMD scripts,
      scripts that do not already call define(). The shim
      config will not work correctly if used on AMD scripts,
      in particular, the exports and init config will not
      be triggered, and the deps config will be confusing
      for those cases.
#### map
#### paths
#### config
There is a common need to pass configuration info to a module. 
That configuration info is usually known as part of the application, and there needs to be a way to pass that down to a module. In RequireJS, that is done with the config option for requirejs.config(). 
Modules can then read that info by asking for the special dependency "module" and calling module.config().
```
requirejs.config({
    config: {
        'bar': {
            size: 'large'
        },
        'baz': {
            color: 'blue'
        }
    }
});

//bar.js, which uses simplified CJS wrapping:
//http://requirejs.org/docs/whyamd.html#sugar
define(function (require, exports, module) {
    //Will be the value 'large'
    var size = module.config().size;
});

//baz.js which uses a dependency array,
//it asks for the special module ID, 'module':
//https://github.com/requirejs/requirejs/wiki/Differences-between-the-simplified-CommonJS-wrapper-and-standard-AMD-define#wiki-magic
define(['module'], function (module) {
    //Will be the value 'blue'
    var color = module.config().color;
});


```
#### deps
 An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. 
 Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration.
  It does not block any other require() calls from starting their requests for modules, ***it is just a way to specify 
some modules to load asynchronously as part of a config block.***