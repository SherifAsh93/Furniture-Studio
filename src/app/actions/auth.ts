'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: 'Invalid credentials' };
    }

    // Note: In Next.js, session management usually happens with libraries like next-auth
    // For this implementation, we will redirect to appropriate dashboard.
    if (user.role === 'ADMIN') {
      redirect('/admin');
    } else if (user.role === 'VENDOR') {
      redirect('/vendor/dashboard');
    } else {
      redirect('/marketplace');
    }
  } catch (error) {
    console.error('Login action error:', error);
    if ((error as any).digest?.includes('NEXT_REDIRECT')) throw error;
    return { error: 'Authentication failed' };
  }
}

export async function registerVendor(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const companyName = formData.get('companyName') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyName,
        role: 'VENDOR',
        status: 'PENDING',
      },
    });

    return { success: true, user: { email: user.email, name: user.name } };
  } catch (error) {
    console.error('Vendor registration error:', error);
    return { error: 'Failed to register vendor' };
  }
}

export async function logout() {
  // In a real app, you'd clear the session/cookie here
  redirect('/');
}
