<template>
<div>
  <h3>{{ product.title }}</h3>
  <small>
    Von
    <router-link
      :to="{name: 'products',
            query: {brand: product.brand}}">
      {{ product.brand }}
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
  <cart-button :id="product._id"></cart-button>
</div>
</template>

<script>
import CartButton from './cart-button.vue'

export default {
  components: { CartButton },
  props: ['product']
}
</script>
