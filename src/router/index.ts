import { useShowsStore } from '@/stores/shows'
import DashboardView from '@/views/DashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: () => {
        useShowsStore().getShowsByPage()
        return true
      }
    },
    {
      path: '/show',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/show/:id',
      name: 'showDetails',
      props: true,
      component: () => import('../views/ShowView.vue'),
      beforeEnter: async (to, from, next) => {
        const store = useShowsStore()
        const showId = to.params.id as string
        await store.getShow(showId)
        const show = store.showById(showId)
        store.clearSearch()

        if (show) next()
        else next({ name: '404' })
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
