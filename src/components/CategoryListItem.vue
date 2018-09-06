<template>
  <div class="forum-list">

    <h2 class="list-title">
      <router-link :to="{name: 'Category', params: {id: category['.key']}}">
        {{category.name}}
      </router-link>
    </h2>

    <ForumList :forums="forums"/>


  </div>

</template>

<script>
  import ForumList from './ForumList'
  import sourceData from '@/data'

  export default {
    name: 'CategoryListItem',
    props: {
      category: {
        required: true,
        type: Object
      }
    },
    components: {
      ForumList
    },
    computed: {
      forums () {
        return Object.values(sourceData.forums)
          .filter(forum => forum.categoryId === this.category['.key'])
      }
    }
  }
</script>

<style scoped>

</style>
