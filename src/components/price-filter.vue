<template>
<div ref='range'></div>
</template>

<script>
import {api} from '../api.js'
import noUiSlider from 'nouislider'

export default {
  methods: {
    processSlider(values) {
      // Get current query and change if needed
      let query = Object.assign({}, this.$route.query)
      query.price_min = values[0]
      query.price_max = values[1]

      // If values is at outside the range, we can remove the key
      if (values[0] <= this.range[0]) {delete query.price_min}
      if (values[1] >= this.range[1]) {delete query.price_max}

      // Update route
      this.$router.push({name : 'products', query: query})
    }
  },
  mounted() {
    // Create the price slider as soon as the element is created

    // Get range from API
    this.range = api.getPriceRange()

    // For nice slider, round to 50 and rember this too
    let prettyRange = {
      'min': Math.floor(this.range[0] / 50) * 50,
      'max': Math.ceil(this.range[1] / 50) * 50
    }

    // Manual margin so tooltips fit and format
    this.$refs.range.style.marginTop = '3em'
    let format = {
      to: (value) => {return Math.round(value)},
      from: (value) => {return value}
    }
    // Initializing the noUiSlider
    noUiSlider.create(this.$refs.range, {
      start: this.range,
      range: prettyRange,
      connect: true,
      // Only interested in integers, set format
      format: format,
      // Tooltips without decimals
      tooltips: true,
      // Show a scale
      pips: {
        mode: 'steps',
        density: 5
      }
    })

    // Now connect 'end' event to update price range
    this.$refs.range.noUiSlider.on('end', this.processSlider)
  }
}
</script>
