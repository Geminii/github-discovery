<template>
  <div class="bg-gray-100 min-h-screen py-5">
    <header class="max-w-6xl mx-auto flex justify-between">
      <router-link :to="{ name: 'home' }">
        <Logo class="w-36 h-36" />
      </router-link>

      <h1
        class="text-6xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10"
      >
        <span class="text-emerald-500">
          GitHub
        </span>
        Discovery
      </h1>
    </header>

    <main class="max-w-6xl mx-auto mt-4 mb-4">
      <router-view />
    </main>  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from '@/assets/svg/logo.svg?component';

export default defineComponent({
  name: 'App',
  components: {
    Logo,
  }
});
</script>
