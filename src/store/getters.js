import { countObjectsProperties } from '@/utils'

export default {
  authUser (state) {
    return state.authId ? state.users[state.authId] : null
  },

  userPosts: state => id => {
    const user = state.users[id]
    if (user.posts) {
      return Object.values(state.posts)
        .filter(post => post.userId === id)
    }
    return []
  },

  userPostsCount: state => id => countObjectsProperties(state.users[id].posts),
  userThreadsCount: state => id => countObjectsProperties(state.users[id].threads),
  threadRepliesCount: state => id => countObjectsProperties(state.threads[id].posts) - 1
}
