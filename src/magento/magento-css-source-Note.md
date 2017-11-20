### less variables naming rules
 A variable name should be formed according to the following rule:
 ```
 '@' + 'object' + '-' + 'property' + '-' + 'state' = @object-property-state
  ```
 If it is a private variable (is used only in a mixin), it must start with "_" character after "@":
 ```
 '@' + '_' + 'object' + '-' + 'property' + '-' + 'state' = @_object-property-state
```
 ### less mixins naming rules
 
 A less mixin name can contain lowercase letters, numbers, "-" and "_" characters. It should not contain capital letters.
 A mixin name can consist of one or several words, concatenated with one hyphen. If the mixin is private, its name must start with the "_" character. Mixin should be named after property or action it describes.
