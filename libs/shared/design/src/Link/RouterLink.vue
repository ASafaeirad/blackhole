<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="props.to as string"
    :class="defaultClass"
    target="_blank"
  >
    <slot />
  </a>
  <router-link v-else v-slot="route" v-bind="props" custom>
    <a
      v-bind="$attrs"
      :href="route.href"
      :class="[route.isActive ? activeClass : inactiveClass, defaultClass]"
      @click="route.navigate"
    >
      <slot />
    </a>
  </router-link>
</template>

<script setup lang="ts">
  import { isString } from '@fullstacksjs/toolbox';
  import { computed, withDefaults } from 'vue';
  import type { RouterLinkProps } from 'vue-router';
  import { RouterLink } from 'vue-router';

  export type LinkProps = RouterLinkProps & { inactiveClass?: boolean, class: string | Array };

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<LinkProps>(), {
    // eslint-disable-next-line
    'class': {
      type: [String, Array],
      default: 'color-primary'
    },
  });

  const defaultClass = props.class;
  const isExternalLink = computed(
    () => isString(props.to) && props.to.startsWith('http'),
  );
</script>
