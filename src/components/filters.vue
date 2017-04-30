
<template>
<ul>
  <text-filter v-model="values.text"></text-filter>
  
  <choice-filter v-for='(title, res) in titles'
                 v-model='values.resources[res]'
                 :title='title'>
  </choice-filter>

  <price-filter v-model='values.range' :range='priceRange'></price-filter>
</ul>
</template>

<script>
import ChoiceFilter from './choice-filter.vue'
import TextFilter from './text-filter.vue'
import PriceFilter from './price-filter.vue'

export default {
  components: {ChoiceFilter, TextFilter, PriceFilter},
  props: ['resources', 'priceRange', 'query'],
  data() {
    let q = this.query
    let values = {
      text: q.text || '',
      range: [q.price_min, q.price_max],
      resources: {}
    }
    // Dynamically add resource choices
    function isActive(res, item) {
      return ( (q[res] || []).indexOf(item) !== -1 )
    }
    let titles = {}
    Object.entries(this.resources).forEach(([res, data]) => {
      titles[res] = data.title
      values.resources[res] = {}
      data.items.forEach((item) => {
        values.resources[res][item] = isActive(res, item)
      })
    })

    return {values: values,
            titles: titles}
  },

  methods: {
    push(values) {
      let query = {}
      
      // Only add defined values to query to keep it short
      if (values.text) {query.text = values.text}
      if (values.range[0]) {query.price_min = values.range[0]}
      if (values.range[1]) {query.price_min = values.range[1]}
      
      Object.entries(values.resources).forEach(([res, items]) => {
        let selected = Object.entries(items).map(
          ([item, isActive]) => {if (isActive) {return item}}
        ).filter(Boolean)  // Removed the 'undefined'
        if (selected.length) {query[res] = selected}
      })

      this.$router.push({name : 'products', query: query})
    }
  },

  watch: {
    values: {
      handler: function (values) {this.push(values)}, 
      deep: true  // watch nested properties
    }
  }
}
</script>
