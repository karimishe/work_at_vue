<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <CategoryList
      :categories="categories"
    />
<!--    <ForumList :forums="forums"/>-->
  </div>

</template>

<script>
import sourceData from '@/data'
import ForumList from '@/components/ForumList'
import CategoryList from '@/components/CategoryList'

export default {
  name: 'PageHome',
  components: {
    ForumList,
    CategoryList
  },
  data () {
    return {
      forums: Object.values(sourceData.forums),
      categories: Object.values(sourceData.categories),
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>
