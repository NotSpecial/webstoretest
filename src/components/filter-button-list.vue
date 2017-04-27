<template>
<ul>
  <li v-for='item in items'>
    <filter-button :resource='resource' :value='item'></filter-button>
  </li>
</ul>
</template>

<script>
import {api} from '../api.js'
import FilterButton from './filter-button.vue'

export default {
  components: { FilterButton },
  props: ['resource'],
  computed: {
    items: function() {
      return api.get(this.resource)
    }
  }
}
</script>
