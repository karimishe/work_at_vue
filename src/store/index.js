import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
import { countObjectsProperties } from '@/utils'

Vue.use(Vuex)

const makeAppendChildToParentMutatuion = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    },
    userPostsCount: state => id => countObjectsProperties(state.users[id].posts),
    userThreadsCount: state => id => countObjectsProperties(state.users[id].threads),
    threadRepliesCount: state => id => countObjectsProperties(state.threads[id].posts) - 1
  },
  actions: {

    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})
      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = {'.key': threadId, title, forumId, publishedAt, userId}

        commit('setThread', {threadId, thread})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })

        commit('appendThreadToForum', {parentId: forumId, childId: threadId})
        commit('appendThreadToUser', {parentId: userId, childId: threadId})
        resolve(state.threads[threadId])
      })
    },
    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }})
        resolve(post)
      })
    },
    updateThread ({state, commit, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]

        const newThread = {...thread, title}

        commit('setThread', {thread: newThread, threadId: id})

        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    },
    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    }
  },
  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },
    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },
    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },
    appendPostToThread: makeAppendChildToParentMutatuion({parent: 'threads', child: 'posts'}),

    appendPostToUser: makeAppendChildToParentMutatuion({parent: 'users', child: 'posts'}),

    appendThreadToForum: makeAppendChildToParentMutatuion({parent: 'forums', child: 'threads'}),

    appendThreadToUser: makeAppendChildToParentMutatuion({parent: 'users', child: 'threads'})
  }
})
