import { Category } from "./category";

export interface Income {
  id: string;
  name: string;
  value: number;
  currency: string;
  date: string;
  category: Category;
}
