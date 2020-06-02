import { http, endpoints } from "services/http";

export const addExpense = (
  name: string,
  value: number,
  date: string,
  categoryID: number,
  walletID: string
) =>
  http.post(endpoints.addExpense, {
    name,
    value,
    date,
    categoryID,
    walletID,
  });

export const editExpense = (
  expenseID: number,
  name: string,
  value: number,
  date: string,
  categoryID: number,
  walletID: string
) =>
  http.post(`${endpoints.editExpense}?id=${expenseID}`, {
    name,
    value,
    date,
    categoryID,
    walletID,
  });

export const deleteExpense = (expenseID: number) =>
  http.get(`${endpoints.deleteExpense}?id=${expenseID}`);
