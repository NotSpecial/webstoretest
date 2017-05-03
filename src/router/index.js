import Vue from 'vue';
import Router from 'vue-router';

import { api } from '@/api';

import Filters from '@/components/filters';
import ProductList from '@/components/product-list';
import Product from '@/components/product';

Vue.use(Router);

// Send query to API to pass results as props
function getItems(route) {
  return { products: api.get('products', route.query) };
}

function getItem(route) {
  const id = route.params.id;
  return { product: api.getitem('products', id, {}) };
}

function filterProps(route) {
  function getStatus(key, items) {
    const status = {};
    items.forEach((item) => {
      status[item] = ((route.query[key] || []).indexOf(item) !== -1);
    });
    return status;
  }
  return {
    text: route.query.text,
    categories: getStatus('category', api.get('categories')),
    brands: getStatus('brand', api.get('brands')),
    priceRange: [route.query.price_min, route.query.price_max],
  };
}

export default new Router({
  routes: [{
    name: 'products',
    path: '/',
    components: {
      main: ProductList,
      sidebar: Filters,
    },
    props: {
      main: getItems,
      sidebar: filterProps,
    },
  }, {
    name: 'product',
    path: '/product/:id',
    components: {
      main: Product,
      sidebar: Filters,
    },
    props: {
      main: getItem,
      sidebar: filterProps,
    },
  }],
});
