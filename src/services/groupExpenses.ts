import { http, endpoints } from "services/http";

export const addGroupExpense = (
  name: string,
  value: number,
  date: string,
  categoryID: number,
  username: string,
  groupID: string
) =>
  http.post(endpoints.addGroupExpense, {
    name,
    value,
    date,
    categoryID,
    username,
    groupID,
  });

export const editGroupExpense = (
  expenseID: number,
  name: string,
  value: number,
  date: string,
  categoryID: number
) =>
  http.post(`${endpoints.editGroupExpense}?ID=${expenseID}`, {
    name,
    value,
    date,
    categoryID,
  });

export const deleteGroupExpense = (expenseID: number) =>
  http.get(`${endpoints.deleteGroupExpense}?ID=${expenseID}`);

export const checkUserInGroupExpense = (expenseId: number, username: string) =>
  http.get(endpoints.billingGroupExpenses, {
    params: {
      groupExpensesID: expenseId,
      username,
    },
  });
