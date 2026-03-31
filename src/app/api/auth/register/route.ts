import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, role, companyName, phone, address } = await request.json();

    const isVendor = role === 'VENDOR';
    if (!email || !password || !phone || (!isVendor && !address)) {
      return NextResponse.json({ 
        error: isVendor ? 'Email, password, and phone are required' : 'Email, password, phone, and address are required' 
      }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER',
        companyName: isVendor ? companyName : null,
        phone,
        address: isVendor ? null : address,
        status: isVendor ? 'PENDING' : 'ACTIVE',
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
