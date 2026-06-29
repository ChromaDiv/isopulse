// ============================================================
// IsoPulse — Auth Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { isSupabaseConfigured } from '@/lib/mock-db-helper';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  if (!isSupabaseConfigured()) {
    // In mock mode, permit immediate login
    redirect('/');
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: error.message };
    }
  } catch (err: any) {
    return { error: err.message || 'Authentication service is currently unavailable.' };
  }

  redirect('/');
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!email || !password || !name) {
    return { error: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  if (!isSupabaseConfigured()) {
    return { 
      success: 'Account created! (Local mock mode) You can now log in immediately.' 
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { 
      success: 'Account created! You can now log in immediately. If you have "Confirm email" enabled in your Supabase Dashboard, please check your inbox for the confirmation link.' 
    };
  } catch (err: any) {
    return { error: err.message || 'Registration service is currently unavailable.' };
  }
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut failed, proceeding with manual cookie clearing:', err);
    }
  }

  // Bulletproof cookie clearing for Vercel / Production environments
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach((c) => {
      if (c.name.startsWith('sb-')) {
        cookieStore.set(c.name, '', { maxAge: 0, path: '/' });
      }
    });
  } catch (err) {
    console.warn('Failed to clear cookie store in Server Action:', err);
  }

  redirect('/login');
}
