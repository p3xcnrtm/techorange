export interface Article {
  id: string;
  title: string;
  source: string;
  author: string;
  date: string;
  imageUrl: string;
  summary: string;
  fullContent: string;
  url: string;
}

export interface UserSubscription {
  isSubscribed: boolean;
  subscriptionDate: string | null;
}

export interface GeminiNewsResponse {
  articles: Article[];
}