// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import firebase from 'firebase'

import AppDate from './components/AppDate'

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC7qKdkeODtFqI9Zp_rqQ6aR5wPpx3K5go',
  authDomain: 'vue-forum-test-work.firebaseapp.com',
  databaseURL: 'https://vue-forum-test-work.firebaseio.com',
  projectId: 'vue-forum-test-work',
  storageBucket: 'vue-forum-test-work.appspot.com',
  messagingSenderId: '461782690012'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    store.dispatch('fetchUser', {id: store.state.authId})
  }
})
