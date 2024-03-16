<script setup lang="ts">
import type { Show } from '@/stores/types/show'
defineProps<{ show: Show }>()
</script>

<template>
  <RouterLink :to="{ name: 'showDetails', params: { id: show.id } }" class="show-link">
    <div class="show" :title="show.name">
      <img v-if="show.image" :src="show.image.medium" :alt="show.name" class="show__image" />
      <div class="show__image-placeholder" v-else></div>
      <div class="show__text">
        <h4>{{ show.name }}</h4>
        <p class="show__rating">
          <template v-if="show.rating.average">Rating {{ show.rating.average }}</template>
          <template v-else>No Rating</template>
        </p>
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
  border-radius: 5px;
  overflow: hidden;
}

.show img {
  display: block;
}

.show__image-placeholder {
  width: 210px;
  height: 295px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}

.show__text {
  display: flex;
  flex-direction: column;
  color: white;
  position: absolute;
  inset: 0;
  padding: 10px;
  opacity: 0;
  z-index: 1;
  transition: opacity ease-in-out var(--transition-duration);
}

.show__text::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--main-accent);
  opacity: 0.8;
  z-index: -1;
}

.show:hover .show__text {
  opacity: 1;
}

h4 {
  margin: auto 0 0;
  font-size: 1.1rem;
}

.show__text p {
  margin: 0;
}
</style>
