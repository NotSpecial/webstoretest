import Vue from 'vue'
import VueRouter from 'vue-router'

import {api} from './api.js'

import Filters from './components/filters.vue'
import ProductList from './components/product-list.vue'
import Product from './components/product.vue'
import Cart from './components/cart.vue'

Vue.use(VueRouter)

// Send query to API to pass results as props
function getItems(route) {
  return {products: api.get('products', route.query)}
}

function getItem(route) {
  let id = route.params.id
  return {product: api.getitem('products', id, {})}
}

function getResources(route) {
  return {resources: {
    category: {
      title: 'Kategorien',
      items: api.get('category')
    }, 
    vendor: {
      title: 'Händler',
      items: api.get('vendor')
    }}}
}

var router = new VueRouter({
  routes: [{
    name: 'products',
    path: '/',
    components: {
      main: ProductList,
      sidebar: Filters
    },
    props : {
      main: getItems,
      sidebar: getResources
    }
  }, {
    name: 'product',
    path: '/product/:id',
    components: {
      main: Product,
      sidebar: Filters,
    },
    props: {
      main: getItem,
      sidebar: getResources
    }
  }]
})

var app = new Vue({
  router: router,
  components: { 'cart': Cart }
})

app.$mount('#app')
