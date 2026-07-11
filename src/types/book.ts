export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  reviews: Review[];
  rating: number;
  category: string;
  stock: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export interface GetBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: 'title-asc' | 'price-asc' | 'price-desc' | 'rating-desc';
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type PaymentMethod = 'card' | 'paypal' | 'apple-pay';

export type DeliveryMethod = 'pickup' | 'delivery';

export interface DeliveryAddress {
  recipientName: string;
  phone: string;
  address: string;
}

export interface CheckoutPayload {
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  deliveryAddress?: DeliveryAddress;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  placedAt: string;
  status: 'pending' | 'completed' | 'canceled';
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  deliveryAddress?: DeliveryAddress;
}
