<template>
  <header class="max-w-6xl mx-auto flex justify-between">
    <Logo class="w-36 h-36" />

    <h1
      class="text-6xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10"
    >
      <span class="text-emerald-500">
        GitHub
      </span>
      Discovery
    </h1>
  </header>

  <main class="max-w-6xl mx-auto mt-4">
    <SearchBar @search="search" />

    <RepositoryList v-if="hasQuery" :search-options="searchOptions" />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { ISearchOptions } from '@/interfaces/Search.interface';
import Logo from '@/assets/svg/logo.svg?component';

export default defineComponent({
  name: 'Home',
  components: {
    Logo
  },
  setup: () => {
    const searchOptions = reactive<ISearchOptions>({
      query: null,
      limit: 10
    });

    const search = (query: string) => {
      searchOptions.query = query;
    };

    const hasQuery = computed(() => {
      return searchOptions.query;
    });

    return {
      search,
      searchOptions,
      hasQuery
    };
  }
});
</script>
