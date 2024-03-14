<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import ShowTile from './ShowTile.vue'

defineProps<{ genre: string }>()
const { mostPopularShows } = useShowsStore()
</script>

<template>
  <div class="shows-list">
    <ShowTile v-for="s of mostPopularShows(genre)" :key="s.id" :show="s" />
  </div>
</template>

<style scoped>
.shows-list {
  display: grid;
  grid-template-columns: repeat(5, 210px);
  gap: 20px;
}
</style>
