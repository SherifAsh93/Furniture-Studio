'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- Marketplace & General Data ---

export async function getMarketplaceData() {
  const products = await prisma.product.findMany({
    take: 20,
    include: { vendor: true },
    orderBy: { createdAt: 'desc' },
  });
  return { products };
}

export async function getVendors() {
  return await prisma.user.findMany({
    where: { role: 'VENDOR' },
    select: { id: true, name: true, companyName: true }
  });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { vendor: true },
  });
}

// --- Vendor Actions ---

export async function getVendorData(vendorId: string) {
  try {
    const fullData = await prisma.user.findUnique({
      where: { id: vendorId },
      include: {
        products: {
          orderBy: { createdAt: 'desc' }
        },
        receivedMessages: { // These are the negotiations
          include: {
            product: true,
            customer: {
              select: { name: true, email: true, phone: true, address: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        customRequestsReceived: {
          include: {
            customer: {
              select: { name: true, email: true, phone: true, address: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    const totalSystemProducts = await prisma.product.count();

    if (!fullData) {
      return { user: null, products: [], negotiations: [], customRequests: [], orders: [], debugCount: totalSystemProducts };
    }

    const orders = await prisma.orderItem.findMany({
      where: { 
        product: { vendorId }
      },
      include: {
        order: {
          include: {
            customer: {
              select: { name: true, email: true, phone: true, address: true }
            }
          }
        },
        product: true
      },
      orderBy: { 
        order: { createdAt: 'desc' } 
      }
    });

    return { 
      user: {
        id: fullData.id,
        name: fullData.name,
        email: fullData.email,
        role: fullData.role,
        companyName: fullData.companyName,
        status: fullData.status
      },
      products: fullData.products, 
      negotiations: fullData.receivedMessages, 
      customRequests: fullData.customRequestsReceived, 
      orders,
      debugCount: totalSystemProducts
    };
  } catch (error: any) {
    console.error("Error fetching vendor data:", error);
    return { 
      user: null, 
      products: [], 
      negotiations: [], 
      customRequests: [], 
      orders: [], 
      debugCount: -1,
      debugError: error.message || 'Unknown Connection Error'
    };
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        vendorId: data.vendorId,
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock) || 1,
        category: data.category,
        length: parseFloat(data.length) || 0,
        width: parseFloat(data.width) || 0,
        height: parseFloat(data.height) || 0,
        images: data.images,
      },
    });
    revalidatePath('/marketplace');
    revalidatePath('/vendor');
    return { success: true, product };
  } catch (error) {
    console.error('Create product error:', error);
    return { error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        category: data.category,
        length: parseFloat(data.length) || 0,
        width: parseFloat(data.width) || 0,
        height: parseFloat(data.height) || 0,
        images: data.images,
      },
    });
    revalidatePath('/marketplace');
    return { success: true, product };
  } catch (error) {
    console.error('Update product error:', error);
    return { error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/marketplace');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete product' };
  }
}

// --- Customer & Order Actions ---

export async function createOrder(data: any) {
  try {
    const order = await prisma.order.create({
      data: {
        customer: { connect: { id: data.customerId } },
        total: parseFloat(data.total as any),
        status: 'PENDING',
        items: {
          create: {
            product: { connect: { id: data.productId } },
            quantity: parseInt(data.quantity as any) || 1,
            price: parseFloat(data.price as any || data.total as any)
          }
        }
      },
    });
    return { success: true, order };
  } catch (error: any) {
    console.error('Create order error:', error);
    return { error: error.message || 'Failed to place order' };
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/orders');
    revalidatePath('/vendor');
    return { success: true, order };
  } catch (error) {
    return { error: 'Failed to update order status' };
  }
}

// --- Negotiation Actions ---

export async function createNegotiation(data: any) {
  try {
    const negotiation = await prisma.negotiation.create({
      data: {
        productId: data.productId,
        customerId: data.customerId,
        vendorId: data.vendorId,
        message: data.message,
        status: 'OPEN',
      },
    });
    return { success: true, negotiation };
  } catch (error) {
    return { error: 'Failed to start negotiation' };
  }
}

export async function updateNegotiationStatus(id: string, status: string) {
  try {
    const negotiation = await prisma.negotiation.update({
      where: { id },
      data: { status },
    });
    return { success: true, negotiation };
  } catch (error) {
    return { error: 'Failed to update negotiation status' };
  }
}

// --- Admin Actions ---

export async function getAdminData() {
  const pendingVendors = await prisma.user.findMany({
    where: { role: 'VENDOR', status: 'PENDING' },
    orderBy: { createdAt: 'desc' }
  });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const allProducts = await prisma.product.findMany({
    include: { vendor: { select: { name: true, companyName: true } } },
    orderBy: { createdAt: 'desc' }
  });

  const allOrders = await prisma.order.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      items: {
        include: {
          product: { select: { title: true, price: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const allRequests = await prisma.customRequest.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      vendor: { select: { name: true, companyName: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return { pendingVendors, users, allProducts, allOrders, allRequests };
}

export async function updateUserStatus(id: string, status: any) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin');
    return { success: true, user };
  } catch (error) {
    return { error: 'Failed to update user status' };
  }
}

export async function deleteUser(id: string) {
  try {
    // Delete all related data first
    await prisma.wishlist.deleteMany({ where: { customerId: id } });
    const userOrders = await prisma.order.findMany({ where: { customerId: id } });
    for (const order of userOrders) {
      await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
    }
    await prisma.order.deleteMany({ where: { customerId: id } });
    
    await prisma.negotiation.deleteMany({
      where: { OR: [{ customerId: id }, { vendorId: id }] }
    });
    await prisma.product.deleteMany({ where: { vendorId: id } });
    
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    return { error: 'Failed to delete user' };
  }
}

import bcrypt from 'bcryptjs';
export async function createUser(data: any) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
        status: data.status || 'ACTIVE',
        companyName: data.companyName,
      },
    });
    revalidatePath('/admin');
    return { success: true, user };
  } catch (error) {
    return { error: 'Failed to create user' };
  }
}

// --- Journal Actions ---

export async function getJournalEntries() {
  return await prisma.journalEntry.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createJournalEntry(data: any) {
  try {
    const entry = await prisma.journalEntry.create({
      data: {
        title: data.title,
        category: data.category,
        content: data.content,
        imageUrl: data.imageUrl,
      },
    });
    return { success: true, entry };
  } catch (error) {
    return { error: 'Failed to create journal entry' };
  }
}

export async function createCustomRequest(data: any) {
  try {
    const request = await prisma.customRequest.create({
      data: {
        customerId: data.customerId,
        vendorId: data.vendorId,
        category: data.category,
        length: parseFloat(data.length) || 0,
        width: parseFloat(data.width) || 0,
        height: parseFloat(data.height) || 0,
        material: data.material,
        quantity: parseInt(data.quantity) || 1,
        message: data.message,
      },
    });
    return { success: true, request };
  } catch (error) {
    console.error('Create custom request error:', error);
    return { error: 'Failed to submit request' };
  }
}

export async function updateCustomRequestStatus(id: string, status: string) {
  try {
    const request = await prisma.customRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/vendor');
    return { success: true, request };
  } catch (error) {
    console.error('Update custom request error:', error);
    return { error: 'Failed to update request' };
  }
}

// --- Site Settings Actions ---

export async function getSiteSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    });
    
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: 'singleton' }
      });
    }
    
    return settings;
  } catch (error) {
    console.error('Get site settings error:', error);
    return null;
  }
}

export async function updateSiteSettings(data: any) {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        heroImage: data.heroImage,
      },
      create: {
        id: 'singleton',
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        heroImage: data.heroImage,
      },
    });
    revalidatePath('/');
    return { success: true, settings };
  } catch (error) {
    console.error('Update site settings error:', error);
    return { error: 'Failed to update site settings' };
  }
}

// --- Wishlist & Multi-item Order ---

export async function addToWishlist(customerId: string, productId: string) {
  try {
    const entry = await prisma.wishlist.create({
      data: {
        customer: { connect: { id: customerId } },
        product: { connect: { id: productId } }
      }
    });
    return { success: true, entry };
  } catch (error: any) {
    console.error('Add to wishlist error:', error);
    return { error: error.message || 'Failed to add to wishlist' };
  }
}

export async function removeFromWishlist(customerId: string, productId: string) {
  try {
    await prisma.wishlist.delete({
      where: {
        customerId_productId: { customerId, productId }
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error('Remove from wishlist error:', error);
    return { error: error.message || 'Failed to remove from wishlist' };
  }
}

export async function getWishlist(customerId: string) {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { customerId },
      include: { product: true }
    });
    return { success: true, wishlist };
  } catch (error: any) {
    console.error('Get wishlist error:', error);
    return { error: error.message || 'Failed to load wishlist' };
  }
}

export async function createMultiItemOrder(data: { customerId: string, total: number, items: any[] }) {
  try {
    const order = await prisma.order.create({
      data: {
        customer: { connect: { id: data.customerId } },
        total: parseFloat(data.total as any),
        status: 'PENDING',
        items: {
          create: data.items.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: parseInt(item.quantity as any),
            price: parseFloat(item.price as any)
          }))
        }
      }
    });
    revalidatePath('/admin');
    return { success: true, order };
  } catch (error: any) {
    console.error('Create multi-item order error:', error);
    return { error: error.message || 'Failed to place multi-item order' };
  }
}

export async function getCustomerOrders(customerId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, orders };
  } catch (error) {
    console.error('Get customer orders error:', error);
    return { error: 'Failed to load order history' };
  }
}

export async function deleteOrder(id: string) {
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return { error: 'Order not found' };
    if (order.status !== 'PENDING') return { error: 'Only pending orders can be cancelled' };

    await prisma.orderItem.deleteMany({ where: { orderId: id } });
    await prisma.order.delete({ where: { id } });
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Delete order error:', error);
    return { error: 'Failed to delete order' };
  }
}

export async function updateOrderItem(id: string, data: { quantity: number }) {
  try {
    const item = await prisma.orderItem.update({
      where: { id },
      data: { quantity: data.quantity },
      include: { order: true }
    });
    
    // Recalculate order total
    const allItems = await prisma.orderItem.findMany({
      where: { orderId: item.orderId }
    });
    const newTotal = allItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    await prisma.order.update({
      where: { id: item.orderId },
      data: { total: newTotal }
    });

    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Update order item error:', error);
    return { error: 'Failed to update order item' };
  }
}

export async function deleteOrderItem(id: string) {
  try {
    const item = await prisma.orderItem.delete({
      where: { id },
      include: { order: true }
    });
    
    // Check if order still has items
    const remainingItems = await prisma.orderItem.findMany({
      where: { orderId: item.orderId }
    });
    
    if (remainingItems.length === 0) {
      await prisma.order.delete({ where: { id: item.orderId } });
    } else {
      // Recalculate total
      const newTotal = remainingItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      await prisma.order.update({
        where: { id: item.orderId },
        data: { total: newTotal }
      });
    }
    
    revalidatePath('/vendor');
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Delete order item error:', error);
    return { error: 'Failed' };
  }
}

export async function deleteCustomRequest(id: string) {
  try {
    await prisma.customRequest.delete({ where: { id } });
    revalidatePath('/vendor');
    return { success: true };
  } catch (error) {
    console.error('Delete custom request error:', error);
    return { error: 'Failed' };
  }
}

