<template>
<ul>
  <li v-for="product in products">
    <product-list-item :product='product'></product-list-item>
  </li>
</ul>
</template>

<script>
import {api} from '../api.js'
import ProductListItem from './product-list-item.vue'

export default {
  components: { ProductListItem },
  computed: {
    products: function () {
      return api.get('products', this.$route.query)
    }
  }
}
</script>
