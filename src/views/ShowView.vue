<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'

const props = defineProps<{ id: string }>()
const store = useShowsStore()
const show = store.showById(props.id)

const year = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear()
}
</script>

<template>
  <main v-if="show">
    <RouterLink :to="{ name: 'dashboard' }">
      <button>Back to Dashboard</button>
    </RouterLink>
    <h1>{{ show.name }}</h1>
    <img :src="show.image.medium" :alt="show.name" />
    <div>{{ show.rating.average }} / 10</div>
    <div>{{ year(show.premiered) }} - {{ year(show.ended) }}</div>
    <div>Genre: {{ show.genres.join(', ') }}</div>
    <div v-html="show.summary"></div>
  </main>
</template>
