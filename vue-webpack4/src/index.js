import Vue from 'vue'
import App from './App.vue'
import Contact from './Contact.vue'
import Home from './Home.vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import $ from 'jquery'
import '#/common.css'
import 'iview/dist/styles/iview.css'
import '@babel/polyfill'

// import {Button} from 'iview'
// Vue.component('Button', Button)

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path:'/Contact', component: Contact}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

let a = 21;
((a) => {
  console.log(a)
})(a)

new Vue({
  router,
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

console.log('8888888888')