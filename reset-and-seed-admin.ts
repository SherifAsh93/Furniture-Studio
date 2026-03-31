import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAndSeedAdmin() {
  try {
    // 1. Delete all related data in order
    console.log('Cleaning up database...');
    await prisma.order.deleteMany();
    await prisma.negotiation.deleteMany();
    await prisma.customRequest.deleteMany();
    await prisma.product.deleteMany();
    await prisma.journalEntry.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create the primary admin user
    const adminEmail = 'admin@furniturestudio.com';
    const adminPassword = '114891'; // User requested password
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedAdminPassword,
        name: 'System Admin',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error during reset and seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAndSeedAdmin();
