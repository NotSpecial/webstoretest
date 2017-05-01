<template>
<li>
<h4>{{ title }}</h4>
<ul>
  <li v-for='(active, item) in value'
      :class='{active: active}'
      @click='emit(item, !active)'>
    {{item}}
  </li>
</ul>
</li>
</template>

<script>
import FilterButton from './filter-button.vue'

export default {
  components: { FilterButton },
  props: ['value', 'title'],
  methods: {
    emit(item, newStatus) {
      let status = this.value
      status[item] = newStatus
      this.$emit('input', status)
    }
  }
}
</script>
