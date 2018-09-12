import Vue from 'vue'

const makeAppendChildToParentMutatuion = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default {
  setPost (state, {post, postId}) {
    Vue.set(state.posts, postId, post)
  },
  setUser (state, {user, userId}) {
    Vue.set(state.users, userId, user)
  },
  setThread (state, {thread, threadId}) {
    Vue.set(state.threads, threadId, thread)
  },
  setItem (state, {item, id, resource}) {
    item['.key'] = id
    Vue.set(state[resource], id, item)
  },

  setAuthId (state, id) {
    state.authId = id
  },

  setUnsubscribeAuthObserver (state, unsubscribe) {
    state.unsubscribeAuthObserver = unsubscribe
  },

  appendPostToThread: makeAppendChildToParentMutatuion({parent: 'threads', child: 'posts'}),

  appendContributorToThread: makeAppendChildToParentMutatuion({parent: 'threads', child: 'contributors'}),

  appendPostToUser: makeAppendChildToParentMutatuion({parent: 'users', child: 'posts'}),

  appendThreadToForum: makeAppendChildToParentMutatuion({parent: 'forums', child: 'threads'}),

  appendThreadToUser: makeAppendChildToParentMutatuion({parent: 'users', child: 'threads'})

}
