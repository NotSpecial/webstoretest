<template>
<input v-model=message v-on:input=updateQuery placeholder="Was suchen Sie?"/>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {message: ""}
  },
  methods: {
    // TODO: Not used atm, remove or integrate
    readQuery() {
      this.message = this.$route.query.text
    },
    // Use lodash.debounce to wait to finish typing
    updateQuery: debounce(function() {
      this.$router.push({
        name : 'products',
        query: Object.assign({},  // copy into new obj
          this.$route.query, {text: this.message})
        })
    }, 250)
  }
}
</script>
