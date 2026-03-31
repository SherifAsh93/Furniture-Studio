import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create the lead Vendor
  const vendor = await prisma.user.upsert({
    where: { email: 'curator@studiodartistes.eu' },
    update: {},
    create: {
      email: 'curator@studiodartistes.eu',
      password: 'password123',
      name: 'Alexander Van der Berg',
      companyName: 'Studio d\'Artistes Ltd.',
      phone: '+31 20 555 0192',
      role: 'VENDOR',
      status: 'ACTIVE',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@furniturestudio.com' },
    update: {},
    create: {
      email: 'admin@furniturestudio.com',
      password: 'admin',
      name: 'System Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const buyer1 = await prisma.user.upsert({
    where: { email: 'johnd@example.com' },
    update: {},
    create: {
      email: 'johnd@example.com',
      password: 'user123',
      name: 'Johnathan D.',
      role: 'USER',
    },
  });

  // 2. Create sample products reflecting Hub 2
  const p1 = await prisma.product.create({
    data: {
      title: 'The Nordic Spine Chair',
      description: 'Elegant seating in ash wood and leather.',
      price: 2450.00,
      stock: 8,
      category: 'Living Gallery',
      vendorId: vendor.id,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDFcPgLqDsW7aRmEjI276UgO03VbS9KGyTi3RPJ_f4Q27HuZEXX-uY1ann2CQukzGzWsX447fRLb9PKGECF0GiXPlpyTfjimylKGQWmAnXD9OeE5Umz9PwAAKoWtO1mYuX8WviRRvT_ARGQ2GssDwzHSXQTFX3DFRTgLdoM90mSR1Ob43jmOPwcn0gB0I5RctSBfcW3pKR8lwjb659_qwMyvtLqGAc8QZVkHsuzqI6PUhS15oxPG9pdQRR4MfkdMwvFmYPt5SPK0CoZ'],
    }
  });

  const p2 = await prisma.product.create({
    data: {
      title: 'Venera Marble Table',
      description: 'Solid block Carrara marble coffee table.',
      price: 4100.00,
      stock: 2,
      category: 'Master Bedroom',
      vendorId: vendor.id,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBDI-NRmZPNvKCcMM1DCSK8uz56DBqPXY6DFn1mZB-Y7C7ekx2Arh-PbdIW1lG4mOjK0EwxSMArrQh2B69BBOGhRKFrNrTwPN_RuYFXPkmZyESbHaFmTMnptgC6cR106fAZ8knHUZZp5bnebr-EsN1VSWXTL4qQOu9ooVCmZNBRn4ezp0E7SCJlMAgtyI2dgZ2o8kwgZJCQwSNtqvKqu9KrYl_71YeJ3mslQNHv0FdB-UrzTqZ8BULrmox_R0XX0MozZsAehUaF073P'],
    }
  });

  // 3. Create Negotiation
  await prisma.negotiation.create({
    data: {
      message: 'Request for custom width (220cm) and velvet upholstery.',
      status: 'OPEN',
      productId: p1.id,
      customerId: buyer1.id,
      vendorId: vendor.id,
    }
  });

  // 4. Create pending vendors for Admin Hub
  await prisma.user.create({
    data: { email: 'atelier@nord.dk', name: 'Atelier Nord', companyName: 'Furniture / Minimalist', status: 'PENDING', role: 'VENDOR', password: 'temp' }
  });
  await prisma.user.create({
    data: { email: 'marmo@studio.it', name: 'Studio Marmo', companyName: 'Lighting / Stone', status: 'PENDING', role: 'VENDOR', password: 'temp' }
  });

  console.log('Seed executed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
