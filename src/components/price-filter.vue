<template>
<li>
  <h4>Preis</h4>
  <div ref='range'></div>
</li>
</template>

<script>
import noUiSlider from 'nouislider'

export default {
  props: ['value', 'range'],
  methods: {
    processSlider(values) {
      // If value is at outside the range, we set it to undefined
      let newValues = [
        (values[0] > this.range[0]) ? values[0] : undefined,
        (values[1] < this.range[1]) ? values[1] : undefined,
      ]
      // Notify parent
      this.$emit('input', newValues)
    }
  },
  mounted() {
    // Create the price slider as soon as the element is created
    let initial = [this.value[0] || this.range[0],
                   this.value[1] || this.range[1],]

    // For nice slider, round range to 50
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
      start: initial,
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
