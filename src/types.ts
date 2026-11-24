export type ProductId = 'powerbank' | 'dumbbell' | 'carpet';

export interface DumbbellOption {
  id: string;
  name: string;
  weight: string;
  price: number;
  description: string;
  badge?: string;
}

export interface ProductDetail {
  id: ProductId;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  priceFormatted: string;
  badge: string;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  highlightSpecs: string[];
  specs: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    desc: string;
  }[];
  materials: {
    label: string;
    detail: string;
  }[];
  idealFor: string;
  soundType: 'vibration' | 'shake' | 'siren';
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    targetProduct: ProductId;
  }[];
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  keywords: string[];
}

