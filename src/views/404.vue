<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <NotFoundIcon class="w-72 h-72" />
    <router-link 
      :to="{ name: 'home' }"
      class="text-2xl text-emerald-500 hover:text-emerald-700"
    >
      Back to home
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import NotFoundIcon from '@/assets/svg/not-found.svg?component';

  export default defineComponent({
    name: '404',
    components: {
      NotFoundIcon,
    },
  });
</script>
