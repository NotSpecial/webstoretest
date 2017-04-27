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
import {cart} from '../api.js'
import CartItem from './cart-item.vue'

export default {
  components: { CartItem },
  data() {return {cart: cart}},
  computed: {
    items() {
      let items = []
      Object.entries(this.cart.content).forEach(
        ([key, value]) => items.push(value)
      )
      return items
    }
  }
}
</script>
