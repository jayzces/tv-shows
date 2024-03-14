<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import { ref } from 'vue'

const store = useShowsStore()
const query = defineModel()
const expandSearch = ref(false)

// something extra to focus on the field when button is clicked haha
const inputField = ref()

const submit = () => store.getFilteredShows(query.value as string)
const clearSearch = () => {
  query.value = ''
  store.clearSearch()
}
const toggleSearchAndFocus = () => {
  expandSearch.value = !expandSearch.value
  inputField.value.focus()
}
</script>

<template>
  <nav class="nav-header" :class="{ expanded: expandSearch }">
    <div class="container">
      <RouterLink :to="{ name: 'dashboard' }" class="logo-container">
        <img
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="TVmaze logo"
          class="site-logo"
        />
      </RouterLink>

      <form @submit.prevent="submit" class="expanding-search" :class="{ active: query }">
        <button type="button" class="button-icon" @click="toggleSearchAndFocus">
          <span class="material-symbols-rounded">search</span>
        </button>
        <input
          ref="inputField"
          type="text"
          v-model="query"
          class="search-field"
          placeholder="What do you wanna watch?"
        />
        <button type="button" class="button-icon clear-button" @click="clearSearch" v-if="query">
          <span class="material-symbols-rounded">close</span>
        </button>
      </form>
    </div>
  </nav>
</template>

<style scoped>
.nav-header {
  background-color: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 2;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo-container {
  display: block;
}

.site-logo {
  height: 30px;
  object-fit: contain;
}

.expanding-search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 280px;
  padding: 0 5px;
  border-radius: 40px;
}

.expanding-search::before {
  content: '';
  background-color: var(--main-accent);
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity ease var(--transition-duration);
  pointer-events: none;
  border-radius: 40px;
}

.expanding-search:hover::before,
.expanding-search.active::before {
  opacity: 0.25;
}

.expanding-search:focus-within {
  outline: 2px solid var(--main-accent);
  outline-offset: 2px;
}

.expanding-search button {
  flex-shrink: 0;
}

.expanding-search button:focus {
  outline: none; /* parent will be focused instead */
}

.search-field {
  flex-grow: 1;
}

.search-field:focus {
  outline: none;
}

@media all and (max-width: 640px) {
  .expanded .logo-container {
    display: none;
  }

  .expanded .expanding-search {
    max-width: unset;
  }

  .nav-header:not(.expanded) .expanding-search {
    padding: 0;
    width: 40px;
  }

  .nav-header:not(.expanded) .expanding-search input,
  .nav-header:not(.expanded) .expanding-search .clear-button {
    display: none;
  }
}
</style>
