<script>
  export default {
    data() {
      return {
        userName: '',
        lengthOfText: 0,
        lengthText: 'Your name contains 0 letters'
      }
    },
    emits: ['username-emit'],
    methods: {
      onClick() {
        this.$emit('username-emit', this.userName)
      }
    },
    watch: {
      userName(name) {
        this.lengthOfText = name.length
        if (this.lengthOfText >= 10) {
          this.lengthText =
            'You have a very long name, your name contains ' +
            this.lengthOfText +
            ' letters'
        } else {
          this.lengthText =
            'Your name contains ' + this.lengthOfText + ' letters'
        }
      }
    }
  }
</script>
<style></style>
<template>
  <form action="">
    <input
      type="text"
      class="form-control bg-light"
      placeholder="Enter your name"
      v-model="userName"
    />

    <input
      @click="onClick"
      type="submit"
      class="btn btn-primary text-white"
      value="Submit"
    />
  </form>
  <p>{{ lengthText }}</p>
</template>
