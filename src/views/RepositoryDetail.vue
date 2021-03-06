<template>
  <div class="max-w-6xl mx-auto mt-12 mb-6">
    <div class="flex justify-center" v-if="loading">
      <Loading class="w-56 h-56" />
    </div>
    <div class="flex justify-center" v-else-if="error">
      <Error class="w-72 h-72" />
    </div>
    <template v-else>
      <Repository :repository="repository" />

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Latest issues list -->
          <CardIssues 
            :repository-name="repository.nameWithOwner"
            :issues="repository.issues" 
          />
        </div>

        <!-- Latest release -->
        <ReleaseTimeline 
          :repository-name="repository.nameWithOwner"
          :releases="repository.releases" 
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { GET_REPO } from '@/graphql/repositories';
import { SearchResultItemConnection } from '@octokit/graphql-schema';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Repository',
  setup() {
    const route = useRoute()
    const searchOptions = reactive({
      nodeId: route.params.repositoryId,
      limit: 10,
    })

    const { result, loading, error } = useQuery<{
      search: SearchResultItemConnection;
    }>(GET_REPO, searchOptions);

    const repository = useResult(result, [], (data) => data?.node);

    return {
      loading,
      error,
      repository
    }
  },
})
</script>