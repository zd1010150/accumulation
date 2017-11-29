'use strict';

var NotFound = { template: '<p>Page not found</p>' };
var Home = { template: '<p>home page</p>' };
var About = { template: '<p>about page</p>' };
var routes = {
  '/': Home,
  '/about': About
};
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent: function ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    }
  },
  render: function render(h) {
    return h(this.ViewComponent);
  }
});
