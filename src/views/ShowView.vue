<script setup lang="ts">
import StarRating from '@/components/StarRating.vue'
import { useShowsStore } from '@/stores/shows'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useShowsStore()
const props = defineProps<{ id: string | number }>()
const show = ref(store.showById(props.id))

const route = useRoute()

watch(
  () => route.params.id,
  (newId) => (show.value = store.showById(newId as string))
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear()
}
</script>

<template>
  <main v-if="show">
    <div class="banner">
      <img
        v-if="show.banner"
        :src="show.banner.resolutions.original.url"
        :alt="show.name"
        class="banner__image"
      />
      <div class="container">
        <img
          v-if="show.image"
          :src="show.image.medium"
          :alt="show.name"
          :title="show.name"
          class="poster"
        />
        <div class="poster-placeholder" v-else></div>
        <div class="banner__text">
          <p>
            {{ formatDate(show.premiered) }} &nbsp;&bullet;&nbsp;
            {{ show.language }} &nbsp;&bullet;&nbsp; {{ show.genres.join(', ') }}
          </p>
          <h1>{{ show.name }}</h1>
          <StarRating :rating="show.rating.average || 0" class="star-rating" />
        </div>
      </div>
    </div>

    <div class="page">
      <div class="container">
        <div v-html="show.summary"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.banner {
  position: relative;
}

.banner__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(100% - 240px);
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
}

.banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(100% - 240px);
  background-color: var(--main-accent);
  opacity: 0.7;
}

.banner .container {
  position: relative;
  padding-top: 20px;
  z-index: 1;
  text-align: center;
}

.banner__text {
  margin-top: 20px;
}

.star-rating {
  margin-top: 10px;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

.banner p {
  margin: 0;
}

.poster {
  display: block;
  margin: 0 auto;
  align-self: end;
}

.poster,
.poster-placeholder {
  width: 210px;
  height: 295px;
  border-radius: 5px;
}

.poster-placeholder {
  background-color: #8ab8b4;
}

.page {
  padding: 15px 0;
}

@media all and (min-width: 640px) {
  .banner {
    height: 360px;
  }

  .banner__image {
    height: calc(100% - 50px);
  }

  .banner::after {
    bottom: 50px;
  }

  .banner .container {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 15px;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: left;
  }
}

@media all and (min-width: 768px) {
  .poster {
    margin: 0;
  }
}

@media all and (min-width: 1024px) {
  h1 {
    font-size: 4rem;
  }

  .page {
    padding: 25px 0;
  }
}
</style>
