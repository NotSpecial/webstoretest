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
  data() {return {content: cart.content}},
  computed: {
    items() {
      let items = []
      Object.entries(this.content).forEach(
        ([key, value]) => items.push(value)
      )
      return items
    }
  }
}
</script>
