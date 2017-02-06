<template>
<div ref='range'></div>
</template>

<script>
import noUiSlider from 'nouislider'

export default {
  methods: {
    processSlider(values) {
      // Get current query and change if needed
      let query = Object.assign({}, this.$route.query)

      if (values[0] !== this.lastValues[0]) {
        this.lastValues[0] = values[0]
        query.price_min = values[0]
      }
      if (values[1] !== this.lastValues[1]) {
        this.lastValues[1] = values[1]
        query.price_max = values[1]
      }

      // If values is at the edge, remove key
      if (values[0] == this.range.min) {delete query.price_min}
      if (values[1] == this.range.max) {delete query.price_max}

      // Update route
      this.$router.push({name : 'products', query: query})
    }
  },
  mounted() {
    // Create the price slider as soon as the element is created

    // Get range from API
    this.lastValues = this.$api.getPriceRange()

    // For nice slider, round to 50 and rember this too
    this.range = {
      'min': Math.floor(this.lastValues[0] / 50) * 50,
      'max': Math.ceil(this.lastValues[1] / 50) * 50
    }

    // Manual margin so tooltips fit and format
    this.$refs.range.style.marginTop = '3em'
    let format = {
      to: (value) => {return Math.round(value)},
      from: (value) => {return value}
    }
    // Initializing the noUiSlider
    noUiSlider.create(this.$refs.range, {
      start: this.lastValues,
      range: this.range,
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

    console.log(this.$refs.range.noUiSlider)

    // Now connect 'end' event to update price range
    this.$refs.range.noUiSlider.on('end', this.processSlider)
  }
}
</script>
