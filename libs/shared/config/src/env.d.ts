interface ImportMetaEnv {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  VITE_DEBUG_SCOPE?: string;
  VITE_DEBUG_LEVEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
