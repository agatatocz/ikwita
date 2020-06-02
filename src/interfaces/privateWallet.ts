import { Wallet } from "./wallet";
import { Income } from "./income";
import { Category } from "./category";

export interface PrivateWallet extends Wallet {
  incomes: Array<Income>;
  sumIncomes: number;
  expensesCategories: Array<Category>;
  incomesCategories: Array<Category>;
}
