<template>
<router-link :to='{name: "products", query: query}'
             :class='{ active: isActive}'>
  {{ item }}
</router-link>
</template>

<script>
export default {
  props: ['resource', 'item'],
  computed: {
    isActive() {
      try {
        return (this.$route.query[this.resource]
                .indexOf(this.item) !== -1)
      } catch(e) {
        return false
      }
    },
    query() {
      // TODO: This is ugly, improve!
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

      let match = (item) => { return (item !== this.item)}
      let exclude = query[this.resource].filter(match)
      let include = query[this.resource].concat(this.item)
      query[this.resource] = this.isActive ? exclude : include

      return query
    }
  }
}
</script>
