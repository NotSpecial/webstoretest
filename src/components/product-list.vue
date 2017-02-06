<template>
<ul>
  <li v-for="product in products">
    <h3>
      <router-link :to="{name: 'product', params:{id: product._id}}">
        {{ product.title}}
      </router-link>
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
  </li>
</ul>
</template>

<script>
export default {
  computed: {
    products: function () {
      return this.$api.get('products', this.$route.query)
    }
  }
}
</script>
