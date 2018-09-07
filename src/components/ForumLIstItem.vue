<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: {id: forum['.key']}}"
      >
        {{forum.name}}
      </router-link>
      <p>{{forum.description}}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{threadsCount}}</p>
      {{threadsCount === 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread">
      <!--TODO later-->
<!--      <img class="avatar" src="https://www.sideshowtoy.com/photo_9030371_thumb.jpg" alt="">
      <div class="last-thread-details">
        <a href="thread.html">Where is the sign in button?</a>
        <p class="text-xsmall">By <a href="profile.html">Joseph Kerr</a>, three hours ago</p>
      </div>-->
    </div>
  </div>
</template>

<script>
  import {countObjectsProperties} from '@/utils'

  export default {
    name: 'ForumLIstItem',
    props: {
      forum: {
        required: true,
        type: Object
      }
    },
    computed: {
      threadsCount () {
        return countObjectsProperties(this.forum.threads)
      }
    }
  }
</script>

<style scoped>

</style>
