<template>
  <section aria-labelledby="issues">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h2 class="text-lg leading-6 font-medium text-gray-900">
          Latest opened issues
        </h2>
        <div class="inline-flex bg-gray-900 px-2 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white">
          {{ issues.totalCount }}
        </div>
      </div>
      
      <!-- Issue card -->
      <a
        v-for="issue in issues.edges"
        :key="issue.node.id"
        :href="issue.node.url" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="px-4 py-5 sm:px-6 hover:bg-emerald-300 hover:bg-opacity-50 block"
      >
        <div class="relative flex items-start space-x-3">
          <div class="relative">
            <img
              class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" 
              :src="issue.node.author.avatarUrl" 
              :alt="issue.node.author.login"
            >

            <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
              <svg class="h-5 w-5 text-gray-400" x-description="Heroicon name: solid/chat-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <div>
              <div class="text-sm">
                <a 
                  :href="issue.node.author.url" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="font-medium text-gray-900"
                >
                  @{{ issue.node.author.login }}
                </a>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">
                Created {{ formattedDate(issue.node.createdAt) }}
              </p>
            </div>
            <div class="mt-2 text-sm text-gray-700">
              <p>{{ issue.node.title }}</p>
              <p class="truncate">{{ issue.node.bodyText }}</p>
            </div>
          </div>
        </div>
      </a>
      
      <div>
        <a 
          :href="`https://github.com/${repositoryName}/issues`" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
        >
          Show all issues
        </a>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { IIssues } from '@/interfaces/Issue.interface'
import { defineComponent, PropType } from 'vue'
import { formatDistanceFromNow } from '@/utils/format'

export default defineComponent({
  name: 'CardIssues',
  props: {
    repositoryName: {
      type: String,
      required: true
    },
    issues: {
      type: Object as PropType<IIssues>,
      required: true
    }
  },
  setup() {
    const formattedDate = (createdAt: string): string => {
      return formatDistanceFromNow(createdAt);
    }

    return {
      formattedDate,
    }
  },
})
</script>
