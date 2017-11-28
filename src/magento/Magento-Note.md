### Magento modes
| mode \ respects | cache static files | error handle                              | http heade |
| --------------- | ------------------ | ----------------------------------------- | ---------- |
| default         | yes                | usual log                                 | hide       |
| developer       | no                 | verbose logging,display exception to user | show       |
| production      | yes                | usual logging                             | unknown    |

 * **default** : only to deploy on single server .
 * **developer** : automatical code compilation ,debugging
 * **production** : static view files are served from cache only. New or updated files are not written to the file system
 
 #### how to change from default to developer mode
 if you are from production to developer,should do the first step,otherwise just need to do the second step
 * ``` rm -rf <your Magento install dir>/generated/metadata/* <your Magento install dir>/generated/code/*```
 * ``` magento deploy:mode:set developer ```
 
 ### Magento Front-end 
 
 #### Front-end Source Path
 
 The following relative paths are used for modules and themes:
 
 - <theme_dir>
 
 Theme directory. Usually used when talking about custom themes, or any theme in general.For Magento out of the box frontend themes, the absolute path usually is one of the following:
 ```
  app/design/frontend/Magento/<theme>
  vendor/magento/theme-frontend-<theme>
 ```

 - <module_dir>
 
 Module directory. When talking about a particular Magento module, also notation similar to the following is used: <Magento_Checkout_module_dir>For Magento modules, usually one of the following:
 ```
  app/code/Magento/<Module>
  vendor/magento/module-<module>-<name> 
 ```
#### Cache

clean the cache:
type 的取值有：layout，block_html，full_page，translate

```magento cache:clean <type> ... <type>```

look up the cache status:

```magento cache:status```
 
 If caching is enabled in Magento Admin, ***you must clear the cache after you apply the theme***, add a design exception, add a logo, and perform other tasks.
   
   A system message notifies you that invalidated cache types must be refreshed.
   
   Click System > Cache Management.
   Clear the invalid cache types.

以上都是针对页面的清理缓存（xml），针对的是html，而对于页面的静态资源文件，css js，那么需要使用前段工具grunt进行清理  

``` grunt clean <theme> ```

#### install theme

```
   php bin/magento setup:upgrade
   php bin/magento setup:static-content:deploy //只有当是deploy mode 的时候，才需要执行这条命令
```

#### how to develop theme
 * ***During theme development, when you change any files stored here,*** you need to clear pub/static and var/view_preprocessed directories, and then reload the pages.
  Otherwise the old versions of files are displayed on the storefront.
  
```
 rm -rf pub/static
 rm -rf var/view_preprocessed
 这个命令是和  grunt clean:<theme_name>  等价的
 ```
 
 #### how to locate the layout 
 
 Admin set path: ***store->configuration->advance->developer*** set show template hints
 
```
After you have determined the module, you can search for the layout in the following locations:

<current_theme_dir>/<Namespace>_<Module>/layout/
<parent_theme(s)_dir>/<Namespace>_<Module>/layout/
<module_dir>/view/frontend/layout/
<module_dir>/view/base/layout/

```

#### Theme structure

[theme structure key reference(click me)](http://devdocs.magento.com/guides/v2.2/frontend-dev-guide/themes/theme-structure.html)

#### view.xml
resize 图片的大小命令：```magento catalog:images:resize```

需要在以下情况的时候执行这个命令：

* After you import products, which might have images of various sizes
* If images were resized or deleted manually from cache


### LESS

* The complete list of these variables and their default values are stored in ***lib/web/css/source/lib/variables***

To extend the parent theme’s styles in your theme:

In your theme directory, create a web/css/source sub-directory.
Create a _extend.less file there. The path to it looks like following:
```
<theme_dir>/
│  ├── web/
│  │   ├── css/
│  │   │   ├── source/
│  │   │      ├──_extend.less
...

```

Add your LESS code in this file.
Extending a theme using _extend.less is the simplest option when you are happy with everything the parent theme has, but want to add more styles.