import type { CollectionConfig } from 'payload'

export const Goods: CollectionConfig = {
  slug: 'goods',
  admin: {
    useAsTitle: 'title',
  },
  // Simple Security: If logged in, you can manage the furniture
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        'Dressing room',
        'Master bedroom',
        'Kids room',
        'Dining room',
        'Sofas',
        'Sofas tables',
        'Side tables',
        'Doors',
        'Cladding',
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'mediaUrls',
      type: 'array',
      label: 'Product Images (URLs)',
      fields: [{ name: 'url', type: 'text' }],
    },
    {
      name: 'properties',
      type: 'group',
      fields: [
        { name: 'color', type: 'text' },
        { name: 'length', type: 'number' },
        { name: 'width', type: 'number' },
        { name: 'height', type: 'number' },
        { name: 'quantity', type: 'number', defaultValue: 1 },
      ],
    },
    {
      name: 'owner',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      defaultValue: 'mohamedmohamed29006@gmail.com',
    },
  ],
}
