<template>
  <div id="app">
    <TheNavBar/>
    <div class="container">
      <router-view :key="$route.path" v-show="showPage" @ready="showPage = true"/>
      <AppSpinner v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
  import TheNavBar from '@/components/TheNavBar'
  import AppSpinner from '@/components/AppSpinner'

  export default {
    name: 'app',
    components: {
      TheNavBar,
      AppSpinner
    },
    data () {
      return {
        showPage: false
      }
    },
    created () {
      this.$router.beforeEach((to, from, next) => {
        this.showPage = false
        next()
      })
    }
  }
</script>

<style>
@import "assets/css/style.css";
</style>
