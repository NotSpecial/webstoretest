<template>
<div>
  <h3 v-on:click="$router.push({name: 'product', params:{id: product._id}})">
    {{ product.title}}
  </h3>
  <small>
    Von
    <router-link :to="{name: 'products', query: {vendor: product.vendor}}">
      {{ product.vendor }}
    </router-link>
    in der Kategorie
    <router-link
        :to="{name: 'products', query: {category: product.category}}">
      {{ product.category }}
    </router-link>
  </small>
  <p>{{ product.price }} €</p>
  <cart-button :id="product._id"></cart-button>
</div>
</template>

<script>
import {cart} from '../api.js'
import CartButton from './cart-button.vue'

export default {
  components: { CartButton },
  data() {return {'cart': cart}},
  props: ['product']
}
</script>
