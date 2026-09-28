export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: string;
  tags: string[];
  source: "devto" | "github";
}