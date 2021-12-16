<template>
  <div class="flex justify-center" v-if="loading">
    <p class="text-xl font-bold text-gray-500">Request is loading...</p>
  </div>
  <div class="flex justify-center" v-else-if="error">
    <p class="text-xl font-bold text-red-600">Request has failed !</p>
  </div>
  <template v-else-if="repositories.length">
    <div class="md:block max-w-6xl mx-auto">
      <div class="flex justify-end mb-6">
        <select
          v-model.number="searchOptions.limit"
          class="shadow-md focus:ring-emerald-500 focus:border-emerald-500 p-2 sm:text-sm border-gray-500 rounded-md text-right"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <ul>
        <li
          class="relative mb-8"
          v-for="repository in repositories"
          :key="repository.node.id"
        >
          <div
            class="flex justify-between rounded-lg border-l-8 border-emerald-500 px-8 py-4 shadow-lg relative overflow-hidden transform ease-in-out duration-300 hover:scale-105 hover:shadow-emerald-100"
          >
            <pre>{{ repository.node }}</pre>
          </div>
        </li>
      </ul>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SearchResultItemConnection } from '@octokit/graphql-schema';
import { SEARCH_REPOS } from '@/graphql/repositories';
import { ISearchOptions } from '@/interfaces/Search.interface';

export default defineComponent({
  name: 'RepositoryList',
  props: {
    searchOptions: {
      type: Object as PropType<ISearchOptions>,
      default: () => {
        return {
          query: '',
          limit: 10
        };
      }
    }
  },
  setup(props) {
    const { searchOptions } = toRefs(props);

    const { result, loading, error } = useQuery<{
      search: SearchResultItemConnection;
    }>(SEARCH_REPOS, searchOptions);

    const repositories = useResult(result, [], (data) => data.search?.edges);

    return {
      repositories,
      loading,
      error
    };
  }
});
</script>
