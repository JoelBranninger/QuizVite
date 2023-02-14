<script>
  export default {
    props: {
      userName: {
        type: String,
        default: 'Anonym',
        required: true
      }
    }
  }
</script>
<style></style>
<template>
  <h3>Hello {{ userName ? userName : 'Anonym' }}</h3>
</template>
