import { http, endpoints } from "services/http";

export const addCategoryOfExpense = (
  name: string,
  username: string,
  groupID?: string
) =>
  http.post(endpoints.addCategoryOfExpenses, {
    name,
    username,
    groupID,
  });

export const editCategoryOfExpense = (
  id: string | number,
  name: string,
  username: string,
  groupID?: string
) =>
  http.post(`${endpoints.editCategoryOfExpenses}?id=${id}`, {
    name,
    username,
    groupID,
  });

export const deleteCategoryOfExpense = (id: string | number) =>
  http.get(`${endpoints.deleteCategoryOfExpenses}?id=${id}`);

export const addCategoryOfIncome = (name: string, username: string) =>
  http.post(endpoints.addCategoryOfIncomes, {
    name,
    username,
  });

export const editCategoryOfIncome = (
  id: string | number,
  name: string,
  username: string
) =>
  http.post(`${endpoints.editCategoryOfIncomes}?id=${id}`, {
    name,
    username,
  });

export const deleteCategoryOfIncome = (id: string | number) =>
  http.get(`${endpoints.deleteCategoryOfIncomes}?id=${id}`);
