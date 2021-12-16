<template>
  <div class="flex flex-col items-center text-center">
    <img src="@/assets/oops.png" alt="oops" class="w-56 h-56" />
    <p class="text-xl text-amber-600 mt-4">
      Oops ! Something is wrong ...
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error',
})
</script>
