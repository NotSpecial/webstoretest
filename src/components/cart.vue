<template>
<ul>
  <li v-for='item in cart'>
    {{ item.title }}
  </li>
</ul>
</template>

<script>
export default {
  data() {
    return {
      'cart': []
    }
  },
  mounted() {
    // Add hook
    this.$api.onCartUpdate(() => {
      this.cart = this.$api.getCart()
    })
  }
}
</script>
