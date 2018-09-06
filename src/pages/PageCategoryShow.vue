<template>
  <div class="category-wrapper">
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
    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    }
  }
</script>

<style scoped>
.category-wrapper {
  width: 100%;
}
</style>
