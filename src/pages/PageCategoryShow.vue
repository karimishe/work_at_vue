<template>
  <div v-if="asyncDataStatus_ready" class="category-wrapper">
    <div class="col-full push-top">
      <h1>{{category.name}}</h1>
    </div>
    <div class="col-full push-top">
      <CategoryListItem :category="category"/>
    </div>
  </div>
</template>

<script>
  import CategoryListItem from '@/components/CategoryListItem'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    name: 'PageCategoryShow',
    components: {
      CategoryListItem
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    mixins: [asyncDataStatus],
    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    },
    created () {
      this.$store.dispatch('fetchCategory', {id: this.id})
        .then(category => this.$store.dispatch('fetchForums', {ids: category.forums})
          .then(() => { this.asyncDataStatus_fetched() })
        )
    }
  }
</script>

<style scoped>
.category-wrapper {
  width: 100%;
}
</style>
