import { useShowsStore } from '@/stores/shows'
import DashboardView from '@/views/DashboardView.vue'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

async function queryShow(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useShowsStore()
  const showId = to.params.id as string
  let show = store.showById(showId)

  if (show) {
    next()
  } else {
    show = await store.getShow(showId)
    if (show) next()
    else next({ name: '404' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/show',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/show/:id',
      name: 'showDetails',
      component: () => import('../views/ShowView.vue'),
      beforeEnter: [queryShow]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
