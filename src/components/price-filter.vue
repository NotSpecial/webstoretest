<template>
<li>
  <h4>Preis</h4>
  <div ref='range'></div>
</li>
</template>

<script>
import noUiSlider from 'nouislider';
import { api } from '@/api';

export default {
  props: ['range'],
  // Initial values
  data() { return { min: 0, max: 1000 }; },
  methods: {
    processSlider(values) {
      const q = Object.assign({}, this.$route.query);  // copy current query

      if (values[0] > this.min) {
        q.price_min = values[0];
      } else {
        delete q.price_min;
      }
      if (values[1] < this.max) {
        q.price_max = values[1];
      } else {
        delete q.price_max;
      }

      this.$router.push({ name: 'products', query: q });
    },
  },
  mounted() {
    [this.min, this.max] = api.getPriceRange();

    // Create the price slider as soon as the element is created
    const initial = [
      this.range[0] || this.min,
      this.range[1] || this.max,
    ];

    // For nice slider, round range to 50
    const prettyRange = {
      min: Math.floor(this.min / 50) * 50,
      max: Math.ceil(this.max / 50) * 50,
    };

    // Manual margin so tooltips fit and format
    this.$refs.range.style.marginTop = '3em';
    const rangeFormat = {
      to(value) { return Math.round(value); },
      from(value) { return value; },
    };
    // Initializing the noUiSlider
    noUiSlider.create(this.$refs.range, {
      start: initial,
      range: prettyRange,
      connect: true,
      // Only interested in integers, set format
      format: rangeFormat,
      // Tooltips without decimals
      tooltips: true,
      // Show a scale
      pips: {
        mode: 'steps',
        density: 5,
      },
    });

    // Now connect 'end' event to update price range
    this.$refs.range.noUiSlider.on('end', this.processSlider);
  },
};
</script>
