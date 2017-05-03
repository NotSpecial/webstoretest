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
import { cart } from '@/api';
import CartItem from './cart-item';

export default {
  components: { CartItem },
  data() { return { cart }; },
  computed: {
    items() {
      return Object.values(this.cart.content);
    },
  },
};
</script>
