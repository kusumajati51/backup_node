// Composables
import Auth from '@/layouts/Auth.vue'
import Default from '@/layouts/default/Default.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

import Trial from '@/pages/Trial.vue'
import Home from '@/layouts/Home.vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => Home,

  },
  {
    path: '/auth',
    component: () => Auth,
    // meta: { layout: Auth },
    children: [
      {
        path: 'login',
        meta: {
          title_text: "Welcome",
          text: "You don't have account? \n you can register here",
          link: "register",
          link_text: "Register",
          transition: 'slide-left'
        },
        component: () => Login
      },
      {
        path: 'register',
        meta: {
          title_text: "Welcome",
          text: "If you have account please login from here",
          link: "login",
          link_text: "Login",
          transition: 'slide-right'
        },
        component: () => Register
      }
    ]
  },
  {
    path: '/trial',
    component: () => Trial
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
