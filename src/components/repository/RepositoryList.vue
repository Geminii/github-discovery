<template>
  <div class="flex justify-center" v-if="loading">
    <Loading />
  </div>
  <div class="flex justify-center" v-else-if="error">
    <Error class="w-72 h-72" />
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
          <router-link :to="{ name: 'repository', params: { repositoryId: repository.node.id } }">
            <Repository :repository="repository.node" />
          </router-link>
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
