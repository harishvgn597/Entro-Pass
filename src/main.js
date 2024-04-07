import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignUp from './components/SignUp.vue'
import Home_Comp from './components/Home_Comp.vue'
import Login from './components/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/sign_up', component: SignUp },
    { path: '/home', component: Home_Comp },
    // Add other routes here if needed
  ],
})

createApp(App).use(router).mount('#app')
