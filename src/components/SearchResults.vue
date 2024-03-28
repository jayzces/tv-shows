<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import ShowList from './ShowList.vue'
const store = useShowsStore()
</script>

<template>
  <div class="page search-results">
    <div class="container">
      <h2>
        Search Results
        <template v-if="store.isLoading">(Loading...)</template>
        <template v-else>({{ store.queriedShows.length }} found)</template>
      </h2>
      <template v-if="store.queriedShows.length > 0">
        <ShowList :shows="store.queriedShows" prefix="queried-" :wrap="true" />
      </template>
      <p v-else-if="!store.isLoading">No Results</p>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 0;
}
</style>
