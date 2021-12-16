<template>
  <SearchBar @search="search" />

  <RepositoryList v-if="hasQuery" :search-options="searchOptions" />

  <div v-else class="flex flex-col justify-center items-center">
    <IconWaitingSearch class="w-72 h-72" />
    <p class="text-xl text-emerald-500">
      Ready for takeoff !
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { ISearchOptions } from '@/interfaces/Search.interface';
import IconWaitingSearch from '@/assets/svg/wait-for-launch.svg?component';

export default defineComponent({
  name: 'Home',
  components: {
    IconWaitingSearch,
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
