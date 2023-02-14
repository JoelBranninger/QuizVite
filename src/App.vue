<script>
  import LogoLink from './components/LogoLink.vue'

  export default {
    components: {
      LogoLink
    }
  }
</script>
<style lang="scss">
  ul {
    display: flex;
    list-style-type: none;
    text-decoration: none;
  }
  .link {
    margin: 20px;
    text-decoration: none;
  }
</style>
<template>
  <LogoLink />
  <RouterView />
</template>
