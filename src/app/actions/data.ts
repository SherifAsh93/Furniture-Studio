'use server';

import { prisma } from '@/lib/prisma';

export async function getMarketplaceData() {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  });
  return { products };
}

export async function getVendorData(vendorId: string) {
  const vendor = await prisma.user.findUnique({
    where: { id: vendorId },
  });
  
  const products = await prisma.product.findMany({
    where: { vendorId },
  });

  const negotiations = await prisma.negotiation.findMany({
    where: { vendorId },
    include: {
      product: true,
      customer: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return { vendor, products, negotiations };
}

export async function getAdminData() {
  const pendingVendors = await prisma.user.findMany({
    where: { role: 'VENDOR', status: 'PENDING' },
    orderBy: { createdAt: 'desc' }
  });

  const totalVendors = await prisma.user.count({
    where: { role: 'VENDOR' }
  });

  return { pendingVendors, totalVendors };
}
