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
  <button v-on:click="$api.addToCart(product._id)">
    In den Warenkorb
  </button>
</div>
</template>

<script>
export default {
  props: ['product']
}
</script>
