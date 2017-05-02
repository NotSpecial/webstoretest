<template>
<li>
<h4>{{ title }}</h4>
<ul>
  <li v-for='(active, item) in choices'
      :class='{active: active}'
      @click='push(item, !active)'>
    {{item}}
  </li>
</ul>
</li>
</template>

<script>
import FilterButton from './filter-button.vue'

export default {
  components: { FilterButton },
  props: ['title', 'queryKey', 'choices'],
  methods: {
    push(item, newChoice) {
      // Modify choices and turn them into a list
      let newChoices = Object.assign({}, this.choices)
      newChoices[item] = newChoice
      let choiceArray = Object.entries(newChoices)
                           // Turn object entries into item or 'false'
                           .map(([item, active]) => {return active && item})
                           // Remove all 'false' entries
                           .filter(Boolean)

      // Copy and modify query
      let q = Object.assign({}, this.$route.query)
      if (choiceArray.length) {q[this.queryKey] = choiceArray}
      else {delete q[this.queryKey]}

      this.$router.push({name : 'products', query: q})
    }
  }
}
</script>
