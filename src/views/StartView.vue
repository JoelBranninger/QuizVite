<script>
  import NameInput from '../components/NameInput.vue'
  import NameText from '../components/NameText.vue'
  export default {
    components: {
      NameInput,
      NameText
    },
    data() {
      return {
        userName: null
      }
    },
    methods: {
      onUserameEmit(username) {
        this.userName = username
      },
      nextPage() {
        if (this.userName != null) {
          this.$router.push({ path: '/home/' + this.userName, replace: true })
        } else {
          this.$router.push({ path: '/home/Anonym', replace: true })
        }
      }
    }
  }
</script>
<style></style>
<template>
  <div class="main-container">
    <NameText :user-name="userName" />
    <NameInput @username-emit="onUserameEmit" />
    <input type="submit" @click="nextPage" value="Play the quiz" />
  </div>
</template>
