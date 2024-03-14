<script setup lang="ts">
import ShowList from '@/components/ShowList.vue'
import { useShowsStore } from '@/stores/shows'

const store = useShowsStore()
store.getShowsByPage()

const genres = [
  'Action',
  'Adult',
  'Adventure',
  'Anime',
  'Children',
  'Comedy',
  'Crime',
  'DIY',
  'Drama',
  'Espionage',
  'Family',
  'Fantasy',
  'Food',
  'History',
  'Horror',
  'Legal',
  'Medical',
  'Music',
  'Mystery',
  'Nature',
  'Romance',
  'Science-Fiction',
  'Sports',
  'Supernatural',
  'Thriller',
  'Travel',
  'War',
  'Western'
]
</script>

<template>
  <main>
    <section v-for="g in genres" :key="g">
      <h2>{{ g }}</h2>

      <ShowList :genre="g" />
    </section>
  </main>
</template>

<style scoped>
section {
  min-height: 300px;
}
</style>
