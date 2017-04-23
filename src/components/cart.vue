<template>
<ul>
  <li v-for='item in items'>
    <cart-item :id="item.item._id"
               :title="item.item.title" 
               :amount="item.amount">
    </cart-item>
  </li>
</ul>
</template>

<script>
import CartItem from './cart-item.vue'

export default {
  components: { CartItem },
  data() {
    return {
      'items': []
    }
  },
  mounted() {
    // Add hook
    this.$api.onCartUpdate(() => {
      let cart = this.$api.getCart()
      
      // Turn cart into a array for easier display
      let items = []
      Object.entries(cart).forEach(
        ([key, value]) => items.push(value)
      )

      this.items = items
    })
  }
}
</script>
