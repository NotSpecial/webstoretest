<template>
<li>
    <h4>Suche</h4>
    <input :value='value' 
           v-on:input='debouncedEmit($event)' 
           placeholder="Was suchen Sie?">
    </input>
</li>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: ['value'],
  methods: {
    // Use lodash debounce to emit only if input has stopped
    debouncedEmit: debounce(function(event) {
      this.$emit('input', event.target.value)
    }, 250)
  }
}
</script>
