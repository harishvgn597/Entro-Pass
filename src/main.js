import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignUp from './components/SignUp.vue'
import Home_Comp from './components/Home_Comp.vue'
import Login from './components/Login.vue'
import Admin_Login from './components/Admin_Login.vue'
import Admin_Comp from './components/Admin_Comp.vue'
import adminAddTheatre from './components/adminAddTheatre.vue'
import adminModifyTheatre from './components/adminModifyTheatre.vue'
import adminRemoveTheatre from './components/adminRemoveTheatre.vue'
import adminCreateShow from './components/adminCreateShow.vue'
import adminAddShowTimings from './components/adminAddShowTimings.vue'
import adminRemoveShow from './components/adminRemoveShow.vue'
import showTimings from './components/showTimings.vue'

import userProfile from './components/userProfile.vue'
import userRating from './components/userRatings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/sign_up', component: SignUp },
    { path: '/home', component: Home_Comp },
    { path: '/admin_login', component: Admin_Login },
    { path: '/admin', component: Admin_Comp },
    { path: '/admin_addtheatre', component: adminAddTheatre },
    { path: '/admin_modifytheatre', component: adminModifyTheatre },
    { path: '/admin_removetheatre', component: adminRemoveTheatre },
    { path: '/admin_createshow', component: adminCreateShow },
    { path: '/admin_addshowtimings', component: adminAddShowTimings },
    { path: '/admin_removeshow', component: adminRemoveShow },
    { path: '/showTimings', component: showTimings },
    {path:'/userProfile',component: userProfile},
    {path:'/userRating', component: userRating},
    // Add other routes here if needed
  ],
})

createApp(App).use(router).mount('#app')
