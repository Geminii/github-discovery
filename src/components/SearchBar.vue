<template>
  <form 
    class="block mb-16"
    @submit.prevent
  >
    <div
      class="relative h-full w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg border-gray-300 bg-gray-200 rounded-xl p-3 bg-opacity-70"
    >
      <IconSearch class="w-5 h-5" />

      <input
        class="h-full block bg-transparent relative left-10 border-none outline-none input-search"
        placeholder="Ex. VueJs"
        @input="handleInputChange"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import throttle from 'lodash.throttle';
import IconSearch from '@/assets/svg/search.svg?component';

export default defineComponent({
  name: 'SearchBar',
  components: {
    IconSearch,
  },
  emits: ['search'],
  setup: (_, { emit }) => {
    const handleInputChange = throttle((event: Event) => {
      const element = event.target as HTMLInputElement;
      emit('search', element.value);
    }, 300);

    return {
      handleInputChange
    };
  }
});
</script>

<style lang="scss" scoped>
.input-search {
  width: calc(100% - 50px);
}
</style>