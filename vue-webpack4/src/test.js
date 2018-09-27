import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'
import $ from 'jquery'
import * as Promise from 'bluebird'

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
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');

new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('done')
  }, 6000);
}).then(res => {
  alert(res)
}).catch(err => {
  alert(JSON.stringify(err))
})