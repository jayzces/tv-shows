<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
import SearchResults from './components/SearchResults.vue'
import { useShowsStore } from './stores/shows'
const store = useShowsStore()
</script>

<template>
  <NavHeader />
  <SearchResults v-if="store.activeSearch" />
  <RouterView v-else />
</template>
