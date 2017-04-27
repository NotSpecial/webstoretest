<template>
<div>
  <button v-if="!cart.content[id]"
          v-on:click="cart.add(id)">
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
  props: ['id']
}
</script>
