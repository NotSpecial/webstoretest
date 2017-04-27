<template>
<div>
    <h4 v-on:click="jump">{{ title }}</h4>
    <input type="number" min="1"
           v-model.number="currentAmount"
           v-on:input="update"/>
    <button v-on:click="remove">&#10006</button>
</div>
</template>

<script>
import {cart} from '../api.js'

export default {
  props: ['id', 'title', 'amount'],
  data ()
    // Add the amount to data since we will modify it
    {return {currentAmount: this.amount}},
  watch: {
    // Watch for changes (new value sent from api)
    amount (value) {this.currentAmount = value}
  },
  methods: {
    jump () {
      // Go to the item page
      this.$router.push({name: 'product', params:{id: this.id}})
    },
    update () {cart.update(this.id, this.currentAmount)},
    remove () {cart.remove(this.id)}
  }
}
</script>
