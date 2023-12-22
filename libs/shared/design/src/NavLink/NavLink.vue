<template>
  <RouterLink class="decoration-none" inactive-class="color-muted">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink } from '../Link';

  export type NavLinkProps = {
    activeClass?: string;
    inactiveClass?: string;
    ariaCurrentValue?:
      | 'page'
      | 'step'
      | 'location'
      | 'date'
      | 'time'
      | 'true'
      | 'false';
  };

  defineProps<NavLinkProps>();
</script>
