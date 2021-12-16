<template>
  <SearchBar @search="search" />

  <RepositoryList v-if="hasQuery" :search-options="searchOptions" />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { ISearchOptions } from '@/interfaces/Search.interface';

export default defineComponent({
  name: 'Home',
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
