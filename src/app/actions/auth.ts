'use server';

import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Placeholder for real authentication logic
  console.log('Login attempt:', { email });

  if (email === 'admin@furniturestudio.com' && password === 'admin') {
    // In a real app, you'd set a session cookie here
    redirect('/admin');
  }

  return { error: 'Invalid credentials' };
}

export async function registerVendor(formData: FormData) {
  const email = formData.get('email');
  // Placeholder for vendor registration
  console.log('Vendor registration:', { email });
  
  return { success: true };
}

export async function logout() {
  // Placeholder for logout logic
  redirect('/');
}
