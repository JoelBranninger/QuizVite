<script>
  export default {
    data() {
      return {
        payload: {
          category: null,
          difficulty: null
        },
        categoryError: false,
        difficultyError: false
      }
    },
    created() {
      console.log(typeof this.$route.params.name)
      if (this.$route.params.name == null) {
        this.$router.push('/')
      }
    },
    methods: {
      nextPage() {
        if (this.payload.difficulty == null) {
          this.difficultyError = true
        } else if (this.payload.category == null) {
          this.categoryError = true
        } else {
          this.$store.commit('startQuiz', this.payload)
          this.$router.push('/Quiz')
        }
      }
    }
  }
</script>
<style lang="scss">
  form {
    display: grid;
    .btn {
      transition: scale 0.2s;
    }
    .btn:hover {
      scale: 1.02;
    }
  }
</style>
<template>
  <div class="main-container">
    <p>
      Which category and difficulty do you want for the quiz
      {{ $route.params.name }}?
    </p>
    <form action="">
      <label>Category</label>
      <select
        v-model="payload.category"
        name="category"
        id="category"
        class="btn btn-light"
      >
        <option value="" disabled selected hidden>Choose a category</option>
        <option value="linux">Linux</option>
        <option value="docker">Docker</option>
        <option value="SQL">SQL</option>
        <option value="CMS">CMS</option>
        <option value="code">Code</option>
        <option value="devOps">DevOps</option>
      </select>
      <p class="text-warning" v-if="categoryError">
        You need to enter a category
      </p>

      <label>Difficulty</label>
      <select
        v-model="payload.difficulty"
        name="difficulty"
        id="difficulty"
        class="btn btn-light"
      >
        <option value="" disabled selected hidden>Choose a difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <p class="text-warning" v-if="difficultyError">
        You need to enter a difficulty
      </p>
      <input
        class="btn btn-primary text-white"
        type="button"
        value="Start quiz"
        @click="nextPage"
      />
    </form>
  </div>
</template>
