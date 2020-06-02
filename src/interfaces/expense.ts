import { User } from "./user";
import { Category } from "./category";

export interface Expense {
  id: number;
  name: string;
  value: number;
  valuePerUser?: number;
  currency: string;
  date: string;
  category: Category;
  owner?: User;
  isCurrent?: boolean;
  users?: {
    [key: string]: boolean;
  };
}
