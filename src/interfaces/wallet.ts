import { Expense } from "./expense";

export interface Wallet {
  isPrivate: boolean;
  id: string;
  name: string;
  expenses: Array<Expense>;
  sumExpenses: number;
  dateFrom: Date;
  dateTo: Date;
  currency: string;
  balance: number;
}
