<script setup lang="ts">
import type { Show } from '@/stores/types/show'
import ShowTile from './ShowTile.vue'

interface ListProps {
  shows: Show[]
  prefix?: string
  wrap?: boolean
}

withDefaults(defineProps<ListProps>(), { wrap: false })
</script>

<template>
  <div class="shows-list" :class="{ wrap: wrap }">
    <div class="list-grid">
      <ShowTile v-for="s of shows" :key="`${prefix}${s.id}`" :show="s" />
    </div>
  </div>
</template>

<style scoped>
.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 210px);
  gap: 20px;
}

.shows-list:not(.wrap) {
  overflow-x: auto;
  padding-bottom: 10px;
}

.shows-list:not(.wrap) .list-grid {
  width: calc(210px * 5 + 20px * 4);
}

.wrap :deep(.show) {
  align-self: center;
}

@media all and (max-width: 470px) {
  .wrap .list-grid {
    margin: 0 auto;
    width: max-content;
  }
}
</style>
