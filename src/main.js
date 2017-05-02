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

function filterProps(route) {
  function getStatus(key, items) {
    let status = {}
    items.forEach(item => {
      status[item] = ((route.query[key] || []).indexOf(item) !== -1)
    })
    return status
  }
  return {
    text : route.query.text,
    categories: getStatus('category', api.get('categories')),
    brands: getStatus('brand', api.get('brands')),
    priceRange: [route.query.price_min, route.query.price_max],
  }
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
      sidebar: filterProps
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
      sidebar: filterProps
    }
  }]
})

var app = new Vue({
  router: router,
  components: { 'cart': Cart }
})

app.$mount('#app')
