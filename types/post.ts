export type Category =
  | "Tech"
  | "Lifestyle"
  | "Business"
  | "Entertainment"
  | "Health"
  | "Science"
  | "Sports"
  | "World";

export interface Post {
  id: string;
  title: string;
  author: string;
  summary: string;
  category: Category;
  content: string;
  createdAt: string; //ISO string
}
