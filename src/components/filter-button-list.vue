<template>
<ul>
  <li v-for='item in items'>
    <filter-button :resource='resource' :item='item'></filter-button>
  </li>
</ul>
</template>

<script>
import FilterButton from './filter-button.vue'

export default {
  components: { FilterButton },
  props: ['resource', 'items'],
}
</script>
