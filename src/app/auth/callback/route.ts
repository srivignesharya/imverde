import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

function isValidHttpUrl(stringUrl: string): boolean {
  try {
    const url = new URL(stringUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = cookies();
    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!isValidHttpUrl(supabaseUrl) || supabaseUrl.includes('your_supabase_url_here')) {
      supabaseUrl = 'https://placeholder.supabase.co';
    }
    if (!supabaseAnonKey || supabaseAnonKey.includes('your_supabase_anon_key_here')) {
      supabaseAnonKey = 'placeholder-anon-key';
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return user to auth page with an error parameter
  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
}
