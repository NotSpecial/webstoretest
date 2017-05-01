
<template>
<ul>
  <text-filter v-model="values.text" @input='push'></text-filter>
  
  <choice-filter v-model='values.categories'
                 title='Kategorien'
                 @input='push'>
  </choice-filter>
  <choice-filter v-model='values.brands'
                 title='Marken'
                 @input='push'>
  </choice-filter>

  <price-filter v-model='values.range' :range='priceRange' @input='push'>
  </price-filter>
</ul>
</template>

<script>
import ChoiceFilter from './choice-filter.vue'
import TextFilter from './text-filter.vue'
import PriceFilter from './price-filter.vue'

export default {
  components: {ChoiceFilter, TextFilter, PriceFilter},
  props: ['categories', 'brands', 'priceRange', 'query'],
  data() {
    let defaults = {
      text: '',
      range: [],
      categories: {},
      brands: {}
    }
    this.categories.forEach(cat => defaults.categories[cat] = false)
    this.brands.forEach(brand => defaults.brands[brand] = false)
    return {values: defaults}
  },
  created() {this.readQuery(this.$route.query)},
  watch: {'$route.query'(q) {this.readQuery(q)}},

  methods: {
    readQuery(q) {
      let v = this.values
      if (q.text) v.text = q.text
      if (q.price_min) v.range[0] = q.price_min
      if (q.price_max) v.range[1] = q.price_max

      // For Categories and Brands, check if they are in the query arrays
      function isActive(key, item) {return (q[key] || []).indexOf(item) !== -1}
      this.categories.forEach(cat => 
        v.categories[cat] = isActive('category', cat))
      this.brands.forEach(brand => v.brands[brand] = isActive('brand', brand))
    },
    push() {
      let q = {}
      let v = this.values
      // Only add defined values to query to keep it short
      if (v.text) {q.text = v.text}
      if (v.range[0]) {q.price_min = v.range[0]}
      if (v.range[1]) {q.price_min = v.range[1]}
      
      // Categories and brands
      function getActive(obj) {return Object.entries(obj).map(
        ([item, active]) => {return active ? item : false}).filter(Boolean)}

      let cats = getActive(v.categories)
      if (cats) {q['category'] = cats}

      let brands = getActive(v.brands)
      if (brands) {q['brand'] = brands}

      this.$router.push({name : 'products', query: q})
    }
  }
}
</script>
