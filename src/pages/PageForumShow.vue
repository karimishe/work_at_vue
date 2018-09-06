<template>
  <div class="forum-wrapper">
    <div class="col-full push-top">

      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
      </div>
    </div>


    <div class="col-full push-top">
      <ThreadList :threads="threads"/>
    </div>

  </div>
</template>

<script>
  import ThreadList from '@/components/ThreadList'
  import sourseData from '@/data'
  export default {
    name: 'PageForumShow',
    components: {
      ThreadList
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return sourseData.forums[this.id]
      },
      threads () {
        return Object.values(sourseData.threads).filter(thread => thread.forumId === this.id)
      }
    }
  }
</script>

<style scoped>
  .forum-wrapper {
    width: 100%;
  }
</style>
