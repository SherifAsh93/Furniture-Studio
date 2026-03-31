import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { 
      customerId, 
      vendorId,
      category, 
      length, 
      width, 
      height, 
      material, 
      message 
    } = await request.json();

    if (!customerId || !vendorId || !category) {
      return NextResponse.json({ error: 'Customer ID, Vendor ID and Category are required' }, { status: 400 });
    }

    const customRequest = await prisma.customRequest.create({
      data: {
        customerId,
        vendorId,
        category,
        length: length ? parseFloat(length) : null,
        width: width ? parseFloat(width) : null,
        height: height ? parseFloat(height) : null,
        material,
        message,
      },
    });

    return NextResponse.json(customRequest);
  } catch (error: any) {
    console.error('Custom request error:', error);
    return NextResponse.json({ error: 'Failed to submit custom request' }, { status: 500 });
  }
}
