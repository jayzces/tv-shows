<script setup lang="ts">
import ShowList from '@/components/ShowList.vue'
import { useShowsStore } from '@/stores/shows'
const store = useShowsStore()
</script>

<template>
  <main class="page dashboard">
    <div class="container">
      <p v-if="store.isLoading">Loading...</p>
      <template v-else>
        <template v-for="g in store.genresList" :key="g">
          <section class="genre-section" v-if="store.sortedShowsByRating(g).length >= 5">
            <h2>{{ g }}</h2>
            <ShowList :shows="store.sortedShowsByRating(g)" :prefix="`${g}-`" />
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
