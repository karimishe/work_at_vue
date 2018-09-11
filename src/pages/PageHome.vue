<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the forum</h1>
    <CategoryList
      :categories="categories"
    />
<!--    <ForumList :forums="forums"/>-->
  </div>

</template>

<script>
import CategoryList from '@/components/CategoryList'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'PageHome',
  components: {
    CategoryList
  },

  mixins: [asyncDataStatus],

  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  created () {
    this.$store.dispatch('fetchAllCategories')
      .then(categories => Promise.all(categories.map(category => this.$store.dispatch('fetchForums', {ids: Object.keys(category.forums)}))))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
  }
}
</script>
