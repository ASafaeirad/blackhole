import { supabase } from '@blackhole/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const auth = supabase.auth;

enum AuthState {
  NotInitialized,
  Loading,
  Authenticated,
  Guest,
}

export const useAuthStore = defineStore('auth', () => {
  const session = ref();
  const state = ref(AuthState.NotInitialized);

  const logout = async () => {
    const { error } = await auth.signOut();
    if (error) throw error;
  };

  const login = async () => {
    const { error } = await auth.signInWithOAuth({ provider: 'github' });
    if (error) throw error;
  };

  function subscribe() {
    if (state.value !== AuthState.NotInitialized) return;
    state.value = AuthState.Loading;

    supabase.auth.onAuthStateChange((_, newSession) => {
      state.value =
        newSession == null ? AuthState.Guest : AuthState.Authenticated;
      session.value = newSession;
    });

    void supabase.auth.getSession();
  }

  return { session, subscribe, state, login, logout };
});
