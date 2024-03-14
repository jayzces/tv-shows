<script setup lang="ts">
import type { Show } from '@/stores/types/show'
defineProps<{ show: Show }>()
</script>

<template>
  <RouterLink :to="{ name: 'showDetails', params: { id: show.id } }" class="show-link">
    <div class="show">
      <img v-if="show.image" :src="show.image.medium" :alt="show.name" />
      <div class="show__image-placeholder" v-else></div>
      <div class="show__text">
        <h4>{{ show.name }}</h4>
        <p>Rating {{ show.rating.average || 0 }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.show-link {
  display: inline-block;
}

.show {
  position: relative;
}

.show img {
  display: block;
}

.show__image-placeholder {
  width: 210px;
  height: 295px;
  border: 1px solid black;
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
