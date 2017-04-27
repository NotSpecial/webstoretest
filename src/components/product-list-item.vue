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
  <button v-if="!cart.content[product._id]"
          v-on:click="cart.add(product._id)">
    In den Warenkorb
  </button>
  <button v-else disabled>
    Im Warenkorb
  </button>
</div>
</template>

<script>
import {cart} from '../api.js'

export default {
  data() {return {'cart': cart}},
  props: ['product']
}
</script>
