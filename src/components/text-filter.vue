<template>
<li>
    <h4>Suche</h4>
    <input :value='text' 
           @input='debouncedPush($event.target.value)' 
           placeholder="Was suchen Sie?">
    </input>
</li>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  props: ['text'],
  methods: {
    // Use lodash debounce to emit only if input has stopped
    // eslint-disable-next-line func-names
    debouncedPush: debounce(function (text) {
      const q = Object.assign({}, this.$route.query); // Copy current query
      if (text) { q.text = text; } else { delete q.text; }
      this.$router.push({ name: 'products', query: q });
    }, 250),
  },
};
</script>
