<template>
<ul>
  <li v-for="product in products">
    <product-list-item :product='product'></product-list-item>
  </li>
</ul>
</template>

<script>
import ProductListItem from './product-list-item';

export default {
  components: { ProductListItem },
  props: ['products'],
};
</script>
