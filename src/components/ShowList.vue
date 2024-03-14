<script setup lang="ts">
import type { Show } from '@/stores/types/show'
import ShowTile from './ShowTile.vue'

defineProps<{ shows: Show[]; prefix?: string }>()
</script>

<template>
  <div class="shows-list">
    <ShowTile v-for="s of shows" :key="`${prefix}${s.id}`" :show="s" />
  </div>
</template>

<style scoped>
.shows-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 210px);
  gap: 20px;
}
</style>
