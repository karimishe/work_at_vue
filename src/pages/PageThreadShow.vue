<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <h1>{{thread.title}}
      <router-link
        :to="{name: 'ThreadEdit', id: this.id}"
        class="btn-green btn-small"
        tag="button"
      >
        Edit thread
      </router-link>
    </h1>
    <p>
      By <a href="#" class="link-unstyled">{{user.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributorsCount}} contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
      v-if="authUser"
      :threadId="id"
    />
    <div v-else class="text-center" style="margin-bottom: 50px">
      <router-link :to="{name: 'SignIn', query: {redirectTo: $route.path}}">Sign in</router-link> or
      <router-link :to="{name: 'Register', query: {redirectTo: $route.path}}">Register</router-link> to post a reply
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'
  import { countObjectsProperties } from '@/utils'
  import asyncDataStatus from '@/mixins/asyncDataStatus'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ThreadShow',
    components: {
      PostList,
      PostEditor
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    mixins: [asyncDataStatus],
    computed: {
      ...mapGetters({
        authUser: 'authUser'
      }),
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts).filter(post => postIds.includes(post['.key']))
      },
      repliesCount () {
        return this.$store.getters.threadRepliesCount(this.thread['.key'])
      },
      contributorsCount () {
        return countObjectsProperties(this.thread.contributors)
      },
      user () {
        return this.$store.state.users[this.thread.userId]
      },
      thread () {
        return this.$store.state.threads[this.id]
      }
    },
    created () {
        // fetch thread
      this.$store.dispatch('fetchThread', {id: this.id})
        .then(thread => {
          // fetch user
          this.$store.dispatch('fetchUser', {id: thread.userId})
          return this.$store.dispatch('fetchPosts', {ids: Object.keys(thread.posts)})
        })
        .then(posts => {
          return Promise.all(posts.map(post => {
            this.$store.dispatch('fetchUser', {id: post.userId})
          }))
        })
        .then(() => this.asyncDataStatus_fetched())
    }
  }
</script>

<style scoped>

</style>
