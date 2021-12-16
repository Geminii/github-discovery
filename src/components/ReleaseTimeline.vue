<template>
  <section aria-labelledby="release-version" >
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 sm:px-6 py-5 flex justify-between items-center border-b border-gray-200">
        <h2 class="text-lg leading-6 font-medium text-gray-900">
          Latest release<template v-if="hasMultipleRelease">s</template>
        </h2>
        <div class="inline-flex bg-gray-900 px-2 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white">
          {{ releases.totalCount }}
        </div>
      </div>

      <div class="px-4 sm:px-6 py-5 flow-root">
        <div class="flow-root">
          <ul role="list" class="-mb-8">
            <li
              v-for="(release, releaseIndex) in releases.edges"
              :key="release.node.id"
            >
              <div class="relative pb-8">
                <span 
                  v-if="releaseIndex !== releases.edges.length - 1"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"
                ></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                      <IconTag class="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 py-0">
                    <div class="text-sm leading-8 text-gray-500">
                      <a 
                        :href="release.node.url" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                      >
                        {{ release.node.tagName }}
                      </a>
                      <span class="whitespace-nowrap ml-2">
                        {{ formattedDate(release.node.createdAt) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mt-6 flex flex-col justify-stretch">
          <a 
            :href="`https://github.com/${repositoryName}/releases`" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex justify-center"
          >
            <button type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              View all releases
            </button>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { formatDistanceFromNow } from '@/utils/format';
import { computed, defineComponent, PropType, toRefs } from 'vue';
import IconTag from '@/assets/svg/tag.svg?component';
import { IReleases } from '@/interfaces/Release.interface'

export default defineComponent({
  name: 'ReleaseTimeline',
  components: {
    IconTag,
  },
  props: {
    repositoryName: {
      type: String,
      required: true
    },
    releases: {
      type: Object as PropType<IReleases>,
      required: true
    }
  },
  setup(props) {
    const { releases } = toRefs(props);
    const formattedDate = (createdAt: string): string => {
      return formatDistanceFromNow(createdAt);
    }

    const hasMultipleRelease = computed((): boolean => {
      return releases.value.edges.length > 1;
    })

    return {
      formattedDate,
      hasMultipleRelease,
    }
  },
})
</script>
