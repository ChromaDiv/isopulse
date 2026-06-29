// ============================================================
// IsoPulse — Auth Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

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
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

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
