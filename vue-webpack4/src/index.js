import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'
import $ from 'jquery'
import '#/common.css'
import 'iview/dist/styles/iview.css'
import '@babel/polyfill'

// import {Button} from 'iview'
// Vue.component('Button', Button)


 let a = 2;
((a) => {
   console.log(a)
 })(a)

new Vue({
  render: h => h(App)
}).$mount('#app')

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0

console.log(_.findIndex(users, { 'user': 'fred', 'active': false }));
alert('——————')
  
    