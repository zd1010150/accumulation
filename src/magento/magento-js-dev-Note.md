### Terms
* Ui component	

    * JS component located in the Magento_Ui module, in the app/code/Magento/Ui/view directory.
* jQuery UI widget	

    * A JS component/widget provided by jQuery UI library used in Magento.
* jQuery widget	

    * Custom widget created using jQuery UI Widget Factory and decorated as AMD module. Many Magento JS components are jQuery widget.

### how to locate the js

In Magento, you can find the JS components on the following levels:

* Library level (lib/web). Resources located here are available in any place in Magento.
* Module level (<module_dir>/view/<areaname>/web). If the module is enabled, resources added here are available in other modules and themes.
* Theme level, for a particular module (<theme_dir>/<VendorName>_<ModuleName>/web). Resources added here are available for inheriting themes.
* Theme level (<theme_dir>/web). Resources added here are available for inheriting themes.

### require js baseurl config 
The baseUrl parameter for RequireJS is specified in the following files:

* for the frontend area: ***app/code/Magento/Theme/view/frontend/templates/page/js/require_js.phtml***
* for the adminhtml area: ***app/code/Magento/Backend/view/adminhtml/templates/page/js/require_js.phtml***