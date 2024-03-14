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

      {{ query }} {{ store.queriedShows.length }}

      <template v-if="store.queriedShows.length > 0">
        <h2>Search Results</h2>

        <div class="list">
          <ShowTile v-for="s in store.queriedShows" :key="`queried-show-${s.id}`" :show="s" />
        </div>
      </template>

      <section v-for="g in genres" :key="g">
        <h2>{{ g }}</h2>

        <ShowList :genre="g" />
      </section>
    </template>
  </main>
</template>

<style scoped>
section {
  min-height: 300px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 210px);
  gap: 20px;
}
</style>
