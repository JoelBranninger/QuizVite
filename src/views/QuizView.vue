<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        api: null,
        show: 0,
        rightWrong: '',
        color: '',
        rotate: {
          a: 'rotateX(0deg)',
          b: 'rotateX(0deg)',
          c: 'rotateX(0deg)',
          d: 'rotateX(0deg)',
          e: 'rotateX(0deg)',
          f: 'rotateX(0deg)'
        },
        points: 0,
        indexQuestion: 1,
        answerd: false,
        rightAnswer: null,
        rightAnswerIndex: null
      }
    },
    computed: {
      category() {
        return this.$store.state.category
      },
      difficulty() {
        return this.$store.state.difficulty
      }
    },
    created() {
      if (this.category == null) {
        this.$router.push({ path: '/home/Anonym', replace: true })
      } else {
        axios
          .get(
            'https://quizapi.io/api/v1/questions?apiKey=AWYb2S3QxXC1aTDXrZHQ47JmIwjrB1y2xOimTY0H&category=' +
              this.category +
              '&difficulty=' +
              this.difficulty +
              '&limit=10'
          )
          .then((response) => response.data)
          .then((result) => {
            this.api = result
          })
      }
    },
    methods: {
      nextQuestion() {
        this.show++
        this.indexQuestion++
        this.answerd = false
        for (let i in this.rotate) {
          this.rotate[i] = 'rotateX(0deg)'
        }
      },
      checkAnswer(answers, answer) {
        for (let i in this.rotate) {
          if (this.rotate[i] === 'rotateX(180deg)') {
            this.answerd = true
            break
          }
        }
        if (this.answerd === false) {
          this.answerd = true
          for (let i in answers.correct_answers) {
            if (answers.correct_answers[i] === 'true') {
              this.rightAnswerIndex = i.charAt(7)
              this.rightAnswer = answers.answers[i.slice(0, -8)]
              break
            }
          }
          if (this.rightAnswerIndex === answer.charAt(7)) {
            let index = answer.charAt(7)
            this.rotate[index] = 'rotateX(180deg)'
            this.color = 'rgb(54, 207, 12)'
            this.rightWrong = 'Right'
            this.points++
          } else {
            let index = answer.charAt(7)
            this.rotate[index] = 'rotateX(180deg)'
            this.color = 'red'
            this.rightWrong = 'Wrong'
          }
        }
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
  }

  header {
    display: grid;
  }
  .heading {
    font-size: 2rem;
    margin: 0px;
    justify-self: center;
  }
  .game-size {
    font-size: 1.2rem;
    margin: 0px;
    justify-self: center;
    font-weight: lighter;
  }
  .main-container {
    font-size: 1.2rem;
    margin-right: auto;
    margin-left: auto;
    width: 60%;
    display: grid;
  }
  .card-container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .center-text {
    font-size: 1.2rem;
    margin-right: auto;
    margin-left: auto;
    width: fit-content;
    text-align: center;
  }

  .answer {
    font-size: 1.2rem;
    width: fit-content;
    font-weight: lighter;
    text-align: start;
  }

  .next-btn {
    margin-top: 40px;
    border-style: none;
    border-radius: 10px;
    justify-self: center;
    padding: 20px;
    width: 40%;
    font-size: 1.2rem;
    background-color: rgb(54, 207, 12);
    cursor: pointer;
  }

  .next-btn:disabled {
    cursor: default;
    background-color: rgba(54, 207, 12, 0.6);
    color: rgba(0, 0, 0, 0.6);
  }

  .card {
    display: grid;
    perspective: 1200px;
    width: 100%;
    height: 80px;
    margin-top: 40px;
  }

  .card-inner {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }

  .card-back,
  .card-front {
    display: grid;
    justify-content: start;
    align-items: center;
    font-weight: lighter;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    position: absolute;
    border-radius: 10px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    background-color: rgb(48, 158, 255);
  }

  .card-back {
    transform: rotateX(180deg);
  }

  .card-front {
    cursor: pointer;
  }
</style>

<template>
  <header>
    <h2 class="game-size">{{ this.$store.state.category }}</h2>
  </header>
  <div :key="question.id" v-for="(question, questionKey) in api">
    <div class="main-container" v-if="questionKey === this.show">
      <h2 class="center-text">{{ question.question }}</h2>
      <div class="center-text">Points: {{ points }}</div>
      <div :key="answer" v-for="(answer, key) in question.answers">
        <div class="card" v-if="answer !== null">
          <div class="card-inner" :style="{ transform: rotate[key.charAt(7)] }">
            <div
              class="card-front bg-primary text-white"
              @click="checkAnswer(question, key)"
            >
              <h3 class="answer">{{ answer }}</h3>
            </div>
            <div class="card-back" :style="{ backgroundColor: color }">
              <h3 class="answer" v-if="rightWrong === 'Wrong'">
                <b>{{ rightWrong }}</b> | The right answer is "{{
                  rightAnswer
                }}"
              </h3>
              <h3 class="answer" v-else>{{ rightWrong }}</h3>
            </div>
          </div>
        </div>
      </div>
      <input
        type="submit"
        :value="'Next ' + indexQuestion + '/10'"
        class="next-btn"
        @click="nextQuestion"
        :disabled="this.answerd === false"
      />
    </div>
  </div>
  <div v-if="indexQuestion === 11">
    <h2 class="center-text">You got {{ points }} points out of 10</h2>
  </div>
</template>
