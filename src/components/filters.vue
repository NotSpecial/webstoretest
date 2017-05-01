
<template>
<ul>
  <text-filter v-model="values.text"></text-filter>
  
  <choice-filter v-model='values.categories'
                 title='Kategorien'>
  </choice-filter>
  <choice-filter v-model='values.brands'
                 title='Marken'>
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
  props: ['categories', 'brands', 'priceRange', 'query'],
  data() {
    let q = this.query
    let values = {
      text: q.text || '',
      range: [q.price_min, q.price_max],
      categories: {},
      brands: {}
    }
    // Dynamically add brand and category
    function isActive(key, item) {
      return ( (q[key] || []).indexOf(item) !== -1 )
    }
    this.categories.forEach((cat) => {
      values.categories[cat] = isActive('category', cat)
    })
    this.brands.forEach((brand) => {
      values.brands[brand] = isActive('brand', brand)
    })

    return {values: values}
  },

  methods: {
    push(values) {
      let q = {}
      
      // Only add defined values to query to keep it short
      if (values.text) {q.text = values.text}
      if (values.range[0]) {q.price_min = values.range[0]}
      if (values.range[1]) {q.price_min = values.range[1]}
      
      // Categories and brands
      // .filter(Boolean) removes the 'undefined'
      function getActive(obj) {return Object.entries(obj).map(
        ([item, active]) => {if (active) {return item}}).filter(Boolean)}

      let cats = getActive(values.categories)
      if (cats) {q['category'] = cats}

      let brands = getActive(values.brands)
      if (brands) {q['brand'] = brands}

      this.$router.push({name : 'products', query: q})
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
