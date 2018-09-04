<template>
  <div>
    <h1>
      Not found
    </h1>
    <p>
      Ooops, we couldn't find what you are looking for. Why don't you
      <router-link :to="{name:'Home'}">
        go home instead?
      </router-link>
    </p>
  </div>

</template>

<script>
  export default {
    name: 'PageNotFound'
  }
</script>

<style scoped>
  h1 {
    font-size: 6rem;
  }
  p {
    font-size: 3.5rem;
    font-weight: 100;
  }
  div {
    text-align: center;
  }
</style>
