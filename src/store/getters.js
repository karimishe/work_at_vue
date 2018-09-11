import { countObjectsProperties } from '@/utils'

export default {
  authUser (state) {
    // return state.users[state.authId]
    return {}
  },
  userPostsCount: state => id => countObjectsProperties(state.users[id].posts),
  userThreadsCount: state => id => countObjectsProperties(state.users[id].threads),
  threadRepliesCount: state => id => countObjectsProperties(state.threads[id].posts) - 1
}
