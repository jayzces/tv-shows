<script setup lang="ts">
import ShowList from '@/components/ShowList.vue'
import ShowTile from '@/components/ShowTile.vue'
import { useShowsStore } from '@/stores/shows'
import { ref } from 'vue'

const isLoading = ref(true)
const query = defineModel()
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

store.getShowsByPage().then(() => (isLoading.value = false))

const submit = () => {
  isLoading.value = true
  store.getFilteredShows(query.value as string).then(() => (isLoading.value = false))
}

const closeSearch = () => {
  query.value = ''
  store.clearSearch()
}
</script>

<template>
  <main>
    <p v-if="isLoading">Loading...</p>
    <template v-else>
      <form @submit.prevent="submit">
        <input type="text" v-model="query" placeholder="Search" />
        <button type="submit">Search</button>
      </form>

      <button @click="store.getNextShows()">Load more shows</button>

      <template v-if="store.queriedShows.length > 0">
        <h2>Search Results</h2>

        <button @click="closeSearch">Close Results</button>

        <ShowList :shows="store.queriedShows" prefix="queried-" />
      </template>

      <section v-for="g in genres" :key="g">
        <h2>{{ g }}</h2>

        <ShowList :shows="store.mostPopularShows(g)" :prefix="`${g}-`" />
      </section>
    </template>
  </main>
</template>

<style scoped>
section {
  min-height: 300px;
}
</style>
