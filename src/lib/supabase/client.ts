import { createBrowserClient } from '@supabase/ssr';

function isValidHttpUrl(stringUrl: string): boolean {
  try {
    const url = new URL(stringUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function createClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (
    !isValidHttpUrl(supabaseUrl) ||
    supabaseUrl.includes('your_supabase_url_here')
  ) {
    supabaseUrl = 'https://placeholder.supabase.co';
  }

  if (
    !supabaseAnonKey ||
    supabaseAnonKey.includes('your_supabase_anon_key_here')
  ) {
    supabaseAnonKey = 'placeholder-anon-key';
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
