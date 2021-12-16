<template>
  <IconLoading class="w-72 h-72 mx-auto fly" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconLoading from '@/assets/svg/loading.svg?component';

export default defineComponent({
  name: 'Loading',
  components: {
    IconLoading,
  }
})
</script>

<style lang="scss" scoped>
.fly {
  animation: spin 1s linear infinite alternate-reverse;
}

@keyframes spin {
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(15px);
  }
} 
</style>