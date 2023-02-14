import { createRouter, createWebHashHistory } from 'vue-router'

import Quiz from './views/QuizView.vue'
import Home from './views/HomeView.vue'
import Start from './views/StartView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: Quiz,
      path: '/quiz'
    },
    {
      component: Home,
      path: '/home/:name'
    },
    {
      component: Start,
      path: '/'
    }
  ]
})
