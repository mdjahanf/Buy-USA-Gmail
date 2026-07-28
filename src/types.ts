export type OrderStatus = 'Pending' | 'Paid' | 'Processing' | 'Completed' | 'Cancelled';

export interface ServiceTier {
  quantity: number;
  price: number;
  popular?: boolean;
  save?: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  metaDescription: string;
  badge: string;
  iconName: string;
  overview: string;
  benefits: string[];
  features: ServiceFeature[];
  pricing: ServiceTier[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  rating: number;
  reviewsCount: number;
  seoContent?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  email: string;
  telegram: string;
  whatsapp: string;
  country: string;
  serviceId: string;
  serviceName: string;
  packageQuantity: number;
  packagePrice: number;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  customerNotes: string;
  screenshotUrl: string;
  customerIp: string;
  browser: string;
  os: string;
  status: OrderStatus;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string; // Markdown / styled HTML content
  category: string;
  author: string;
  date: string;
  readTime: string;
  suggestedImagePrompt: string;
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  keywords?: string[];
}

export interface CryptoWallet {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  iconColor: string;
  badge: string;
}

export interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  ssl: boolean;
  senderName: string;
  senderEmail: string;
  defaultReceiver: string;
  enabled: boolean;
}

export interface EmailLog {
  id: string;
  timestamp: string;
  to: string;
  subject: string;
  bodyPreview: string;
  status: 'sent' | 'failed';
  error?: string;
  orderId?: string;
  type: 'admin_notification' | 'customer_confirmation' | 'status_update' | 'test';
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  contactTelegram: string;
  contactWhatsapp: string;
  supportEmail: string;
  defaultLanguage: string;
  announcementBanner?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  telegram: string;
  whatsapp: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  processingOrders: number;
  cancelledOrders: number;
  topServices: { name: string; count: number; revenue: number }[];
  dailyOrders: { date: string; count: number; revenue: number }[];
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'pricing'
  | 'payment-methods'
  | 'blog'
  | 'blog-detail'
  | 'blog-post'
  | 'faqs'
  | 'faq'
  | 'contact'
  | 'order'
  | 'terms'
  | 'privacy'
  | 'refund'
  | 'dmca'
  | 'disclaimer'
  | 'sitemap'
  | '404';

export interface AIRecommendation {
  recommendedServiceSlug: string;
  recommendedQuantity: number;
  reasoning: string;
  estimatedReturn: string;
  securityTip: string;
}
