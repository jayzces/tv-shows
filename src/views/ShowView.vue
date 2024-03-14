<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'

const props = defineProps<{ id: string }>()
const store = useShowsStore()
const show = store.showById(props.id)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear()
}
</script>

<template>
  <main v-if="show">
    <h1>{{ show.name }}</h1>
    <img v-if="show.image" :src="show.image.medium" :alt="show.name" />
    <div class="image-placeholder" v-else></div>
    <div>{{ show.rating.average || 0 }} / 10</div>
    <div>Released {{ formatDate(show.premiered) }}</div>
    <div>Genre: {{ show.genres.join(', ') }}</div>
    <div v-html="show.summary"></div>
  </main>
</template>

<style scoped>
.image-placeholder {
  width: 210px;
  height: 295px;
  border: 1px solid var(--border-color);
}
</style>
