export const ROUTES = {
  INDEX: '/(tabs)',
  HOME: '/home',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: (id: string) => `/products/${id}` as const,
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
} as const;
