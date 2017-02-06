<template>
<ul>
  <!-- Text filter -->
  <li>
    <h4>Suche</h4>
    <text-search></text-search>
  </li>

  <!-- Filters for specified resources -->
  <li v-for='res in Object.keys(resources)'>
    <h4>{{ resources[res] }}</h4>
    <filter-button-list :resource='res'></filter-button-list>
  </li>

  <!-- Price filter -->
  <li>
    <h4>Preis</h4>
    <price-filter></price-filter>
  </li>
</ul>
</template>

<script>
import FilterButtonList from './filter-button-list.vue'
import TextSearch from './text-search.vue'
import PriceFilter from './price-filter.vue'

export default {
  components: {FilterButtonList, TextSearch, PriceFilter},
  data() {
    return {resources: {category: 'Kategorien', vendor: 'Händler'}}
  },
}
</script>
