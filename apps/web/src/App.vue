<script setup lang="ts">
import { useAuthStore } from '@blackhole/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
onMounted(authStore.subscribe);
</script>

<template>
  <RouterView />
</template>
