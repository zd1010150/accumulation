/**
 * dropdown select widget, the difference between it and select that is ,it does dropdown a menu ,and you can config if display the selected value on the label
 */


var toggle = "[data-toggle=dropdown-select]";


var DropDownSelect = function ($el, config) {

    var defaultConfig = {
        displayChangedValud: true, //是否需要在
        container: "self",
        offsetX: 0,// the relative offset between the left-top corner of list the left-top corner of label
        offsetY: 0,
        selected: function (val, DropDownSelect) {
        },
        open: function () {

        },
        close: function () {

        },
        selectedClass: "selected"

    }
    this.config = $.extend(defaultConfig, config);
    this.$el = $el;
    this.$label = $el.find(".dropdown-select-label");
    this.$list = $el.find(".dropdown-select-list");
    this.$items = $el.find(".dropdown-select-list > li");
    this.attachEvent();
}
DropDownSelect.prototype.getValue = function () {
    return this.value;
}
DropDownSelect.prototype.setValue = function (val) {
    this.value = val;
}


DropDownSelect.prototype.layoutList = function () {
    if (this.config.container !== "self") {
        this.$list.appendTo(this.config.container);
    }
    var screenCordination = this.$label.get(0).getBoundingClientRect(),
        _left = screenCordination.left,
        _top = screenCordination.top,
        lab_height = screenCordination.height,
        lab_width = screenCordination.width,
        _bottom = window.innerHeight - lab_height-_top,
        list_height = this.$list.height(),
        list_width = this.$list.width(),
        position = "bottom",
        left, top, width;

    if (_bottom < list_height) {//如果剩余，那么就布局向上
        top = _top - list_height - this.config.offsetY;
        position = "top";

    } else {
        top = _top + lab_height + this.config.offsetY;
    }
    left = _left + this.config.offsetX;
    width = lab_width > list_width ? lab_width : list_width;

    this.$list.css({
        position: "fixed",
        top: top + "px",
        left: left + "px",
        width: width +"px"
    });
    if (position == "top") {
        this.$list.addClass("slideDownIn").removeClass("slideDownOut");
    } else {
        this.$list.addClass("slideUpIn").removeClass("slideUpOut");
    }
    this.$list.removeClass("dropdown-select-list-hide");
    this.$el.removeClass("dropdown-select-close").addClass("dropdown-select-open");
    this.position = position;
}
DropDownSelect.prototype.close = function(){
    var self = this;
    if (this.position == "top") {
        this.$list.removeClass("slideDownIn").addClass("slideDownOut")
    } else {
        this.$list.removeClass("slideUpIn").addClass("slideUpOut")
    }
    setTimeout(function(){
        self.$list.addClass("dropdown-select-list-hide");
            self.$el.addClass("dropdown-select-close").removeClass("dropdown-select-open");
    },200);
    this.config.close.call();

};
DropDownSelect.prototype.attachEvent = function () {
    var self = this;
    self.$items.on('click', function (event) {
        self.setValue($(this).data("value"));
        self.$items.removeClass("selected");
        $(this).addClass(self.config.selectedClass);
        if (self.config.displayChangedValud) {
            self.$label.find(".dropdown-select-trigger").text($(this).text());
        }
        self.config.selected.call(self,self.getValue());
        self.close.call(self);
        event.stopPropagation();


    });
    self.$label.on("click",function(event){
        if(self.$el.hasClass("dropdown-select-open")){
            self.close.call(self);
            event.stopPropagation();
        }else{
            self.layoutList.call(self);
            self.config.open.call();
            event.stopPropagation();
        }

    });
    $(document).on("click",function(){
        self.close.call(self);

    });
}


function Plugin(config) {
    return this.each(function () {
        var $this = $(this)
        var data = $this.data('bs.dropdownselect')

        if (!data) $this.data('bs.dropdownselect', (data = new DropDownSelect($this, config)))
        return data;
    })
}

var old = $.fn.dropdownselect;

$.fn.dropdownselect = Plugin;
$.fn.dropdownselect.Constructor = DropDownSelect;


$.fn.dropdownselect.noConflict = function () {
    $.fn.dropdownselect = old;
    return this;
}
$(document).on('click.bs.dropdownselect.data-api', toggle, function () {
    Plugin.call($(this));
});





