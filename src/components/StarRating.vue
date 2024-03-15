<script setup lang="ts">
defineProps<{ rating: number }>()
</script>

<template>
  <div :title="`${rating || 'No Rating'}`">
    <template v-for="i in 10" :key="i">
      <i v-if="rating >= i" class="fa-solid fa-star filled"></i>
      <i v-else-if="rating < i && rating > i - 1" class="fa-solid fa-star-half-stroke filled"></i>
      <i v-else class="fa-regular fa-star"></i>
    </template>
  </div>
</template>

<style scoped>
.filled {
  color: var(--star-color);
}
</style>
