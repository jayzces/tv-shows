<script setup lang="ts">
import ShowList from '@/components/ShowList.vue'
import { useShowsStore } from '@/stores/shows'

const store = useShowsStore()
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
  <main class="page dashboard">
    <div class="container">
      <p v-if="store.isLoading">Loading...</p>
      <template v-else>
        <template v-for="g in genres" :key="g">
          <section v-if="store.mostPopularShows(g).length >= 5">
            <h2>{{ g }}</h2>
            <ShowList :shows="store.mostPopularShows(g)" :prefix="`${g}-`" />
          </section>
        </template>
      </template>
    </div>
  </main>
</template>

<style scoped>
section {
  margin: 0 auto;
  width: calc(210px * 5 + 20px * 4);
  max-width: 100%;
  min-height: 300px;
}

section:not(:first-child) {
  margin-top: 50px;
}

section h2 {
  margin: 0 0 20px;
}
</style>
