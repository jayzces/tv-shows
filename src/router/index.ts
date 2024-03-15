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
      },
      meta: { title: 'Dashboard' }
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

        // clear filtered search when coming from the search screen
        store.clearSearch()

        if (show) {
          // update page title
          document.title = `${show.name} | TV Shows`
          next()
        } else {
          next({ name: '404' })
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404View.vue'),
      meta: { title: 'Page not found' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | TV Shows` : 'TV Shows'
  next()
})

export default router
