
<template>
<ul>
  <text-filter :text="text"></text-filter>
  
  <choice-filter title='Kategorien' queryKey='category' :choices='categories'>
  </choice-filter>
  <choice-filter title='Marken' queryKey='brand' :choices='brands'>
  </choice-filter>

  <price-filter :range='priceRange'>
  </price-filter>
</ul>
</template>

<script>
import ChoiceFilter from './choice-filter.vue'
import TextFilter from './text-filter.vue'
import PriceFilter from './price-filter.vue'

export default {
  components: {ChoiceFilter, TextFilter, PriceFilter},
  props: ['text', 'categories', 'brands', 'priceRange'],
}
</script>
