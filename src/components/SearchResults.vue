<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import ShowList from './ShowList.vue'
const store = useShowsStore()
</script>

<template>
  <div class="page search-results">
    <div class="container">
      <h2>Search Results ({{ store.queriedShows.length }} found)</h2>

      <ShowList :shows="store.queriedShows" prefix="queried-" :wrap="true" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 0;
}
</style>
