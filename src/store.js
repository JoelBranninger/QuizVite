import { createStore } from 'vuex'
const mutations = {
    startQuiz(state, payload) {
      state.category = payload.category
      state.difficulty = payload.difficulty
    }
  },
  state = {
    category: null,
    difficulty: null
  }

export default createStore({ mutations, state, strict: true })
