<script setup lang="ts">
import { debug } from '@blackhole/debug';
import { Button } from '@blackhole/design';
import { onMounted, ref } from 'vue';
import { supabase } from '@blackhole/supabase';

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, newSession) => {
    session.value = newSession;
  });
});

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) debug.error(error.message);
  }
};

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) debug.error(error.message);
  }
};
</script>

<template>
  <Button v-if="session" @click="handleLogout()">Logout</Button>
  <Button v-else @click="handleLogin()">Login</Button>
</template>
