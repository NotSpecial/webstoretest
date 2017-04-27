<template>
<div>
  <h3>{{ product.title }}</h3>
  <small>
    Von
    <router-link
      :to="{name: 'products',
            query: {vendor: product.vendor}}">
      {{ product.vendor }}
    </router-link>
    in der Kategorie
    <router-link
      :to="{name: 'products',
            query: {category: product.category}}">
      {{ product.category }}
    </router-link>
  </small>
  <p>{{ product.description }}</p>
  <p>{{ product.price }} €</p>
  <button v-on:click="$api.addToCart(product._id)">
    In den Warenkorb
  </button>
</div>
</template>

<script>
import {api} from '../api.js'

export default {
  computed: {
    product() {
      // Get the product
      let id = this.$route.params.id
      return api.getitem('products', id, {})
    }
  }
}
</script>
