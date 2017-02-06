import Vue from 'vue'
import VueRouter from 'vue-router'
import api from './api.js'
import Filters from './components/filters.vue'
import ProductList from './components/product-list.vue'
import Product from './components/product.vue'
import Cart from './components/cart.vue'

Vue.use(VueRouter)

// Replace this with a Vue.use etc
Vue.mixin({created() {this.$api=api}})


var router = new VueRouter({
  routes: [
    {name: 'products',
     path: '/',
     components: {
       main: ProductList,
       sidebar: Filters
     }},
    {name: 'product',
     path: '/product/:id',
     components: {
       main: Product,
       sidebar: Filters,
    }},
  ]
})

var app = new Vue({
  router: router,
  components: { 'cart': Cart }
})

app.$mount('#app')
