<script setup lang="ts">
import type { Show } from '@/stores/types/show'
defineProps<{ show: Show }>()
</script>

<template>
  <div class="show">
    <img :src="show.image.medium" />
    <div class="show__text">
      <h4>{{ show.name }}</h4>
      <p>Rating {{ show.rating.average }}</p>
    </div>
  </div>
</template>

<style scoped>
.show {
  position: relative;
}

.show:not(:first-child) {
  margin-left: 20px;
}

.show__text {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  position: absolute;
  inset: 0;
  padding: 10px;
  z-index: 1;
}

.show__text h4 {
  margin: auto 0 0;
}

.show__text p {
  margin: 0;
}
</style>
