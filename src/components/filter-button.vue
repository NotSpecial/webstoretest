<template>
<router-link :to='{name: "products", query: query}'
             :class='{ active: isActive}'>
  {{ value }}
</router-link>
</template>

<script>
export default {
  props: ['resource', 'value'],
  computed: {
    isActive() {
      try {
        return (this.$route.query[this.resource]
                .indexOf(this.value) !== -1)
      } catch(e) {
        return false
      }
    },
    query() {
      // base query, make sure we have a array for resource
      // params and copy over current query
      var query = {}
      query[this.resource] = []
      Object.assign(query, this.$route.query)

      // Bugfix since sometimes its not an array
      // TODO find problem and eliminate
      if (!Array.isArray(query[this.resource])) {
        query[this.resource] = [query[this.resource]]
      }

      let match = (item) => { return (item !== this.value)}
      let exclude = query[this.resource].filter(match)
      let include = query[this.resource].concat(this.value)
      query[this.resource] = this.isActive ? exclude : include

      return query
    }
  }
}
</script>
