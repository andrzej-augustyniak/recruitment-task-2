import lodash from 'lodash';
window._ = lodash;

import pluralize from 'pluralize';
window.pluralize = pluralize;

import Vue from 'vue';
window.Vue = Vue;

// Event bus
window.Event = new Vue();

// import user profile component
import CarConfig from './components/CarConfig.vue';
Vue.component('car-config', CarConfig);

// init vue app
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});