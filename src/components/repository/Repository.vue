<template>
  <div
    class="flex justify-between rounded-lg bg-white border-l-8 border-emerald-500 px-8 py-4 shadow-lg relative overflow-hidden transform ease-in-out duration-300"
    :class="{ 'hover:scale-105 hover:shadow-emerald-100': listing }"
  >
    <div class="max-w-[70%]">
      <div class="flex items-center gap-2" v-if="repository.owner">
        <img :src="repository.owner.avatarUrl" class="w-6 h-6 rounded-full" />
        <h1 class="text-3xl text-slate-800">
          {{ repository.name }} / {{ repository.owner.login }}
        </h1>
      </div>
      <p class="text-gray-500 my-2">{{ repository.description }}</p>

      <div class="flex items-center gap-2 font-semibold text-slate-700 mb-2">
        <span v-if="repository.primaryLanguage" class="flex items-center gap-2">
          <div
            class="w-4 h-4 rounded-full"
            :style="`background-color: ${repository.primaryLanguage.color}`"
          />
          <span :style="`color: ${repository.primaryLanguage.color}`">{{
            repository.primaryLanguage.name
          }}</span>
        </span>
        <span v-if="repository.licenseInfo">
          - {{ repository.licenseInfo?.name }}
        </span>
        <span> - {{ formattedDate(repository.updatedAt) }} </span>
      </div>
      <div
        v-if="repository.repositoryTopics.edges.length > 0"
        class="flex flex-wrap gap-2"
      >
        <div
          v-for="topic in repository.repositoryTopics.edges"
          :key="topic.node.id"
          class="px-2 py-1 bg-emerald-500 text-white rounded-lg"
        >
          {{ topic.node.topic.name }}
        </div>
      </div>
      <p v-else class="text-slate-400 font-semibold">
        -- No tags founds
      </p>
    </div>
    <div>
      <button
        class="flex gap-2 items-center justify-center ease-in-out duration-200 border border-transparent hover:border-gray-200 focus:border-amber-300 rounded-lg p-2"
        :class="{
          'text-gray-500 hover:text-amber-300': !repository.viewerHasStarred,
          'text-amber-300': repository.viewerHasStarred
        }"
        @click.prevent="handleStar"
      >
        <span class="uppercase text-md">Stargazers</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </button>
      <div class="text-4xl text-right mt-12 relative">
        <span class="z-10 relative">{{
          repository.stargazers.totalCount
        }}</span>
        <div
          class="bg-emerald-300 w-full h-6 -bottom-2 absolute bg-opacity-50 z-0"
        />
      </div>
    </div>

    <svg
      class="absolute -bottom-10 -right-4"
      width="150"
      height="100"
      fill="none"
      viewBox="0 0 404 392"
    >
      <defs>
        <pattern
          id="837c3e70-6c3a-44e6-8854-cc48c737b659"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-gray-200"
            fill="currentColor"
          ></rect>
        </pattern>
      </defs>
      <rect
        width="404"
        height="392"
        fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
      ></rect>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { formatDistanceFromNow } from '@/utils/format';
import { useMutation } from "@vue/apollo-composable";
import {
  AddStarPayload,
  AddStarInput,
  RemoveStarPayload,
  RemoveStarInput,
  Repository,
  SearchResultItemConnection,
  Node
} from "@octokit/graphql-schema";

import { IRepository } from '@/interfaces/Repository.interface';
import { ADD_STAR, GET_REPO, REMOVE_STAR, SEARCH_REPOS } from '@/graphql/repositories';
import { ISearchOptions } from '@/interfaces/Search.interface';
import { ApolloCache } from '@apollo/client/cache';

interface CacheData {
  [propName: string]: AddStarPayload | RemoveStarPayload;
}

interface QueryVariables {
  [propName: string]: number | string;
}

export default defineComponent({
  name: 'Repository',
  props: {
    searchOptions: {
      type: Object as PropType<ISearchOptions>,
      default: () => {
        return {
          query: '',
          limit: 10
        };
      }
    },
    repository: {
      type: Object as PropType<IRepository>,
      required: true
    },
    listing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let selectedId: string;
    const { repository, searchOptions, listing } = toRefs(props);
    const formattedDate = (updatedAt: string): string => {
      return formatDistanceFromNow(updatedAt);
    };

    const overrideSearchMutationStarCache = (
      mutation: string,
      cache: ApolloCache<CacheData>,
      data: CacheData | null | undefined,
      queryVariables: QueryVariables,
      calcNewTotal: (totalCount: number) => number
    ) => {
      const cachedData = cache.readQuery<{
        search: SearchResultItemConnection;
      }>({
        query: SEARCH_REPOS,
        variables: queryVariables
      });
      cache.writeQuery({
        query: SEARCH_REPOS,
        data: Object.assign({}, cachedData, {
          search: {
            edges: cachedData!.search.edges!.map(edge => {
              const repo = edge!.node as Repository;
              const clonedRepo = {
                ...repo,
                stargazers: { ...repo.stargazers }
              };

              if (clonedRepo.id === data![mutation].starrable!.id) {
                clonedRepo.viewerHasStarred = data![
                  mutation
                ].starrable!.viewerHasStarred;
                clonedRepo.stargazers.totalCount = calcNewTotal(
                  clonedRepo.stargazers.totalCount
                );
              }

              return {
                ...edge,
                node: clonedRepo
              };
            })
          }
        })
      });
    };

    const overrideRepositoryDetailMutationStarCache = (
      mutation: string,
      cache: ApolloCache<CacheData>,
      data: CacheData | null | undefined,
      queryVariables: QueryVariables,
      calcNewTotal: (totalCount: number) => number
    ) => {
      const cachedData = cache.readQuery<{
        node: Node;
      }>({
        query: GET_REPO,
        variables: queryVariables
      });

      const nodeCachedData = cachedData?.node as Repository
      let clonedRepo = {
        ...nodeCachedData,
        stargazers: { ...nodeCachedData.stargazers }
      };

      if (clonedRepo.id === data![mutation].starrable!.id) {
        clonedRepo.viewerHasStarred = data![mutation].starrable!.viewerHasStarred;
        clonedRepo.stargazers.totalCount = calcNewTotal(
          clonedRepo.stargazers.totalCount
        );
      }

      cache.writeQuery({
        query: GET_REPO,
        data: Object.assign({}, cachedData, {
          node: clonedRepo
        })
      });
    };

    const { mutate: starRepo } = useMutation<
      { addStar: AddStarPayload },
      { repositoryId: AddStarInput["starrableId"] }
    >(ADD_STAR, () => ({
      variables: {
        repositoryId: selectedId
      },
      update: (cache, { data }) => {
        if (listing.value) {
          overrideSearchMutationStarCache(
            "addStar",
            cache,
            data,
            searchOptions.value,
            totalCount => totalCount + 1
          );
        } else {
          overrideRepositoryDetailMutationStarCache(
            "addStar",
            cache,
            data,
            {
              nodeId: repository.value.id
            },
            totalCount => totalCount + 1
          );
        }
      }
    }));

    const { mutate: unstarRepo } = useMutation<
      {
        removeStar: RemoveStarPayload;
      },
      { repositoryId: RemoveStarInput["starrableId"] }
    >(REMOVE_STAR, () => ({
      variables: {
        repositoryId: selectedId
      },
      update: (cache, { data }) => {
        if (listing.value) {
          overrideSearchMutationStarCache(
            "removeStar",
            cache,
            data,
            searchOptions.value,
            totalCount => totalCount - 1
          );
        } else {
          overrideRepositoryDetailMutationStarCache(
            "removeStar",
            cache,
            data,
            {
              nodeId: repository.value.id
            },
            totalCount => totalCount - 1
          );
        }
      }
    }));

    const handleStar = (evt: Event) => {
      evt.stopPropagation();
      evt.preventDefault();

      const { id, viewerHasStarred } = repository.value;
      selectedId = id;

      if (viewerHasStarred) {
        unstarRepo();
      } else {
        starRepo();
      }
    };

    return {
      formattedDate,
      handleStar,
    };
  }
});
</script>
