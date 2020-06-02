import { PrivateWallet } from "interfaces/privateWallet";
import { SheredWallet } from "interfaces/sheredWallet";
import { Category } from "interfaces/category";
import { Expense } from "interfaces/expense";
import { Income } from "interfaces/income";
import { findIndex } from "lodash";

const nullCategory: Category = {
  id: -1,
  name: "Brak kategorii",
};

export const mapPrivateWallets = (data: any) =>
  data.walletJSONs.map((wallet: any) => ({
    ...wallet,
    isPrivate: true,
    expenses: replaceNullCategories(wallet.expenses),
    incomes: replaceNullCategories(wallet.incomes),
    dateFrom: data.dateFrom,
    dateTo: data.dateTo,
    expensesCategories: data.expensesCategories,
    incomesCategories: data.incomesCategories,
  }));

export const mapPrivateWallet = (data: any) => ({
  ...data.wallet,
  isPrivate: true,
  dateFrom: data.dateFrom,
  dateTo: data.dateTo,
  expensesCategories: data.expensesCategories,
  incomesCategories: data.incomesCategories,
});

export const mapSheredWallets = (data: any) =>
  data.result.map((wallet: any) => ({
    ...wallet,
    isPrivate: false,
    expenses: replaceNullCategories(wallet.expenses),
    categories: wallet.expencesCategories,
  }));

export const mapSheredWallet = (data: any) => ({
  ...data,
  isPrivate: false,
  categories: data.expencesCategories,
});

const replaceNullCategories = (array: Array<Expense | Income>) =>
  array.map((item) =>
    item.category ? item : { ...item, category: nullCategory }
  );

export const replaceCategoryWithNullCategory = (
  array: Array<Expense | Income>,
  categoryId: number
) =>
  array.map((item) =>
    `${item.category.id}` === `${categoryId}`
      ? { ...item, category: nullCategory }
      : item
  );

export const findExpense = (
  wallets: Array<PrivateWallet | SheredWallet>,
  walletId: string,
  expenseId: number | string
) =>
  wallets
    .find((wallet) => `${wallet.id}` === `${walletId}`)
    ?.expenses.find((expense) => `${expense.id}` === `${expenseId}`);

export const indexOfSheredWallet = (
  wallets: Array<PrivateWallet | SheredWallet>
) => findIndex(wallets, ["isPrivate", false]);
